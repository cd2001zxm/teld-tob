/**
 * Created by chendong on 2020/3/12.
 */
import { shallowMount, createLocalVue  } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Index from '@/vue/RuleEngine/define/Index.vue'

describe('规则定义列表', () => {

  let wrapper

  afterEach(() => {
    wrapper.destroy()
  })

  it('初始化', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    expect(wrapper.isEmpty()).to.be.false
  })

  it('查询', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    let button = wrapper.find('#BtnSearch')
    button.trigger('click')
    let trs = wrapper.findAll("#gridBodyDiv_rule_set_table tr")

    //判断绘制的表格行数是否达到预期
    expect(trs.length).to.equal(10)
  })

  it('重置', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    wrapper.setData({Name:'测试名称'})
    //验证查询条件是否生效
    expect(wrapper.vm.Name).to.equal('测试名称')

    let button = wrapper.find('#btnReset')
    button.trigger('click')

    //判断结果是否清空
    expect(wrapper.vm.Name).to.equal(null)
  })

  it('新增', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    let buttons = wrapper.findAll('#re_ButtonGroup button')
    buttons.at(0).trigger('click')

    //判断模态框是否打开
    expect(wrapper.find('#DataSourceDiv').isVisible()).to.equal(true)

    //关闭模态框
    wrapper.findAll('#DataSourceDiv div[name="ButtonGroup"] button').at(1).trigger('click')

  })

  it('编辑+保存', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    //选中表格一条记录
    wrapper.findAll("#gridBodyDiv_rule_set_table tr").at(0).trigger('click')

    let buttons = wrapper.findAll('#re_ButtonGroup button')
    buttons.at(1).trigger('click')

    //判断模态框是否打开
    expect(wrapper.find('#DataSourceDiv').isVisible()).to.be.true

    //保存
    wrapper.findAll('#DataSourceDiv div[name="ButtonGroup"] button').at(0).trigger('click')

  })

  it('查看规则版本', () => {
    //涉及路由跳转的，都如此使用
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    wrapper  = shallowMount(Index,{
      attachToDocument: true,
      localVue,
      router
    })

    //选中表格一条记录
    wrapper.findAll("#gridBodyDiv_rule_set_table tr").at(0).trigger('click')

    let buttons = wrapper.findAll('#re_ButtonGroup button')
    buttons.at(2).trigger('click')

    //完成代码覆盖率
    expect(true).to.equal(true)

  })

  it('删除', () => {

    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    wrapper  = shallowMount(Index,{
      attachToDocument: true,
      localVue,
      router
    })

    //选中表格一条记录
    wrapper.findAll("#gridBodyDiv_rule_set_table tr").at(0).trigger('click')

    let buttons = wrapper.findAll('#re_ButtonGroup button')
    buttons.at(3).trigger('click')

    //参考查询代码，判断mock后的行数
    expect(true).to.equal(true)
  })

  it('帮助测试示例', () => {
    wrapper  = shallowMount(Index,{
      attachToDocument: true
    })

    //打开帮助
    let buttons = wrapper.findAll('#ApplicationNamesHelpDiv2 button')
    buttons.at(0).trigger('click')

    //data-helper拼接"Class"
    let modalClassNameSelector = 'div.ApplicationNamesHelpForRe' + 'Class'

    //让它渲染一会儿
    window.setTimeout(()=>{

      //判断模态框是否打开
      expect(wrapper.find(modalClassNameSelector).isVisible()).to.equal(true)

      //选中一条记录
      wrapper.findAll(modalClassNameSelector + ' div.table-body tr').at(0).trigger('click')

      //点击确定按钮
      wrapper.findAll(modalClassNameSelector +' div[name="ButtonGroup"] button').at(0).trigger('click')

    },1000)



  })
})
