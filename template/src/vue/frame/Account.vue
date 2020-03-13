<template>
    <div class="navbar-header pull-right">
        <div class="navbar-account">
            <ul class="account-area">

                <li class="hidden-xs" style="">
                    <div class="input-group navar-search " style="border-collapse:collapse;display: table;width: 100%;width: 220px;" >

                        <input id="wrpSearchCond" class="navbar-searchins" type="text" autocomplete="off" size="40" v-bind:placeholder="$t('localeMsg.WrpSearchPH')" >
                               <!--onfocus='$("#wrpSearchRet").css("display","block")'>-->


                        <button type="button" id="removeIcon" class="navbar-searchbtn" style="display: none;"
                                v-on:click.stop.prevent="removeIconClick">
                            <i class="glyphicon glyphicon-remove iconcolor"></i>
                        </button>
                        <button type="button" class="navbar-searchbtn" style="" v-on:click.stop.prevent="searchbtnClick">
                            <i class="glyphicon glyphicon-search iconcolor"></i>
                        </button>
                        <template v-if="FullSearchResult.length>0">
                            <div id="wrpSearchRet" class=" " style="box-shadow: 0 2px 2px rgba(0,0,0,.4);background: white;margin-top: 1px;width: 220px;max-height: 500px;overflow-y: auto;overflow-x:hidden">
                                <template v-for="fsr in FullSearchResult">
                                    <div v-show="fsr.key==SubApplication" style="color: #00a7cb;background-color: rgb(243, 243, 243);line-height: 30px;font-weight: bold">{{fsr.name}}</div>
                                    <div v-show="fsr.key!=SubApplication" style="background-color: rgb(243, 243, 243);line-height: 30px;font-weight: bold">{{fsr.name}}</div>
                                    <hr style="margin-top: 1px;margin-bottom: 1px;">
                                    <ul  style="width: 100%;list-style: none;padding-left: 5px;padding-right: 30px;">
                                        <template v-for="item in FullSearchResultGroup[fsr.key]">
                                            <li class="" style="line-height: 40px;cursor: pointer"  v-on:click="SearchResultClick(item)"
                                                v-bind:data-app="item.ApplicationCode"
                                                v-bind:data-router="item.Router" v-bind:data-MenuID="item.MenuID">
                                                {{item.RouterName}}
                                            </li>
                                        </template>
                                    </ul>
                                    <div style="margin-top: 5px"></div>
                                </template>

                            </div>

                        </template>

                    </div>

                </li>
                <li id="sub_favoritor" v-show="isIndex==false" title="收藏">
                    <a class="login-area dropdown-toggle" data-target="#" data-toggle="dropdown" style="padding-left: 2px;text-align: center;" >
                        <div style="vertical-align: middle;display: inline;line-height: 50px;">
                            <i class="glyphicon glyphicon-star-empty" style="font-size: 20px;color: white;"></i>
                        </div>

                    </a>
                    <div id="sub-favoritor-body" class=" pull-right dropdown-menu dropdown-login-area">
                        <ul class="">
                            <template v-for="busInfo in favoriteData">
                                <li v-bind:name="busInfo.ID " v-bind:id="'F_' + busInfo.MENUID" >

                                    <span class=""><a href="javascript:void(0);" style="padding:1px 2px"  v-on:click="jumpFromFavorite(busInfo)">{{$t(busInfo.APPLICATION+'[\'M'+busInfo.MENUID+'\']',busInfo.FULLNAME)}}</a></span>
                                    <span class="pull-right f-remove">
                                           <a class="icon-only" href="javascript:void(0);" v-on:click.stop="fadelete(busInfo.ID)" title="删除"><i class="glyphicon glyphicon-trash"></i></a>
                                       </span>

                                </li>
                            </template>
                        </ul>
                    </div>

                </li>
                <li id="wrp_notify" title="通知">
                    <a v-show="showNotify" class="login-area dropdown-toggle" data-target="#" data-toggle="dropdown" style="padding-left: 2px;text-align: center;" v-on:click="drawerStatusChanged">
                        <div style="vertical-align: middle;display: inline;line-height: 50px;">
                            <i class="glyphicon glyphicon-bell" style="font-size: 20px;color: white;" ></i>
                        </div>
                        <sup class="el-badge__content el-badge__content--undefined is-fixed is-dot" style="right:15px;top:12px;" v-show="hasNew"></sup>
                    </a>
                </li>
                <template v-if="ShowNowOnNavbar">
                    <li class="visible-lg">
                        <span id="frame_currentDate" style="display: inline-block;line-height:50px;font-size: 14px;color: white;padding-right: 15px;padding-left: 15px;"><i class="fa fa-spinner fa-spin"></i></span>
                    </li>
                </template>

                <li class="" id="accout-dropdown">

                    <a class="login-area dropdown-toggle" data-toggle="dropdown">
                        <div class="avatar hidden-xs" v-bind:title="$t('localeMsg.WrpProfile')">
                            <template v-if="BaseInfo.SiderData.userData.Avatar!=''">
                                <img v-bind:src="BaseInfo.SiderData.userData.Avatar" crossorigin="anonymous">
                            </template>
                            <template v-else>
                                <span style="height: 100%;width: 100%;display: inline-block;text-align: center;vertical-align: middle;line-height: 30px;color: white;"><i class="fa fa-spinner fa-spin"></i></span>
                            </template>

                        </div>
                        <div class="user-name">
                            {{BaseInfo.SiderData.userData.UserName}}
                        </div>
                        <div class="user-icon">
                            <span class="profile">
                                <span class="glyphicon glyphicon-certificate"></span>
                            </span>
                        </div>
                    </a>
                    <ul class="pull-right dropdown-menu dropdown-login-area">


                        <li style="height:65px;">
                            <div class="avatar-area">
                                <img v-bind:src="BaseInfo.SiderData.userData.Avatar" class="avatar" crossorigin="anonymous">
                            </div>
                            <ul>
                                <span style="padding-left: 10px;padding-top:5px ">{{BaseInfo.SiderData.userData.RealName}}</span><br>
                                <span style="padding-left: 10px;padding-top:5px "><small style="cursor: default;">{{BaseInfo.SiderData.userData.Email}}</small></span>
                            </ul>
                        </li>

                        <!--<li class="edit">-->
                        <!--<a href="javascript:void(0)" class="" v-on:click="MenuGroupMgr">菜单组设置</a>-->
                        <!--</li>-->

                        <li class="edit">
                            <a href="javascript:void(0)" class="pull-left" v-on:click="setting">{{$t("localeMsg.WrpLinkSetting")}}</a>
                        </li>

                        <!--<li class="" v-show="isCpUser">-->
                            <!--<a href="javascript:void(0)" style="color: #717171;font-size: 13px;font-weight: 300;" class="pull-left" v-on:click="setting">{{$t("localeMsg.WrpFeatureView")}}</a>-->
                        <!--</li>-->
                        <!--Theme Selector Area-->
                        <li class="theme-area">
                            <!--<ul class="colorpicker " id="skin-changer">-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#008cee;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/blue.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#00a7cb;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/azure.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#0c8484;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/teal.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#3caf36;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/teld.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#FF8F32;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/orange.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#e33b37;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/pink.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#AC193D;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/darkred.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#8C0095;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/purple.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#0078d7;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/darkblue.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#585858;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/gray.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#474544;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/black.min.css'"></a></li>-->
                            <!--<li><a class="colorpick-btn" href="javascript:void(0);" style="background-color:#001940;" v-bind:rel="BaseInfo.ResourcePath + '/platform/teld/css/skins/deepblue.min.css'"></a></li>-->
                            <!--</ul>-->
                        </li>
                        <!--/Theme Selector Area-->
                        <li class="dropdown-footer">

                            <a href="javascript:void(0)" onclick="$('#abortModal').modal('show')" class="pull-left">
                                {{$t("localeMsg.WrpAbort")}}
                            </a>

                            <a id="logout" href="javascript:void(0)" v-on:click="logout">
                                {{$t("localeMsg.WrpLogout")}}
                            </a>
                        </li>
                    </ul>

                </li>

                <template v-if="ShowFullscreenOnNavbar">
                    <li class="visible-lg">
                        <a id="fullscreen-toggler" href="javascript:void(0)" title="全屏模式" class="fullscreen hidden-xs" style="text-align: center;vertical-align: middle;line-height: 50px;color: white;">
                            <i class="glyphicon glyphicon-fullscreen" style="font-size: 14px;font-style: normal;font-weight: 400;line-height: 27px;"></i>
                        </a>
                    </li>
                </template>


            </ul>
        </div>

    </div>

</template>
<style>
    #sub-favoritor-body{
        font-size:16px;
        color:black;
    }
    #sub-favoritor-body ul{
        padding-left: 0px;
        margin-bottom: 0px;
        list-style-position:inside;
    }

    #sub-favoritor-body ul li {
        padding: 2px 15px;
    }
    #sub-favoritor-body ul li a{
        color:inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 210px;
        display: inline-block;
        vertical-align: bottom;
        height: 25px!important;
        line-height: 25px!important;
        padding: 0;
    }
    #sub-favoritor-body ul li a:hover{
        text-decoration:none;
        cursor:pointer;
    }
    #sub-favoritor-body span {
        height: 25px;
        line-height: 25px;
    }
    #sub-favoritor-body span a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 25px!important;
        line-height: 25px!important;
    }


    #pcmenu {
        margin-right: 0px;
    }

    #pcmenu a {
        color: white !important;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
        display: inline-block;
        vertical-align: bottom;
    }

    #pcmenu > li > a:hover, #pcmenu > li > a:focus .menu-menu li a {
        text-decoration: none;
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background-color: inherit;
    }

    .menu-menu li.active {

    }
    #wrpSearchRet li.open{
        color: #00a7cb;
    }
</style>
<script>

    export default{
        data(){

            return {
                BaseInfo:this.info?this.info:{
                    SiderData:{
                        userData:{
                            Avatar:"",
                            UserName:"",
                            Email:""
                        }
                    }
                },
                ShowNowOnNavbar:window.ShowNowOnNavbar,
                ShowFullscreenOnNavbar:window.ShowFullscreenOnNavbar,
                FullSearchResult:[],FullSearchResultGroup:{},tempList:[],
                favoriteData:[],
                isIndex:window.p_context.isPlatformIndex,
                hasNew:false,
                showNotify:false
            }
        },
        watch:{
            "$store.state.notifyData":function() {
                var notifyData = this.$store.state.notifyData;
                if(!notifyData)return
                var newFeatureNotifyKey = notifyData.newFeatureNotifyKey
//                if(localStorage.getItem(newFeatureNotifyKey)=="yes"){
//                    this.showNotify=true
//                }else{
//                    this.showNotify=false
//                }

                if(!window.p_context.isPlatformIndex){
                    this.showNotify=true
                }
                this.hasNew = notifyData.hasNew
            }
        },
        mounted(){
            var that = this;
            function renderOldVersion(item) {
                var template = '<div class="widget collapsed" style="margin-bottom:5px;">' +
                    '<div class="widget-header">' +
                        '<i class="widget-icon fa fa-file-text iconcolor"></i>' +
                        '<span class="widget-caption">{0}</span>' +
                        '<span class="widget-caption" style="padding-left: 10px">{1}</span>' +
                        '<div class="widget-buttons"><a href="#" data-toggle="collapse">详情</a></div>' +
                    '</div>' +
                    '<div class="widget-body table-responsive" style="word-wrap: break-word;overflow-x:auto">{2}</div>' +
                '</div>';
                var list = [];
                var temp = new String(template);

                var f0 = new RegExp("\\{0\\}", "gm");
                var f1 = new RegExp("\\{1\\}", "gm");
                var f2 = new RegExp("\\{2\\}", "gm");
                temp = temp.replace(f0, item.Version);
                temp = temp.replace(f1, item.Date);
                temp = temp.replace(f2, item.Content);
                list.push(temp);
                $("#aboutList").html(list.join(""));

                //initZoomImg();
                $('.widget-buttons *[data-toggle="collapse"]').off("click").on("click", function (n) {
                    n.preventDefault();
                    n.stopPropagation();
                    var t = $(this).parents(".widget").eq(0), r = t.find(".widget-body"), i = $(this).find("i"), u = "fa-plus", f = "fa-minus", e = 300;
                    t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u), t.removeClass("collapsed"), r.slideUp(0, function () {
                        r.slideDown(e)
                    })) : (i && i.addClass(u).removeClass(f), r.slideUp(200, function () {
                        t.addClass("collapsed")
                    }))
                });

                var first = $("div.widget").first();
                first.find(".widget-header").addClass("btn-primary");
                first.find("a").css("color", "white");
                first.find("i").removeClass("iconcolor");
                first.find("a").click();
                $('.widget').off("click").on("click", function (n) {
                    n.stopPropagation();
                    n.preventDefault();
                    var t = $(this).eq(0), r = t.find(".widget-body"), i = $(this).find("i"), u = "fa-plus", f = "fa-minus", e = 300;
                    t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u), t.removeClass("collapsed"), r.slideUp(0, function () {
                        r.slideDown(e)
                    })) : (i && i.addClass(u).removeClass(f), r.slideUp(200, function () {
                        t.addClass("collapsed")
                    }))


                });

            }

            $(function () {
                $('#abortModal').on('show.bs.modal', function (e) {
                    if(that.p_context.isPlatformIndex){
                        $("#aboutList").html("web运行平台<br>版本 3.0.0<br>Copyright © 2015 - 2019 青岛特来电新能源有限公司 鲁ICP备14031144号-3")
                        return
                    }
                    if(!window.CmsUrl)return;
                    getDataAsync(window.CmsUrl+'&page=1&rows=100&sysID='+window.getApplicationId(that.p_context.SubApplication), 'get',
                        null, function (data) {
                            if (data.state == 0) {
                                NotifyError(data.errmsg);
                            }
                            else {
                                if(data.data)
                                    renderOldVersion(data.data);
                            }

                        }, function () {
                            NotifyError("服务器内部错误");
                        },null,false
                    );

                })
                $("#wrpSearchCond").off("input").on("input",function () {

                    var curVal = $(this).val();
                    that.$_moduleSearch(curVal)

                })
                $("#wrpSearchCond").off("focus").on('focus',function () {
                    if($("#wrpNotifyDrawer").css("display")=='block'){
                        that.$emit('drawerStatusChanged')
                    }
                })
                $("#wrpSearchCond").off("keydown").on("keydown",function (evt) {
                    if(evt.which==40 || evt.which==38){
                        var lis = $("#wrpSearchRet li")
                        var length = lis.length;
                        var curElem = $("#wrpSearchRet li.open").length==0?null:$("#wrpSearchRet li.open").eq(0)


                        lis.removeClass("open")

                        //down 40
                        if(evt.which==40) {

                            if(!curElem){
                                lis.first().addClass("open")
                            }else{
                                var curIndex = -1
                                lis.each(function (index) {
                                    if($(this).attr("data-menuid")==curElem.attr("data-menuid"))
                                        curIndex = index
                                })

                                if(curIndex+1 >= length){
                                    lis.first().addClass("open")
                                }else{
                                    lis.eq(curIndex+1).addClass("open")
//                                    if(lis.eq(curIndex+1).offset().top > 500){
//                                        debugger
//                                        $("#wrpSearchRet").scrollTop(50)
//                                    }
                                }


                            }

                        }
                        //up 38
                        if(evt.which==38){
                            if(!curElem){
                                lis.last().addClass("open")
                            }else{
                                var curIndex = -1
                                lis.each(function (index) {
                                    if($(this).attr("data-menuid")==curElem.attr("data-menuid"))
                                        curIndex = index
                                })

                                if(curIndex-1 < 0){
                                    lis.last().addClass("open")
                                }else{
                                    lis.eq(curIndex-1).addClass("open")
                                    console.dir(lis.eq(curIndex-1).offset().top)
                                }

                            }
                        }

                    }
                    if(evt.which==13){
                        var curElem = $("#wrpSearchRet li.open").length==0?null:$("#wrpSearchRet li.open").eq(0)
                        if(curElem){
                            var app = curElem.attr("data-app")
                            var Router = curElem.attr("data-router")
                            var MenuID = curElem.attr("data-MenuID")
                            var sign = Router.indexOf("?")==-1?"?":"&"
                            var url = "//"+ window.location.host +"/#/"+app+Router+sign+"mid="+MenuID

                            if(window.p_context.SubApplication == app){
                                //window.location.href = url
                                //window.location.reload()
                                //什么都不作
                                //return
                                that.$router.push({path:(Router+sign+"mid="+MenuID)})
                                window.resetSelectedMenu()
                            }else{
                                var opener = window.open(url,"_blank")
                                opener = null
                            }
                        }
                    }

                })

                $(document).on("click", function (event) {
                    if($("#wrpSearchRet").css("display")=="block"){
                        //$("#removeIcon").click()
                        that.removeIconClick()
                    }
                });

                if(window.top != window.self){
                    $(".navar-search").css("display","none")
                }
                that.SubApplication = window.p_context.SubApplication
                $("#sub_favoritor").on('show.bs.dropdown', function () {
                    if($("#wrpNotifyDrawer").css("display")=='block'){
                        that.$emit('drawerStatusChanged')
                    }

                    getDataSync(FrameSGHost+"WRPFrame-GetFavoriteInfo", "get", { "applicationId": "WRP" }, function (data) {

                        if (data.state == "1") {

                            if (!data.rows || data.rows=="" || data.rows.length==0) {
                                window.webFrameFavorate=[]
                                that.favoriteData = []
                                return;
                            }

                            var busInfos = data.rows;
                            window.webFrameFavorate=busInfos;

                            //that.$nextTick(function(){
                                that.favoriteData = busInfos
                            //});
                        } else {
                            NotifyError(data.errmsg);
                            return;
                        }
                    });
                })
                $("#accout-dropdown").on('show.bs.dropdown', function () {
                    if($("#wrpNotifyDrawer").css("display")=='block'){
                        that.$emit('drawerStatusChanged')
                    }
                })

            })

            getWrpUserInfo().then(function (user) {

                //云平台
                if(user.DepartmentId == "0c0b4f96-8d6e-40f9-8b12-ab39972bd7d3"){
                    that.isCpUser = true

                }
            })

            that.faload()
            window.setInterval(function () {
                //创建Date对象
                var today = new Date();
                //分别取出年、月、日、时、分、秒
                var year = today.getFullYear();
                var month = today.getMonth()+1;
                var day = today.getDate();
                var hours = today.getHours();
                var minutes = today.getMinutes();
                var seconds = today.getSeconds();
                //如果是单个数，则前面补0
                month  = month<10  ? "0"+month : month;
                day  = day <10  ? "0"+day : day;
                hours  = hours<10  ? "0"+hours : hours;
                minutes = minutes<10 ? "0"+minutes : minutes;
                seconds = seconds<10 ? "0"+seconds : seconds;
                $("#frame_currentDate").text(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds);
            },1000)
        },

        props: {
            info:{
                type: Object,
                required: true
            }
        },
        methods:{
            drawerStatusChanged:function () {
                this.$emit('drawerStatusChanged')
            },
            removeIconClick:function (event) {
                $('#wrpSearchCond').val('');
                //$('#wrpSearchRet').css('display','none').empty();
                hideRemoveIcon(document.getElementById('wrpSearchCond'),'removeIcon')
                this.FullSearchResult=[]
                this.FullSearchResultGroup = []
            },
            $_moduleSearch:function (curVal) {
                var that = this
                var dom = document.getElementById("wrpSearchCond")
                if(curVal == ''){
                    window.hideRemoveIcon(dom, 'removeIcon')
                }else{
                    window.showRemoveIcon(dom, 'removeIcon');
                }

                window.setTimeout(function () {
                    if(curVal!=""){
                        getDataSync(FrameSGHost+"WRPFrame-SearchFuncByName", "get", { name:curVal}, function (result) {

                            that.tempList=[]
                            that.FullSearchResult=[]
                            that.FullSearchResultGroup = []
                            for(var i=0;i<result.length;i++){
                                var item = result[i];
                                var appCode = item.ApplicationCode;

                                if($.inArray(appCode,that.tempList)==-1){
                                    that.tempList.push(appCode)
                                    that.FullSearchResult.push({
                                        key:appCode,
                                        name:item.ApplicationName
                                    })
                                }
                                if(that.FullSearchResultGroup.hasOwnProperty(appCode)){
                                    that.FullSearchResultGroup[appCode].push(item)
                                }else{
                                    that.FullSearchResultGroup[appCode] = [item]
                                }

                            }

                        });
                    } else {
                        that.tempList=[]
                        that.FullSearchResult=[]
                        that.FullSearchResultGroup = []
                    }
                },0)
            },
            searchbtnClick:function(){
                var val = $("#wrpSearchCond").val();
                this.$_moduleSearch(val);
            },
            jumpFromFavorite:function (info) {


                var APPLICATION = info.APPLICATION;
                var NAVIGATEURL = info.NAVIGATEURL
                var GroupId = info.GroupId

                //window.removeMid()

                window.createCookie(window.getMenuCookieKey(),info.MENUID);
                if(GroupId!="")
                    window.createCookie(window.getMenuGroupCookieKey(),info.GroupId);

                var sign = NAVIGATEURL.indexOf("?")==-1?"?":"&"

                //同一个关键应用
                if(APPLICATION == window.p_context.SubApplication){
                    var url = "/"+APPLICATION.split(".")[0] + NAVIGATEURL+sign+"mid="+info.MENUID
                    this.$router.push({path:url})
                    window.resetSelectedMenu()
                }else{
                    var url = "//"+ window.location.host +"/#/"+APPLICATION.split(".")[0] + NAVIGATEURL+sign+"mid="+info.MENUID
                    var opener = window.open(url,"_blank")
                    opener = null
                }
                //window.p_context.SubApplication = APPLICATION.split(".")[0]

            },
            fadelete:function (id) {
                var that = this;
                getDataAsync(FrameSGHost+"WRPFrame-delFavoriteInfo", "get", { "favoriteId": id }, function (result) {
                    if (result.state == "1") {
                        that.favoriteData = JSON.parse(result.rows);
                        //同时赋值全局变量
                        window.webFrameFavorate = that.favoriteData
                        //如果正好在当前收藏页面，取消标识
                        window.initFavorate(window.location.href);

                        that.$nextTick(function () {
                            $(".favoritor-body").find("li").each(function () {
                                $(this).hover(function () {
                                    $(this).find(".f-remove").removeClass("hide")
                                },function () {
                                    $(this).find(".f-remove").addClass("hide")
                                });
                            })
                        })

                        NotifySuccess(that.$i18n.messages[window.locale].localeMsg["wrp-errmsg-0009"]);

                    } else {
                        NotifyError(result.errmsg);
                        return;
                    }
                });
            },
            faload:function () {
                var that = this;

                var od = window.webFrameFavorate
                this.favoriteData = od;
                this.$nextTick(function () {
                    $(".favoritor-body").find("li").each(function () {
                        $(this).hover(function () {
                            $(this).find(".f-remove").removeClass("hide")
                        },function () {
                            $(this).find(".f-remove").addClass("hide")
                        });
                    })
                })
            },
            logout:function () {

                bootbox.setDefaults("locale", "zh_CN");
                bootbox.confirm(this.$i18n.messages[window.locale].localeMsg.LogOutConfirmMessage, function (ok) {
                    if (ok) {

                        if(window.frames.length > 0){
                            window.frames[0].postMessage("gotoLogin","*")
                        }

                        window.setTimeout(function () {
                            if(readCookie("telda")){
                                window.getDataSync(FrameServiceHostSYS+"UserAPI-WEBUI-Logout", 'POST', {
                                    logoutInfo: JSON.stringify({
                                        "AccessToken":readCookie("telda"),
                                        "TELDSID":readCookie("TELDSID")
                                    })
                                }, function (data) {

                                    RemoveGlobelData("teldTTT")
                                    eraseCookie("TELDSID")
                                    eraseCookie("telda")
                                    eraseCookie("teldb")
                                    eraseCookie("teldc")
                                    eraseCookie("teldd")
                                    eraseCookie("teldk")
                                    eraseCookie("teldz")
                                    eraseCookie("TELDSID")
                                    var uri = window.location.href;
                                    if(window.isSaas)uri=window.location.protocol+"//"+window.p_context.SubApplication+window.domain
                                    var oldUrl = "?redirect_uri="+ encodeURIComponent(uri);
                                    window.location.href=window.UserCenterUrl +oldUrl;
                                },null,null,false);
                            }else{
                                RemoveGlobelData("teldTTT")
                                eraseCookie("TELDSID")
                                eraseCookie("telda")
                                eraseCookie("teldb")
                                eraseCookie("teldc")
                                eraseCookie("teldd")
                                eraseCookie("teldk")
                                eraseCookie("teldz")
                                eraseCookie("TELDSID")
                                var uri = window.location.href;
                                if(window.isSaas)uri=window.location.protocol+"//"+window.p_context.SubApplication+window.domain
                                var oldUrl = "?redirect_uri="+ encodeURIComponent(uri);
                                window.location.href=window.UserCenterUrl +oldUrl;
                            }
                        },500)



                    }
                });
            },
            MenuGroupMgr:function () {
                this.$router.push("/Frame/MenuGroupMgr?");
            },
            setting:function () {
                //eraseCookie('settingtabindex');

                //this.$router.push("/Frame/Setting");
                $("#frame_settiong").modal("show")
            },
            SearchResultClick:function (item) {

                var sign = item.Router.indexOf("?")==-1?"?":"&"
                var url = "//"+ window.location.host +"/#/"+item.ApplicationCode + item.Router+sign+"mid="+item.MenuID
                if(window.p_context.SubApplication == item.ApplicationCode){
                    //window.location.href = url
                    //window.location.reload()
                    this.$router.push({path:(item.Router+sign+"mid="+item.MenuID)})
                    window.resetSelectedMenu()
                }else{
                    var opener = window.open(url,"_blank")
                    opener = null
                }

            }

        }
    }
</script>
