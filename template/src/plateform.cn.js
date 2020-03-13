/**
 * Created by chendong on 2017/7/11.
 */

//自动分析域名后缀
var domain = function (domain) {
    var ares = domain.split(':')[0].split('.')
    ares.shift()
    ares.unshift('')
    return ares.join('.')
}(document.domain);


//运行框架后台服务地址
window.FrameHost = "//frame"+domain;
window.FrameSGHost = "//sgi"+domain+":7777/api/invoke?SID="
window.FrameSGHostSOM = "//sgi"+domain+":7777/api/invoke?SID="
window.FrameServiceHostCSC = "//sgi"+domain+":7777/api/invoke?SID="
window.FrameServiceHostSYS = "//sgi"+domain+":7777/api/invoke?SID="
window.FrameSysSrv = "//sgi"+domain+":7777/api/invoke?SID="
window.OmpSGHost = "//sgi"+domain+":7777/api/invoke?SID="

//资源服务地址
window.ResourcePath = "//resource" + domain;


//当前域名的首格名称
window.Application = "web";

//用户中心
window.UserCenterUrl = "//user" + domain;

//系统的应用ID
window.ApplicationID = "731C5AB6-6FA3-4009-82C6-F1939C4BA8AE";

//系统缺省名称（无身份认证时访问使用）
window.SysDefaultName = "特来电";

//token刷新地址
window.newTokenRefreshUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-WEBUI-SRefreshToken"
window.ATokenRefreshUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-WEBUI-ASRefreshToken"
window.aLoginUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-WEBUI-ASLogin"

window.aLoginAppUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-APP-ASLogin"
window.newTokenRefreshAppUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-APP-SRefreshToken"
window.ATokenRefreshAppUrl = "//sgi"+domain+":7777/api/invoke?SID=UserAPI-APP-ASRefreshToken"

//发布管理系统地址(获取版本信息)
window.CmsUrl = "//sgi"+domain+":7777/api/invoke?SID=CMS-GetSysRelease&token=teld";
//测试的时候可以设置为false，可以不检查token
//window.TokenEnabled=true;
window.traceUnEnabled=true
window.SOMServiceHost='//sgi.wyqcd.cn:7777'

var a="open"+domain,b="mls"+domain,c="evr"+domain;
window.directWebsite={}
window.directWebsite[a]=0
window.directWebsite[b]=0
window.directWebsite[c]=0
window.locale = "zh"
window.ddpDomain="http://sg.wyqcd.com:7777"
window.ddpWeb = "http://web.wyqcd.com"
window.ddpHostList = {
    "web.teld.org":"http://sgi.teld.org:9080/api/invoke?SID=",
    "web.wyqcd.com":"http://sg.wyqcd.com:7777/api/invoke?SID="
}
window.AggregateStartTime = "2019/12/09 00:00:00"
window.ddpDetailUrl = "http://web.wyqcd.com/#/ddp/DDP/FuncAggregationDetail?Code="
window.SgSetApiUrl = "http://40.125.213.54:8098/api/RouteService/GetDomainName?location="
window.WebFrameVersion = 20191231



