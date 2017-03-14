<template>
  <div class="board-details card">
    <create-post-form></create-post-form>
  </div>
</template>

<script>
import createPostForm from '@/components/create-post-form'
export default {
  name: 'board-details',
  components: {
    createPostForm
  }
}
</script>

<style lang="scss">
  .board-details {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: #fff;
    padding: 30px 15px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;

    &.card {
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
      border: 1px solid #e9e9e9;
      overflow: hidden;
      border-radius: 3px;
      background-color: #fff;
    }
  }
</style>
