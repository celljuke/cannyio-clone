<template>
  <div class="home">
    <div class="home__container">
      <div class="home__container__sidebar">
        <board-details></board-details>
        <div><a class="powered-by">powered by celljuke</a></div>
      </div>
      <div class="home__container__main-container">
        <post-list-view></post-list-view>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    boardDetails,
    postListView
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
  }
</style>

