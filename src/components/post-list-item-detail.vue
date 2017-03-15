<template>
  <div class="post-list-view card">
    <div class="post-list-view__header">
      <h1>{{post.title}}</h1>
      <span>{{createdAtDate}}</span>
    </div>
    <div class="post-list-view__body detail">
      {{post.details}}
    </div>
    <div class="post-list-view__footer"></div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'post-list-item-detail',
  props: {
    post: {
      type: Object
    }
  },
  computed: {
    createdAtDate () {
      return this.post.createdAt ? moment(this.post.createdAt).format('MMMM DD, YYYY - HH:mm a') : ''
    }
  }
}
</script>
<style lang="scss">
  .detail {
    padding: 25px;
  }
</style>
