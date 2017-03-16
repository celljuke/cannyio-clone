<template>
  <div class="home">
    <div class="home__container">
      <div class="home__container__sidebar">
        <board-details v-on:openLoginModal="openLoginModal"></board-details>
        <div><a class="powered-by">powered by celljuke</a></div>
      </div>
      <div class="home__container__main-container">
        <post-list-view></post-list-view>
      </div>
    </div>
    <div class="modal-overlay" v-if="isLoginNeed">
      <div class="account-modal">
        <h1>Sign up for Canny-Clone with:</h1>
        <a href="javascript:;" @click="openAuthPopup">Use Envato Account</a>
      </div>
    </div>
  </div>
</template>

<script>
import boardDetails from '@/components/board-details'
import postListView from '@/components/post-list-view'

export default {
  name: 'home',
  data () {
    return {
      isLoginNeed: false
    }
  },
  components: {
    boardDetails,
    postListView
  },
  methods: {
    openAuthPopup () {
      window.open('popup.html', 'name', 'height=585,width=400')
    },
    openLoginModal () {
      this.isLoginNeed = true
    }
  }
}

</script>

<style lang="scss">
  @import "../main.scss";

  .home {
    @include e('container') {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      height: 100%;
      padding: 0;

      @include breakpoint(vsmall) {
        padding: 0 30px;
        box-sizing: border-box;
      }



      @include e('sidebar') {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        width: 300px;
        min-width: 300px;
        max-width: 300px;
        -webkit-align-self: flex-start;
        -ms-flex-item-align: start;
        align-self: flex-start;
        margin: 0 15px 0 0;

        .powered-by {
          display: flex;
          justify-content: center;
          text-align: center;
          padding: 15px;
          color: #888;
          font-size: 12px;
          line-height: 17px;
          box-sizing: border-box;
        }
      }


      @include e('main-container') {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        flex: 1;
      }
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100vw;
      max-width: 100vw;
      width: 100vw;
      min-height: 100vh;
      max-height: 100vh;
      height: 100vh;
      z-index: 100;
      background: rgba(0,0,0,.4);
      overflow: hidden;

      .account-modal {
        background: #fff;
        width: 100%;
        max-width: 440px;
        border-radius: 3px;
        padding: 30px;

        h1 {
          font-size: 17px;
          line-height: 24px;

        }
      }
    }

  }
</style>

