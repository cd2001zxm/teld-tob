<template></template>
<script>
    export default {
        data(){
            return {}
        },
        mounted(){
            $(function () {
                //跳转GS平台
                getDataSync(FrameSGHost+"UserAPI-WEBUI-GetGSCodeInfo", "get", {}, function (psp) {
                    if (psp.state == "1") {
                        var UserCode = psp.data.Code
                        var url = "http://t-bja1-gs.chinacloudapp.cn/cwbase/web/singlelogin.aspx?AuthType=UserMap&AppCode=BI&UserCode="+UserCode
                        window.location.href = url
                    } else {
                        NotifyError(psp.ErrorInfo);
                    }
                });
            })
        }
    }
</script>