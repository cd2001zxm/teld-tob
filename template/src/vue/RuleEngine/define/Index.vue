<template>
    <div class="row" id="rule_group_listPage">
        <LayoutSingleList>
            <div slot="TableListSearch" class="table-toolbar text-left clearfix" style="padding-top:0px; padding-bottom:0px;">
                <div class="btn-group" style="width:200px">
                    <div class="input-group helper-group" id="ApplicationNamesHelpDiv2">
                        <input type="hidden" name="ApplicationName" id="ApplicationName" class="form-control"
                               readonly="readonly" data-recive-helper-data="code">
                        <input type="text" name="ApplicationName_CN" id="ApplicationName_CN" class="form-control"
                               readonly="readonly" data-recive-helper-data="name" value="关键应用" style="height:32px;">
                        <span class="input-group-btn">
                         <button class="btn btn-default shiny" data-toggle="modal"
                                 data-helper="ApplicationNamesHelpForRe" type="button" data-validate="false">
                             <i class=" fa fa-ellipsis-h"></i>
                         </button>
                    </span>
                    </div>
                </div>
                <div class="btn-group" id="ruleGroup" style=" margin:0 5px;">
                </div>
                <div class="btn-group" style="width:200px">
                    <input type="text" placeholder="名称" title="名称" class="form-control input-sm"
                           v-on:keyup.enter="btnSearch" v-model:value="Name" id="filterRuleName">
                </div>
                <a id="BtnSearch" href="javascript:void(0);" class="btn btn-default btn-primary" v-on:click="btnSearch">
                    <i class="fa fa-search"></i>查 询
                </a>
                <a id="btnReset" href="javascript:void(0);" class="btn btn-default" v-on:click="btnReset">
                    <i class="fa fa-repeat"></i>重 置
                </a>

                <div style="float: right;margin-right: 10px;">
                    <div style="text-align: left;">
                        <div id="re_ButtonGroup" class="table-toolbar" style="text-align: left;padding: 0"><div class="widget-buttons ">
                            <button title="新增" class="btn btn-primary" type="button" v-on:click="Add">
                                <i class="fa fa-plus"></i>新增</button></div>
                            <div class="widget-buttons ">
                                <button type="button" title="编辑" class="btn btn-default" v-on:click="Edit"><i class="fa fa-edit"></i>
                                    编辑
                                </button></div>
                            <div class="widget-buttons ">
                                <button type="button" title="版本查看" class="btn btn-default" v-on:click="VersionView">
                                    <i class="fa fa-eye"></i>
                                    查看规则版本
                                </button>
                            </div>
                            <div class="widget-buttons ">
                                <button type="button" title="删除" class="btn btn-default" v-on:click="Del"><i class="fa fa-times"></i>
                                    删除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="wide" style="margin-top:2px;margin-bottom:2px;">

            <div slot="TableContent" style="margin-top: 10px;">
                <div class="table-responsive" style="overflow-x: auto;margin-top: 10px;">
                    <table class="table table-striped table-hover table-bordered  max-width-table"
                           id="rule_set_table" style="table-layout:fixed !important">
                        <thead>
                        <tr role="row">
                            <th style="width: 50px;" class="text-center TaskStatus_col">
                                <label for="">序号</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:AppID,type:render,renderMethod:appNameRender,cssClass:text-left,hasTitle:true">
                                <label for="">关键应用</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:GroupName,cssClass:text-left,hasTitle:true,enum:{null= }">
                                <label for="">分组</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:Code,cssClass:text-left,hasTitle:true">
                                <label for="">规则集编号</label>
                            </th>
                            <th style="width: 120px; " class="text-center FullName_col"
                                data-field="field:Name,cssClass:text-left,hasTitle:true">
                                <label for="">规则集名称</label>
                            </th>
                            <th style="width: 80px; " class="text-center ModifyUserName_col"
                                data-field="field:LastModifier,cssClass:text-center,hasTitle:true,enum:{null= }">
                                <label for="">修改人</label>
                            </th>
                            <th style="width: 100px; " class="text-center ModifyDate_col"
                                data-field="field:LastModifierTime,cssClass:text-center,hasTitle:true,enum:{null= }">
                                <label for="">修改时间</label>
                            </th>
                            <th style="width: 80px; " class="text-center CreateUserName_col"
                                data-field="field:Creator,cssClass:text-center,hasTitle:true,enum:{null= }">
                                <label for="">创建人</label>
                            </th>
                            <th style="width: 100px; " class="text-center CreateDate_col"
                                data-field="field:CreateTime,cssClass:text-center,hasTitle:true,enum:{null= }">
                                <label for="">创建时间</label>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutSingleList>
        <div class="modal fade in" tabindex="-1" role="dialog" id="DataSourceDiv" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">{{TitleName}}</h6>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="well widget-body">
                                    <div class="row">
                                        <div class="row col-lg-12 col-sm-12 col-xs-12" v-show="this.PageType=='add'">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">关键应用</label>
                                                    <div class="col-sm-8">
                                                        <div class="input-group helper-group" id="ApplicationNamesHelpSubDiv">
                                                            <input type="hidden" name="ApplicationName" id="ApplicationNameSub" class="form-control"
                                                                   readonly="readonly" data-recive-helper-data="code" v-model="dsData.AppID">
                                                            <input type="text" name="ApplicationName_CN" id="ApplicationName_CNSub" class="form-control"
                                                                   readonly="readonly" data-recive-helper-data="name" placeholder="关键应用" style="height:32px;">
                                                            <span class="input-group-btn">
                                                                 <button  class="btn btn-default shiny" data-toggle="modal"
                                                                          data-helper="ApplicationNamesHelpForRe" type="button" data-validate="false">
                                                                     <i class=" fa fa-ellipsis-h"></i>
                                                                 </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div class="row col-lg-12 col-sm-12 col-xs-12" v-show="this.PageType=='edit'">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">关键应用</label>
                                                    <div class="col-sm-8">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control"
                                                                   readonly="readonly" v-model="dsData.AppName">

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12" style="margin-top: 10px" v-show="this.PageType=='add'">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">规则分组</label>
                                                    <div class="col-sm-8">
                                                        <div class="btn-group" id="ruleGroupSub">
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12" style="margin-top: 10px" v-show="this.PageType=='edit'">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">规则分组</label>
                                                    <div class="col-sm-8">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control"
                                                                   readonly="readonly" v-model="dsData.GroupName">

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12" style="margin-top: 10px">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">规则集编号</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" readonly
                                                               class="form-control" name="name" v-model="dsData.Code"/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12" style="margin-top: 10px">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <div class="form-group" style="line-height: 34px;">
                                                    <label class="col-sm-3 control-label ">名称</label>
                                                    <div class="col-sm-8">
                                                        <input type="text"
                                                               class="form-control" name="name" v-model="dsData.Name"/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div class="well widget-body text-right" name="ButtonGroup">
                                    <button type="button" class="btn btn-primary " name="btnSave1" v-on:click="Save" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>保存</button>
                                    <button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>取消</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    import {initHelper} from '../initHelper'
    import LayoutSingleList from "teld-vue-frame/vue/LayoutSingleList.vue"

    export default {
        data() {
            return {
                AppID:null,
                Name:null,
                GroupID:null,
                Code:null,
                ApplicationNames:[],
                dsData:{
                    AppID:null,
                    Name:null,
                    GroupID:null,
                    Code:null,
                    AppName:null
                },
                TitleName:"",
                PageType:"",
                PageTypeOptions:{
                    "add":"新增规则集",
                    "edit":"修改规则集"
                },
                clickLock:false
            };
        },
        watch:{
            'PageType':function(to,from){
                this.TitleName = this.PageTypeOptions[this.PageType];
            }
        },
        components: {
            'LayoutSingleList': LayoutSingleList
        },
        mounted(){
            initHelper()
            var that = this
            //获取帮助所有信息
            var paramData = {
                filter: JSON.stringify({"FieldName":"","FieldValue":"","FilterKey":"","page":1,"rows":500})
            }

            var url = FrameSGHost + "WebRunPlatform-GetApplicationNames"
            window.getDataSync(url, "post",
                paramData,
                result => {
                    this.ApplicationNames = result.rows
                })

            $(function (){


                $("#ruleGroup").select({
                    id: "ruleGroupSel",//下拉框id
                    blankLabel: "规则分类",//缺省表示名称
                    hasBlankOption: true,
                    dataSource: function(){
                        return [];
                    }

                }).data("bs.select");
                $("#ruleGroupSub").select({
                    id: "ruleGroupSubSel",//下拉框id
                    blankLabel: "规则分类",//缺省表示名称
                    hasBlankOption: true,
                    dataSource: function(){
                        return [];
                    }

                }).data("bs.select");


                //条件帮助
                $("#ApplicationNamesHelpDiv2").helper17({
                    multi: false,
                    showPagination: true,
                    confirmCallback: function (tr, btn, rowData) {

                        that.AppID = $("#ApplicationName").val();

                        $("#ruleGroup").getSelectIns().reloadData([])
                        $("#ruleGroup").getSelectIns().setSelectedVal({Code:null});

                        $("#ruleGroup").removeData("bs.select")

                        //初始化下拉框
                        $("#ruleGroup").select({
                            id: "ruleGroupSel",//下拉框id
                            blankLabel: "规则分类",//缺省表示名称
                            hasBlankOption: false,
                            dataSource: function(){

                                var postData = {
                                    "filter": JSON.stringify({"AppID": that.AppID})
                                };
                                var groupData = []
                                getDataSync(FrameSGHost + "TTP-RE_GetGroupList-V0101","POST",postData,function(retData){
                                    if(retData){
                                        groupData = retData.data.rows;
                                    }
                                });

                                var data = [];
                                for(var index in groupData){
                                    var item = groupData[index]
                                    data.push({
                                        Code:item.ID,
                                        Name:item.Name
                                    })
                                }

                                return data;
                            },
                            onSelect:function (thizz) {

                                if(thizz.dataSource.length==0){
                                    that.GroupID=""
                                    thizz.reset();
                                }else{
                                    that.GroupID = thizz.selectedCode
                                    document.getElementById("filterRuleName").focus();
                                }

                            }

                        }).data("bs.select");
                    }
                });

                //新增或编辑帮助
                $("#ApplicationNamesHelpSubDiv").helper17({
                    multi: false,
                    showPagination: true,
                    confirmCallback: function (tr, btn, rowData) {
                        that.dsData.AppID = $("#ApplicationNameSub").val();

                        //查询数据库的记录数
                        var Count = 0

                        let postData = {
                            "filter": JSON.stringify({
                                "AppID": that.dsData.AppID,
                                "GroupID":"",
                                "Name":""
                            })
                        };
                        var url = FrameSGHost + "TTP-RE_GetRuleSetList-V0101"
                        var oldVersionList = []
                        window.getDataSync(url, "post",
                            postData,
                            result => {
                                oldVersionList = result.data.rows
                            })

                        //获取最大序号
                        var Count = 0
                        for(var i=0;i<oldVersionList.length;i++){
                            var oldVersion = oldVersionList[i]
                            var verMask = parseInt(oldVersion.Code.replace(oldVersion.AppID,""))
                            if(verMask > Count){
                                Count = verMask
                            }
                        }

                        var a = ("0000000"+(Count+1))
                        var b = a.substring(a.length-6,a.length)

                        that.dsData.Code = that.dsData.AppID + b

                        $("#ruleGroupSub").getSelectIns().reloadData([])
                        $("#ruleGroupSub").getSelectIns().setSelectedVal({Code:null});

                        $("#ruleGroupSub").removeData("bs.select")
                        //初始化下拉框
                        $("#ruleGroupSub").select({
                            id: "ruleGroupSubSel",//下拉框id
                            blankLabel: "规则分类",//缺省表示名称
                            hasBlankOption: false,
                            dataSource: function(){

                                var postData = {
                                    "filter": JSON.stringify({"AppID": that.dsData.AppID })
                                };
                                var groupData = []
                                getDataSync(FrameSGHost + "TTP-RE_GetGroupList-V0101","POST",postData,function(retData){
                                    if(retData){
                                        groupData = retData.data.rows;
                                    }
                                });

                                var data = [];
                                for(var index in groupData){
                                    var item = groupData[index]
                                    data.push({
                                        Code:item.ID,
                                        Name:item.Name
                                    })
                                }
                                return data;
                            },
                            onSelect:function (thizz) {

                                if(thizz.dataSource.length==0){
                                    that.GroupID=""
                                    thizz.reset();
                                }else{
                                    that.dsData.GroupID = thizz.selectedCode

                                }
                            }

                        }).data("bs.select");
                    },
                });

            })
            this.$_loadData()

            $("#DataSourceDiv").on('hide.bs.modal',e=>{
                this.dsData = {
                    AppID:null,
                    Name:null,
                    GroupID:null,
                    Code:null,
                }
                $("#ApplicationNameSub").val("")
                $("#ApplicationName_CNSub").val("")
                $("#ruleGroupSub").getSelectIns().reloadData([])
                $("#ruleGroupSub").getSelectIns().reset();
            })
        },
        methods: {
            $_loadData(){
                var that = this
                //表格初始化
                var postData = {
                    "filter": {
                        "AppID": this.AppID,
                        "GroupID":this.GroupID,
                        "Name":this.Name
                    }
                };

                $("#rule_set_table").datagrid17({
                    showPagination: true,
                    url: FrameSGHost+"TTP-RE_GetRuleSetList-V0101",
                    tableType: "single",
                    resizeCol: true,
                    countPerPage:20,
                    hiddenInps: [
                        {inpNm: "hidId", inpValue: "ID"}
                    ],
                    vm:that,
                    success: function (rData) {

                    }
                }).data('bs.datagrid17').searchByFilter({searchCond: postData});
            },
            $_getAppNameFromCache(AppID){

                for(var index in this.ApplicationNames){
                    var item = this.ApplicationNames[index]
                    if(item.ApplicationName == AppID){
                        return item.ApplicationName_CN;
                    }
                }
            },
            appNameRender(rowData){
                var AppID = rowData.AppID
                return this.$_getAppNameFromCache(AppID)
            },
            btnSearch(){
                var postData = {
                    "filter": {
                        "AppID": this.AppID,
                        "GroupID":this.GroupID,
                        "Name":this.Name
                    }
                };
                $("#rule_set_table").data('bs.datagrid17').searchByFilter({searchCond: postData});
            },
            btnReset(){
                $("#ruleGroup").getSelectIns().reset();
                this.AppID = null;
                this.GroupID = null;
                this.Name = null;
                $("#ApplicationName").val("")
                $("#ApplicationName_CN").val("关键应用")
                $("#ruleGroup").getSelectIns().reloadData([])
                $("#ruleGroup").getSelectIns().reset();
                this.btnSearch();
            },
            Add(){
//                if(!this.curNodeData || this.curNodeData.node.level!=3){
//                    return NotifyError("请先选择一个模块");
//                }
var that = this
                //this.$router.push({path:"/RuleEngine/WholeDefine"})
                this.PageType = "add"



                $("#DataSourceDiv").modal("show")
            },
            Edit(){
                this.PageType="edit";
                var datas = $("#rule_set_table").data('bs.datagrid17').getSelectedRowData();

                if (datas) {

                    //this.$router.push({path:"/RuleEngine/WholeDefine", query: {rsId: datas.ID}})



                    this.dsData = {
                        ID:datas.ID,
                        AppID:datas.AppID,
                        Name:datas.Name,
                        GroupID:datas.GroupID,
                        Code:datas.Code,
                        AppName:this.$_getAppNameFromCache(datas.AppID),
                        GroupName:datas.GroupName,

                    }

                    $("#DataSourceDiv").modal("show")
                } else {
                    return NotifyWarning("请选择一条要编辑的记录！");
                }
            },
            Del(){
                var that = this
                var datas = $("#rule_set_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    bootbox.setDefaults("locale", "zh_CN");
                    bootbox.confirm("确定删除该规则集么？", function (ok) {
                        if (ok) {
                            that._removeRuleSet(datas)

                        }
                    });
                } else {
                    return NotifyWarning("请选择一条要编辑的记录！");
                }
            },
            _removeRuleSet(datas){
                var ruleSetId = datas.ID

                let dataUrl = FrameSGHost + "TTP-RE_DeleteRuleSetById-V0101"
                window.getDataAsync(dataUrl, "post",
                    {ruleSetId:ruleSetId}, result => {
                        if(result && result.state=="1"){
                            NotifySuccess("删除规则集成功！");
                            this.btnSearch()
                        } else{
                            NotifyError("删除规则集失败！");
                        }
                    });
            },
            Save(){

                if(this.clickLock == true){
                    return
                }

                this.clickLock = true;

                if(this.dsData.Name==""){
                    this.clickLock = false;
                    return NotifyWarning("请输入规则集名称");
                }
                if(!this.dsData.GroupID || this.dsData.GroupID==""){
                    this.clickLock = false;
                    return NotifyWarning("请选择规则分组");
                }


                var postData = {rrs:JSON.stringify(this.dsData)};

                let dataUrl = FrameSGHost + (this.PageType=="add"?"TTP-RE_AddRuleSet-V0101":"TTP-RE_UpdateRuleSet-V0101")
                window.getDataAsync(dataUrl, "post",
                    postData, result => {
                        if(result && result.state=="1"){
                            NotifySuccess("操作成功！");
                            $("#DataSourceDiv").modal("hide")
                            this.btnSearch();

                        } else{
                            NotifyError("操作失败！");
                        }
                        this.clickLock = false
                    });
            },
            VersionView(){

                var datas = $("#rule_set_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    window.sessionStorage.setItem("current_ruleset_id",datas.ID)
                    this.$router.push({path:"/RuleEngine/historyVersion", query: {rsCode: datas.Code}})
                } else {
                    return NotifyWarning("请选择一条记录！");
                }
            }

        }
    };
</script>
