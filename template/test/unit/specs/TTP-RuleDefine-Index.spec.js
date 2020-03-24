/**
 * Created by chendong on 2020/3/12.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Index from '@/vue/RuleEngine/define/Index.vue'
import { defineMethod, defineTest, reportTestResult } from '@@/test/unit/script/defineTest'

const testMeta = {
  testSuiteCode: 'AA001.测试功能模块.测试功能.0001',
  // 下列参数来自teld-router-config.js
  webpackChunkName: 'Rule-Define',
  vueFilePath: '../src/vue/RuleEngine/define/Index.vue'

}

defineTest(testMeta, '规则定义列表', () => {
  let wrapper

  beforeEach(function () {

  })

  afterEach(function () {
    // 上传ddp测试结果，只在CI/CD环境有效
    reportTestResult(this.currentTest)

    if (wrapper) wrapper.destroy()
  })

  defineMethod(testMeta, 1, '初始化', '陈栋', () => {
    it('测试mouted', () => {
      wrapper = shallowMount(Index, {
        attachToDocument: true
      })

      expect(wrapper.isEmpty()).to.equal(false)
    })
  })

  defineMethod(testMeta, 2, '查询', '陈栋', () => {
    it('无查询条件', () => {
      wrapper = shallowMount(Index, {
        attachToDocument: true
      })

      let button = wrapper.find('#BtnSearch')
      button.trigger('click')
      let trs = wrapper.findAll('#gridBodyDiv_rule_set_table tr')

      // 判断绘制的表格行数是否达到预期
      expect(trs.length).to.equal(10)
    })
  })

  defineMethod(testMeta, 3, '重置', '陈栋', () => {
    it('重置', () => {
      wrapper = shallowMount(Index, {
        attachToDocument: true
      })

      wrapper.setData({ Name: '测试名称' })
      // 验证查询条件是否生效
      expect(wrapper.vm.Name).to.equal('测试名称')

      let button = wrapper.find('#btnReset')
      button.trigger('click')

      // 判断结果是否清空
      expect(wrapper.vm.Name).to.equal(null)
    })
  })

  defineMethod(testMeta, 4, '新增', '陈栋', () => {
    it('新增', () => {
      wrapper = shallowMount(Index, {
        attachToDocument: true
      })

      let buttons = wrapper.findAll('#re_ButtonGroup button')
      buttons.at(0).trigger('click')

      // 判断模态框是否打开
      expect(wrapper.find('#DataSourceDiv').isVisible()).to.equal(true)

      // 关闭模态框
      wrapper.findAll('#DataSourceDiv div[name="ButtonGroup"] button').at(1).trigger('click')

      // 判断模态框是否关闭 注意：模态框打开关闭需要加入延时
      window.setTimeout(()=>{
        expect(wrapper.find('#DataSourceDiv').isVisible()).to.equal(false)
      },1000)

    })
  })

  defineMethod(testMeta, 5, '编辑+保存', '陈栋', () => {
    it('编辑+保存', () => {
      wrapper = shallowMount(Index, {
        attachToDocument: true
      })

      // 选中表格一条记录
      wrapper.findAll('#gridBodyDiv_rule_set_table tr').at(0).trigger('click')

      let buttons = wrapper.findAll('#re_ButtonGroup button')
      buttons.at(1).trigger('click')

      // 判断模态框是否打开
      expect(wrapper.find('#DataSourceDiv').isVisible()).to.equal(true)

      // 保存
      wrapper.findAll('#DataSourceDiv div[name="ButtonGroup"] button').at(0).trigger('click')
    })
  })

  // 路由跳转参照此部分代码
  defineMethod(testMeta, 6, '查看规则版本', '陈栋', () => {
    it('查看规则版本', () => {
      // 涉及路由跳转的，都如此使用
      const localVue = createLocalVue()
      localVue.use(VueRouter)
      const router = new VueRouter()

      wrapper = shallowMount(Index, {
        attachToDocument: true,
        localVue,
        router
      })

      // 选中表格一条记录
      wrapper.findAll('#gridBodyDiv_rule_set_table tr').at(0).trigger('click')

      let buttons = wrapper.findAll('#re_ButtonGroup button')
      buttons.at(2).trigger('click')

      // 判断路由是否正确跳转
      expect(wrapper.vm.$route.path).to.equal('/ttp/RuleEngine/historyVersion')
    })
  })

  defineMethod(testMeta, 7, '删除', '陈栋', () => {
    it('删除', () => {
      const localVue = createLocalVue()
      localVue.use(VueRouter)
      const router = new VueRouter()

      wrapper = shallowMount(Index, {
        attachToDocument: true,
        localVue,
        router
      })

      // 选中表格一条记录
      wrapper.findAll('#gridBodyDiv_rule_set_table tr').at(0).trigger('click')

      let buttons = wrapper.findAll('#re_ButtonGroup button')
      buttons.at(3).trigger('click')

      // TODO:参考查询代码，判断mock后的行数
      expect(true).to.equal(true)
    })
  })

})
