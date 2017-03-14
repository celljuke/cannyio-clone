<template>
  <div class="post-list-item">
    <div class="post-votes" @click="addVote(post)">
      <div class="up-vote"></div>
      <span>{{post.votes ? post.votes.length : '0'}}</span>
    </div>
    <div class="post-body">
      <div class="post-title">{{post.title}}</div>
    </div>
    <div class="post-comments"></div>
  </div>
</template>

<script>
import utils from '@/utils'

let db = utils.firebase.db
let postsRef = db.ref('posts')

export default {
  name: 'post-list-item',
  props: {
    post: {
      type: Object
    }
  },
  firebase: {
    posts: postsRef
  },
  methods: {
    addVote (post) {
      var newVotes = [{userId: 1}]
      if (post.votes) {
        newVotes = post.votes
        newVotes.push({userId: 1})
      }
      this.$firebaseRefs.posts.child(post['.key']).update({
        votes: newVotes
      })
    }
  }
}
</script>

<style lang="scss">
  .post-list-item {
    display: flex;
    padding: 15px 30px 15px 10px;
    align-items: center;

    .post-votes {
      display: flex;
      align-items: center;
      flex-direction: column;
      min-width: 50px;
      padding: 4px 0;
      cursor: pointer;

      .up-vote {
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid rgba(35, 35, 35, .2);
        margin-bottom: 7px;
        -webkit-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
      }

      span {
        min-height: 13px;
        text-align: center;
        font-size: 15px;
        line-height: 22px;
        -webkit-touch-callout: none;
        user-select: none;
      }

      &:hover {
        .up-vote {
          border-bottom: 9px solid rgba(35,35,35,.4);
        }
      }
    }

    .post-body {
      position: relative;
      top: -4px;
      display: flex;
      flex: 1;
      flex-direction: column;

      .post-title {
        font-size: 17px;
        line-height: 24px;
      }
    }
  }
</style>
