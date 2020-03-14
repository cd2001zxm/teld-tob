/**
 * Created by chendong on 2020/3/12.
 */
window.helperList17 = {}
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


