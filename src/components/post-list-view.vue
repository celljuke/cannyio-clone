<template>
  <div class="post-list-view card">
    <div class="post-list-view__header">
      <h1>All Posts</h1>
    </div>
    <div class="post-list-view__body">
      <post-list-item :post="post" v-for="(post, key) in posts" v-bind:key="key"></post-list-item>
    </div>
    <div class="post-list-view__footer"></div>
  </div>
</template>

<script>
import utils from '@/utils'
import postListItem from '@/components/post-list-item'

let db = utils.firebase.db
let postsRef = db.ref('posts')

export default {
  name: 'post-list-view',
  firebase: {
    posts: postsRef
  },
  components: {
    postListItem
  }
}

</script>

<style lang="scss">
  @import "../main.scss";

  .post-list-view {
    width: 100%;
    min-height: 200px;

    &.card {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
      border: 1px solid #e9e9e9;
      overflow: hidden;
      border-radius: 3px;
      background-color: #fff;
    }

    @include e('header') {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;
      height: 30px;
      padding: 15px 25px;

      h1 {
        font-size: 20px;
      }
    }

    @include e('body') {
      padding: 10px 0;
    }

    @include e('footer') {

    }

  }
</style>
