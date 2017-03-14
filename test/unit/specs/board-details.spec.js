import Vue from 'vue'
import BoardDetails from '@/components/board-details'

describe('board-details.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BoardDetails)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
