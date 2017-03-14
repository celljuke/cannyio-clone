import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyBrlPOI3Y3gq3IkYqPzwJF2u8DRQ6m9i4s',
  authDomain: 'cannyio-clone.firebaseapp.com',
  databaseURL: 'https://cannyio-clone.firebaseio.com',
  storageBucket: 'cannyio-clone.appspot.com',
  messagingSenderId: '607101215030'
}
let app = firebase.initializeApp(config)

const utils = {
  firebase: {
    db: app.database(),
    auth: app.auth()
  }
}

export default utils
