/**
 * Created by chendong on 2020/3/12.
 */
window.helperList17 = {}
window.getApplicationId = function (r) {
  return '2d289948-05d7-462a-bd7e-a4142cd99f1e'
}

window.getQueryString = function (name, url) {
  var reg = new RegExp(name + '=([^&]*)', 'i')

  var r = (url ? url : window.location.href).match(reg)
  if (r != null) {
    return r[1]
  }
  return null
}

window._commonGetData = function (url) {
  var sid = getQueryString('SID', url)
  var defaultData = {'data': {'rows': [], 'total': 0}, 'errcode': null, 'errmsg': null, 'state': 1}

  var ret = window.mockData.hasOwnProperty(sid) == false ? defaultData : window.mockData[sid]
  console.debug('SG SID:' + sid)
  //console.debug('结果:'+JSON.stringify(ret))
  return ret
}

window.getDataAsync = function (url, type, data, sucCallbackFunc, errCallbackFunc, scope, withCredentials, showError, istrace, timeout) {
  var sid = getQueryString('SID', url)
  if (sid == 'WRPFrame-ExceptionLog')return console.err(data)
  //
  // var a=$.Deferred()
  // window.setTimeout(function () {
  //   var _data_ =  _commonGetData(url);
  //   if(sucCallbackFunc)sucCallbackFunc(_data_)
  //   a.resolve()
  // },10)
  //
  // return a.promise()
  var _data_ = _commonGetData(url)
  if (sucCallbackFunc) sucCallbackFunc(_data_)
}
window.getDataSync = function (url, type, data, sucCallbackFunc, errCallbackFunc, scope, withCredentials, showError, istrace, timeout) {

  var _data_ = _commonGetData(url)

  if (sucCallbackFunc) sucCallbackFunc(_data_)
}

function _p_context () {

  this.SubApplication = 'ttp'
  this.SubModule = ''
  this.isPlatformIndex = false

}

window.p_context = new _p_context()


