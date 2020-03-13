/**
 * Created by chendong on 2017/2/10.
 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import FrameBody from '../vue/frame/FrameBody.vue'
import { Routes } from '../../config/teld-router-config'
import VueI18n from 'teld-vue-i18n'
import './element-plugin'

// 全局配置
Vue.config.silent = true
Vue.config.devtools = false
Vue.config.performance = true
// Vue.config.errorHandler = function (err, vm, info) {
//   try {
//     var clientType = isPC() ? 'PC' : 'Mobile'
//     var brower = getBrowerType()
//     var module = p_context.SubApplication ? p_context.SubApplication : 'platform'
//     var exc = {
//       ModuleName: module,
//       WebUrl: window.location.hash,
//       // AppVersion:'应用版本',
//       // Context:err.message,
//       ExpInfo: err.message,
//       // ExpCode:'WRP',
//       ExpLevel: 'Warning',
//       Context: (clientType + ':::' + brower),
//       ExpStack: encodeURIComponent(JSON.stringify(err)),
//       ExpType: err.__proto__.name
//     }
//     var data = {exception: JSON.stringify(exc)}
//     getDataAsync(FrameSGHost + 'WRPFrame-ExceptionLog', 'post', data, function (data) {
//     })
//   } catch (e) {
//     // do nothing
//   }
//
//   console.dir(err)
// }

// 路由器
Vue.use(Vuex)
Vue.use(VueRouter)
// Vue.use(VueContextMenu)
Vue.use(VueI18n)

let messages = {}

messages[window.locale] = window.localeMessage

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: window.locale,
  messages
})

const store = new Vuex.Store({
  state: {
    condition: null,
    navarData: [],
    SiderData: null,
    pageCommon: null,
    notifyData: null
  },
  mutations: {
    updCondition (state, condition) {
      // 变更状态
      state.condition = condition
    },
    updateNavarData (state, data) {
      state.navarData = data
    },
    updateSiderData (state, data) {
      state.SiderData = data
    },
    updatePageCommon (state, data) {
      state.pageCommon = data
    },
    updateNotifyData (state, data) {
      state.notifyData = data
    }
  },
  actions: {
    updCondition ({commit}, data) {
      commit('updCondition', data)
    },
    updateNavarData ({commit}, data) {
      commit('updateNavarData', data)
    },
    updateSiderData ({commit}, data) {
      commit('updateSiderData', data)
    },
    updatePageCommon ({commit}, data) {
      commit('updatePageCommon', data)
    },
    updateNotifyData ({commit}, data) {
      commit('updateNotifyData', data)
    }
  }
})

const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: Routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  window.t0 = getPerformanceNow()

  if (to.meta && to.meta.newOpen == 'true') {
    window.open(to.meta.mvcUrl, '_blank')
    next('/' + window.p_context.SubApplication)
    return
  }

  //window.TeldRpcIDS = {}

  //window.TeldRpcIDS[window.TeldRequestID] = 0
  beforeIntoPage(to, from, next)

  next()
})

router.afterEach(route => {

  afterIntoPage(route)
  //
  if (window.defaultRouter && window.defaultRouter != '' && (route.path == ('/' + window.p_context.SubApplication)
    || route.path == ('/' + window.p_context.SubApplication + '/'))) {
    router.push(window.defaultRouter)
  }

})

window.PerformanceInfo = {}

// 将平台上下文注入vue
Vue.mixin({
  beforeCreate: function beforeCreate () {
    this.p_context = window.p_context
  },
  mounted: function mounted () {
    if (!this.$route)return

    if (this.$route.path == '/' || this.$route.path == ('/' + window.p_context.SubApplication)
      || this.$route.path == ('/' + window.p_context.SubApplication + '/')) return

    if (window.PerformanceInfo.hasOwnProperty(this.$route.path)) {
      return
    }
    if (this.$route.hasOwnProperty('meta') && this.$route.meta.hasOwnProperty('mvcUrl'))return

    window.PerformanceInfo[this.$route.path] = 0

    var pageName = isPC() ? $.trim($('#breadcrumbs').find('small').text()) : $.trim($('#mobilePageName').text())
    var module = p_context.SubApplication ? p_context.SubApplication : 'platform'
    var domain = document.domain
    var dt = getPerformanceNow() - window.t0
    var pageAccessParam = {
      'filter': JSON.stringify({
        'PageName': pageName,
        'ModuleName': module,
        'WebSite': domain,
        'FuncId': window.patchNo || '',
        'WebUrl': window.location.hash,
        'ResponseTime': dt
      })
    }

    //重新规划处理
    // window.setTimeout(()=>{
    //     if(window.wrpPerformanceNotification){
    //         window.wrpPerformanceNotification.close()
    //     }
    //     //提示性能
    //     window.wrpPerformanceNotification = this.$notify.warning({
    //         title: '打开功能耗时',
    //         message: (Math.floor(dt)/1000+' 秒'),
    //         position: 'top-right',
    //         duration:0
    //     });
    //
    // },0)

    window.PVCount(pageAccessParam, function () {
      window.setTimeout(function () {
        window.PerformanceInfo = {}
      }, 1000)
    })

  },
})

window.teldVue = new Vue({
  i18n,
  router,
  store,
  render: h => h(FrameBody)
}).$mount('#FrameBody')
