var functions = require('firebase-functions');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

var admin = require("firebase-admin");
var axios = require("axios");
var qs = require("qs");
var serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cannyio-clone.firebaseio.com"
});

const OAUTH_REDIRECT_URI = `https://cannyio-clone.firebaseapp.com/callback`;
const OAUTH_SCOPES = 'basic';

function envatoOAuth2Client() {
  const credentials = {
    client: {
      id: functions.config().envato.client_id,
      secret: functions.config().envato.client_secret
    },
    auth: {
      tokenHost: 'https://api.envato.com',
      tokenPath: '/token',
      authorizePath: '/authorization'
    }
  };
  return require('simple-oauth2').create(credentials);
}

exports.redirect = functions.https.onRequest((req, res) => {
  const oauth2 = envatoOAuth2Client();
  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
    console.log('Setting verification state:', state);
    res.cookie('state', state.toString(), {maxAge: 3600000, secure: true, httpOnly: true});
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: OAUTH_REDIRECT_URI,
      state: state
    });
    console.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
  });
});

exports.token = functions.https.onRequest((req, res) => {
  const oauth2 = envatoOAuth2Client();

  try {
    cookieParser()(req, res, () => {
      console.log('Received verification state:', req.cookies.state);
      console.log('Received state:', req.query.state);
      if (!req.cookies.state) {
        throw new Error('State cookie not set or expired. Maybe you took too long to authorize. Please try again.');
      } else if (req.cookies.state !== req.query.state) {
        throw new Error('State validation failed');
      }
      console.log('Received auth code:', req.query.code);
      console.log('token post start:');

      var envatoUser = {}

      oauth2.authorizationCode.getToken({
        code: req.query.code,
        redirect_uri: OAUTH_REDIRECT_URI
      }).then(results => {
        console.log('Auth code exchange result received:', results);
        const accessToken = results.access_token;
        const refreshToken = results.refresh_token;

        const AuthStr = 'Bearer '.concat(accessToken);
        axios.get('https://api.envato.com/v1/market/private/user/username.json', { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
            console.log(response.data);
            envatoUser.username = response.data.username;

            axios.get('https://api.envato.com/v1/market/private/user/account.json', { headers: { Authorization: AuthStr } })
              .then(response => {
                var userData = response.data.account;
                envatoUser.displayName = userData.firstname + ' ' + userData.surname;
                envatoUser.userId = envatoUser.username + crypto.randomBytes(20).toString('hex');

                createFirebaseAccount(envatoUser.userId, envatoUser.displayName, AuthStr).then(firebaseToken => {
                  // Serve an HTML page that signs the user in and updates the user profile.
                  res.jsonp({token: firebaseToken});
                });

              })
              .catch((error) => {
                console.log('error ' + error);
              });
          })
          .catch((error) => {
            console.log('error ' + error);
          });

      });

    });
  } catch (error) {
    return res.jsonp({error: error.toString});
  }
});

function createFirebaseAccount(envatoID, displayName, accessToken) {
  // The UID we'll assign to the user.
  const uid = `envato:${envatoID}`;

  // Save the access token tot he Firebase Realtime Database.
  const databaseTask = admin.database().ref(`/envatoAccessToken/${uid}`)
    .set(accessToken);

  // Create or update the user account.
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: displayName
  }).catch(error => {
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: displayName,
      });
    }
    throw error;
  });

  // Wait for all async task to complete then generate and return a custom auth token.
  return Promise.all([userCreationTask, databaseTask]).then(() => {
    // Create a Firebase custom auth token.
    const token = admin.auth().createCustomToken(uid);
    console.log('Created Custom token for UID "', uid, '" Token:', token);
    return token;
  });
}
