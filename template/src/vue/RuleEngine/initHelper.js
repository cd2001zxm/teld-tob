/**
 * Created by chendong on 2019/9/24.
 */
export const initHelper = function () {

    if(window.helperList17 && window.helperList17.hasOwnProperty("ApplicationNamesHelpForRe")==false){
        window.helperList17.ApplicationNamesHelpForRe = {
            title: "应用系统帮助",
            url: window.FrameSGHost+"WebRunPlatform-GetApplicationNames",
            pageSize: 10,
            SeqColWidth:40,
            colMetaData : {
                id : {
                    field : "Id",
                    show:false,
                    return:true
                },
                code : {
                    field : "ApplicationName",//绑定的后台数据
                    displayName : "应用系统",//列名称
                    width:80,
                    cssClass:"text-center",
                    hasTitle:true,
                    return:true,//是否返回到页面中的帮助
                    show:true//是否在帮助列表中显示
                },
                name : {
                    field : "ApplicationName_CN",//必须
                    displayName : "应用系统含义",//必须
                    width:120,//宽度
                    cssClass:"text-left",//样式，左中右
                    hasTitle:true,//鼠标进入时，是否显示
                    show:true,//是否显示该列
                    return:true//是否是返回值
                }
            },
            rowKey: "id"
        }
    }
}