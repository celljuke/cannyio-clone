<template>
  <div class="post-list-view card">
    <div class="post-list-view__header">
      <h1>{{post.title}}</h1>
    </div>
    <div class="post-list-view__body detail">
      {{post.details}}
    </div>
    <div class="post-list-view__footer"></div>
  </div>
</template>

<script>
export default {
  name: 'post-list-item-detail',
  props: {
    post: {
      type: Object
    }
  }
}
</script>
<style lang="scss">
  .detail {
    padding: 25px;
  }
</style>
