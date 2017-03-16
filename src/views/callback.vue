<template>
  <div class="callback">
    Please wait for authentication...
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'callback',
  data () {
    return {
      code: '',
      state: ''
    }
  },
  mounted () {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    if (this.code) {
      // if we want to use cloud functions, we have to use this function
      this.getToken()
    }
  },
  methods: {
    getURLParameter (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) ||
        [null, ''])[1].replace(/\+/g, '%20')) || null
    },
    getToken () {
      var tokenFunctionURL = 'https://us-central1-' + this.getFirebaseProjectId() + '.cloudfunctions.net/token'
      this.$jsonp(tokenFunctionURL, { code: encodeURIComponent(this.code), state: encodeURIComponent(this.state) })
        .then(data => {
          if (data.token) {
            firebase.auth().signInWithCustomToken(data.token).then(function () {
              window.close()
            })
          } else {
            console.error(data)
            document.body.innerText = 'Error in the token Function: ' + data.error
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getFirebaseProjectId () {
      return firebase.app().options.authDomain.split('.')[0]
    }
  }
}
</script>
<style lang="scss">
  .callback {
    padding: 25px;
  }
</style>
