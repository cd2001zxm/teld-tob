/**
 * Created by chendong on 2020/3/12.
 */
window.helperList17 = window.helperList17 || {}
window.getApplicationId = function (r) {
  return '2d289948-05d7-462a-bd7e-a4142cd99f1e'
}

function parseQuery (query) {
  var res = {}

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=')
    res[parts[0]] = parts[1]
  })

  return res
}

window.getQueryString = function (name, url) {
  var reg = new RegExp(name + '=([^&]*)', 'i')

  var r = (url ? url : window.location.href).match(reg)
  if (r != null) {
    return r[1]
  }
  return null
}

window._commonGetData = function (url,type,data) {
  var sid = getQueryString('SID', url)
  var defaultData = {'data': {'rows': [], 'total': 0}, 'errcode': null, 'errmsg': null, 'state': 1}

  console.debug('SG SID:' + sid)

  //如果没配置，返回默认结果集
  if(window.mockData.hasOwnProperty(sid) == false){
    return defaultData
  }

  var dataOrFunc = window.mockData[sid]

  if(typeof dataOrFunc === 'object'){
    return dataOrFunc
  }

  //url和发送数据合并
  var getData = parseQuery(url.split('?')[1])
  Object.assign(getData,data)
  return dataOrFunc.call(null,getData)
}

window.getDataAsync = function (url, type, data, sucCallbackFunc, errCallbackFunc, scope, withCredentials, showError, istrace, timeout) {
  var sid = getQueryString('SID', url)
  if (sid == 'WRPFrame-ExceptionLog')return console.err(data)
  var _data_ = _commonGetData(url,type,data)
  if (sucCallbackFunc) sucCallbackFunc(_data_)
}
window.getDataSync = function (url, type, data, sucCallbackFunc, errCallbackFunc, scope, withCredentials, showError, istrace, timeout) {

  var _data_ = _commonGetData(url,type,data)

  if (sucCallbackFunc) sucCallbackFunc(_data_)
}

function _p_context () {

  this.SubApplication = 'ttp'
  this.SubModule = ''
  this.isPlatformIndex = false

}

window.p_context = new _p_context()

window.doPostReport = function () {

  var ddpSgService = window.cicdParam.DDPReportUrl
  for(var index in window.reportData) {
      var postData = window.reportData[index]

    var UnitTestName = JSON.parse(postData.unitTestCase).UnitTestName
    $.ajax({
      url: ddpSgService,
      type: "post",
      data: postData,
      timeout: 2000,
      async: false,
      //async:false,
      cache: false,
      success: function success(ret, textStatus, xhr) {
        if(ret && ret.state==1){
          console.info('['+UnitTestName+']:单测结果上报成功');
        } else {
          console.error('[' + UnitTestName + ']:单测结果上报失败：');
          console.error(ret.exception)
        }
      },
      error: function error(xhr, textStatus, errorThrown) {
        console.error('['+postData.TestSuiteCode+']:单测结果上报失败：'+errorThrown);
      }

    })
  }
  //window.reportData = []
}

//拦截测试结果
var result_fun = window.__karma__.result
window.__karma__.result = function (result) {
  // var description = result.description
  // var suite = result.suite // 数组
  // console.info(">>>>>>>>>>>>>>>>>>>"+JSON.stringify(result))
  // if (result.skipped) {
  //   return
  // }




  //原始方法调用
  if(result_fun) result_fun.call(null,result)

}
var complete_fun = window.__karma__.complete
window.__karma__.complete = function (result) {

  if(window.getParamFromFile()!=null){
    console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>准备上报数据：")
    window.doPostReport()
  }

  //原始方法调用
  if(complete_fun) complete_fun.call(null,result)
}
