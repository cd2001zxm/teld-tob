


// const IndexPage = r => require.ensure([], () => r(require('../src/vue/frame/Index.vue')), 'Index')
// const SubIndexPage = r => require.ensure([], () => r(require('../src/vue/frame/SubIndex.vue')), 'Index')
// const Mvc = r => require.ensure([], () => r(require('../src/vue/frame/Mvc.vue')), 'Index')
// const RedirectService = r => require.ensure([], () => r(require('../src/vue/frame/RedirectService.vue')), 'Index')

const IndexPage = import(/* webpackChunkName: "Index" */ '../src/vue/frame/Index.vue')
const SubIndexPage = import(/* webpackChunkName: "Index" */ '../src/vue/frame/SubIndex.vue')
const Mvc = import(/* webpackChunkName: "Index" */ '../src/vue/frame/Mvc.vue')
const RedirectService = import(/* webpackChunkName: "Index" */ '../src/vue/frame/RedirectService.vue')

//const ruleDefine = require.ensure([], () => r(require('../src/vue/RuleEngine/define/Index.vue')), 'Rule-Define')
//const historyVersion = require.ensure([], () => r(require('../src/vue/RuleEngine/define/HistoryVersion.vue')), 'Rule-Define')

const ruleDefine = () => import(/* webpackChunkName: "Rule-Define" */ '../src/vue/RuleEngine/define/Index.vue')
const historyVersion = () => import(/* webpackChunkName: "Rule-Define" */ '../src/vue/RuleEngine/define/HistoryVersion.vue')

export const Routes = [
    //首页
    { path: '/', component: IndexPage,name:"首页" },
    { path: '/RService', component: RedirectService, name: "" },
    { path: '/ttp', component: SubIndexPage, name: "客户组管理"},
    { path: '/ttp/RuleEngine/RuleDefine', component: ruleDefine, name: "客户组管理"},
    { path: '/ttp/RuleEngine/historyVersion', component: historyVersion, name: "客户组管理"}

]
