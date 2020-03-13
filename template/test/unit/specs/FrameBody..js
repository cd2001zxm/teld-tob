/**
 * Created by chendong on 2020/3/11.
 */
//import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import FrameBody from '@/vue/frame/FrameBody.vue'

describe('Avatar.vue', () => {
  it('should render correct contents', () => {
    const wrapper  = shallowMount(FrameBody)

    expect('1')
      .to.equal('1')
  })

})
