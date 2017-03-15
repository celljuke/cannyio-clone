<template>
  <div class="home">
    <div class="home__container">
      <div class="home__container__sidebar">
        <board-details></board-details>
      </div>
      <div class="home__container__main-container">
        <post-list-item-detail :post="post"></post-list-item-detail>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import boardDetails from '@/components/board-details'
import postListItemDetail from '@/components/post-list-item-detail'

let db = utils.firebase.db
let postsRef = db.ref('posts')

export default {
  name: 'post-detail',
  data () {
    return {
      post: {}
    }
  },
  firebase: {
    posts: postsRef
  },
  components: {
    boardDetails,
    postListItemDetail
  },
  mounted () {
    var postId = this.$route.params.postId
    var vm = this
    db.ref('/posts/' + postId).once('value').then(function (postObject) {
      vm.post = postObject.val()
    })
  }
}

</script>

<style lang="scss">

</style>
