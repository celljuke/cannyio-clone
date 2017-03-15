<template>
  <div class="create-post-form">
    <form>
      <div class="text-input">
        <div class="label">TITLE</div>
        <div class="input-container"><input type="text" placeholder="Short, descriptive title" v-model="post.title"/></div>
      </div>
      <div class="text-input">
        <div class="label">DETAILS</div>
        <div class="input-container"><textarea placeholder="Any additional details…" rows="3" v-model="post.details" /></div>
      </div>
      <div class="form-buttons">
        <button type="button" class="button create-post-button" @click="addPost()">
          <span class="label">Create Post</span>
          <span class="loader"></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import utils from '@/utils'
// import firebase from 'firebase'

let db = utils.firebase.db
let postsRef = db.ref('posts')

export default {
  name: 'create-post-form',
  data () {
    return {
      post: {
        title: '',
        details: '',
        createdAt: new Date().getTime()
      }
    }
  },
  firebase: {
    posts: postsRef
  },
  methods: {
    addPost () {
      if (this.post.title !== '') {
        var newPostRef = postsRef.push()
        console.log(this.post)
        newPostRef.set(this.post)
        this.post = {
          title: '',
          details: ''
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .create-post-form {

    .text-input {
      display: flex;
      flex-direction: column;
      padding: 8px 12px;
      background: #fff;
      border: 1px solid #ddd;
      cursor: text;
      box-sizing: border-box;
      border-radius: 3px;

      .label {
        margin: 0 0 5px;
        color: #999;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .05em;
        line-height: 15px;
        text-transform: uppercase;
        cursor: text;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .input-container {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        input {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 100%;
          line-height: 21px;
          border: 0;
          margin: 0;
          padding: 0;
          resize: none;
          outline: none;
          color: #333;
          background: none;
          font-size: 15px;
          line-height: 22px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
          opacity: 1;
        }

        textarea {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 100%;
          line-height: 21px;
          border: 0;
          margin: 0;
          padding: 0;
          resize: none;
          outline: none;
          color: #333;
          background: none;
          font-size: 15px;
          line-height: 22px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
          opacity: 1;
          min-height: 21px;
        }
      }
    }

    .text-input + .text-input {
      margin-top: 15px;
    }

    .form-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;


      button {
        display: flex;
        cursor: pointer;
        position: relative;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 0;
        padding: 14px 16px;
        border: none;
        text-transform: uppercase;
        font-weight: 700;
        overflow: hidden;
        -webkit-transition: color .25s cubic-bezier(.16,.83,.31,.99),background-color .25s cubic-bezier(.16,.83,.31,.99);
        transition: color .25s cubic-bezier(.16,.83,.31,.99),background-color .25s cubic-bezier(.16,.83,.31,.99);
        border-radius: 3px;
        -webkit-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
      }

      .create-post-button {
        background-color: rgb(121, 152, 166);
        color: #fff;

        &:hover {
          opacity: .8;
        }
      }
    }
  }
</style>
