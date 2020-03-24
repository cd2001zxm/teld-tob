/**
 * Created by chendong on 2020/3/17.
 */

var describeProxy = require('mocha').describe;
console.dir(describeProxy)

var testStack = new Array()
var methodsStack = new Array()


/***
 *
 * @param code
 * @param no
 * @param devUserName
 * @param testName
 */
export function defineTest(testMeta,testName,func){

  if(testStack.length>0)testStack=[]
  testStack.push({
    testMeta:testMeta,
    testName:testName
  })
  return describeProxy(testName,func)
}

export function defineMethod(code,no,methodName,devName,func){

  methodsStack.push({
    code:code,
    no:no,
    methodName:methodName,
    devName:devName
  })
  return describeProxy(methodName,func)
}

window.getParamFromFile = function () {

  // window.cicdParam
  return window.cicdParam?window.cicdParam:null

}


function GMTToStr(time){
  let date = new Date(time)
  let hours = date.getHours()<10?('0'+date.getHours()):date.getHours()
  let minutes = date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes()
  let seconds = date.getSeconds()<10?('0'+date.getSeconds()):date.getSeconds()

  let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate() + 'T' +
    hours + ':' +
    minutes + ':' +
    seconds

  return Str
}


window.reportData = []

export function reportTestResult (currentTest) {




  //console.log(JSON.stringify(currentTest.$assertionErrors))

  //服务器通过文件的方式传递参数
  var testInfo = testStack[0]
  var methodInfo = methodsStack.shift()


  var fileParam = getParamFromFile();
  //非CICD环境不执行上报
  if(fileParam == null) return;



  var postData = {
    "unitTestCase":
      JSON.stringify({
      "Code": "",
      "ChangeSource": fileParam.ChangeSource,//变更源
      "SequenceNumber": methodInfo.no,
      "UnitTestName": methodInfo.methodName,
      "UnitTestType": 0,
      "Description": methodInfo.methodName,
      "ServiceType": 1, //需要调整
      "ServiceID": testInfo.testMeta.webpackChunkName,//写死 功能编号webpackChunkName
      "Tag": "",
      "UserName": methodInfo.devName,
      "TestSuiteCode": testInfo.testMeta.testSuiteCode,
      "UnitTestAssembly": testInfo.testMeta.webpackChunkName,//webpackChunkName
      "UnitTestClass": testInfo.testMeta.vueFilePath,//vueFilePath
      "UnitTestMethod": "",
      "HostName": fileParam.HostName,
      "Passed": currentTest.state=='passed'?true:false,
      "Duration": currentTest.duration,
      "ExecuteTime": GMTToStr(  currentTest.$startTime),
      "CertInfo": null,
      "BatchID": fileParam.BatchID,
      "IsJustDefine": false,
      "TestFile": {
        "FileName": null,
        "FileMD5": '临时必填字段'
      },
      "TenantID": fileParam.TenantID,
      "MethodContent":currentTest.body,//方法实现
      "CallStackTrace":currentTest.state=='failed'?currentTest.$errors.join('\n'):'',//错误堆栈
      "ClientType":2 //1,后端 2，前端
    })
  }

  window.reportData.push(postData)

}

