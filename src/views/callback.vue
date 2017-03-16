<template>
  <div class="callback">
    Please wait for authentication...
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import qs from 'qs'

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
      // this.getToken()


      // this is for try from web
      var vm = this
      var envatoClientId = 'appdash-ulabcfrn'
      var envatoClientSecret = 'yhyS4sM6jOlYkbSdMpV6IQbOrrljwYhT'

      console.log('axios web start:')

      axios.post('https://api.envato.com/token',
        qs.stringify({
          grant_type: 'authorization_code',
          code: vm.code,
          client_id: envatoClientId,
          client_secret: envatoClientSecret
        }),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      )
      .then(function (results) {
        console.log('results', results.data)
      })
      .catch(function (error) {
        console.log('hata', error)
      })
    }
  },
  methods: {
    getURLParameter (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) ||
        [null, ''])[1].replace(/\+/g, '%20')) || null
    },
    getToken () {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      var tokenFunctionURL = 'https://us-central1-' + this.getFirebaseProjectId() + '.cloudfunctions.net/token'
      script.src = tokenFunctionURL +
        '?code=' + encodeURIComponent(this.code) +
        '&state=' + encodeURIComponent(this.state) +
        '&callback=' + this.tokenReceived.name
      document.head.appendChild(script)
    },
    getFirebaseProjectId () {
      return firebase.app().options.authDomain.split('.')[0]
    },
    tokenReceived (data) {
      if (data.token) {
        firebase.auth().signInWithCustomToken(data.token).then(function () {
          window.close()
        })
      } else {
        console.error(data)
        document.body.innerText = 'Error in the token Function: ' + data.error
      }
    }
  }
}
</script>
<style lang="scss">
  .callback {
    padding: 25px;
  }
</style>
