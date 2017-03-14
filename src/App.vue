<template>
  <div id="app" class="app-main">
    <div class="app-header">
      <div class="app-header__container">
        <h1>canny-clone</h1>
      </div>
    </div>
    <div class="app-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "main.scss";

  html, body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f6f6f6;
    margin: 0;
    padding: 0;
  }

  .app-header {
    height: 60px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    margin: 0 0 30px;

    @include e('container') {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0;

      @include breakpoint(vsmall) {
        padding: 0 30px;
        box-sizing: border-box;
      }

      h1 {
        font-size: 17px;
        line-height: 24px;
        color: #666;
      }
    }
  }
</style>
