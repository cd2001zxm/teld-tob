<template>
    <div class="row" id="rule_group_listPage">
        <LayoutSingleList>
            <div slot="TableListSearch" class="table-toolbar text-left clearfix" style="padding-top:0px; padding-bottom:0px;">

                <div class="btn-group" >
                    <div style="text-align: left;">
                        <div name="ButtonGroup" class="table-toolbar" style="text-align: left;padding: 0">
                            <div class="widget-buttons ">
                                <button type="button" title="返回" class="btn btn-default btn-primary" v-on:click="goBack"><i class="fa fa-reply"></i>
                                    返回
                                </button>
                            </div>
                            <div class="widget-buttons ">
                                <button title="新增版本" class="btn" type="button" v-on:click="Add"><i class="fa fa-plus"></i>新增版本</button>
                            </div>
                            <div class="widget-buttons ">
                                <button title="复制新增版本" class="btn" type="button" v-on:click="CopyAdd"><i class="fa fa-plus"></i>复制新增版本</button>
                            </div>
                            <div class="widget-buttons ">
                                <button type="button" title="修改版本" class="btn btn-default" v-on:click="Edit"><i class="fa fa-edit"></i>
                                    修改版本
                                </button></div>
                            <div class="widget-buttons ">
                                <button type="button" title="启用" class="btn btn-default" v-on:click="enableVersion" id="enableBtn">
                                    <i class="fa fa-eye"></i>
                                    启用版本
                                </button>
                            </div>
                            <div class="widget-buttons ">
                                <button type="button" title="禁用" class="btn btn-default" v-on:click="disableVersion" id="disableBtn">
                                    <i class="fa fa-eye"></i>
                                    禁用版本
                                </button>
                            </div>
                            <!--<div class="widget-buttons ">-->
                            <!--<button type="button" title="删除" class="btn btn-default" v-on:click="Del"><i class="fa fa-times"></i>-->
                            <!--删除-->
                            <!--</button>-->
                            <!--</div>-->

                        </div>

                    </div>

                </div>
                <div class="widget-buttons " style="float: right;">
                    <div>
                        <label>
                            <input type="checkbox" id="IsShowHistory" name="IsShowHistory" data-validate="false" class="colored-primary"
                                   v-on:click="showOldVersion">
                            <span class="text"></span>显示全部版本
                        </label>
                    </div>
                </div>
            </div>

            <hr class="wide" style="margin-top:2px;margin-bottom:2px;">

            <div slot="TableContent" style="margin-top: 10px;">
                <div class="table-responsive" style="overflow-x: auto;margin-top: 10px;">
                    <table class="table table-striped table-hover table-bordered  max-width-table"
                           id="rule_set_version_table" style="table-layout:fixed !important">
                        <thead>
                        <tr role="row">
                            <th style="width: 50px;" class="text-center TaskStatus_col">
                                <label for="">序号</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:RSCode,cssClass:text-left,hasTitle:true">
                                <label for="">规则编号</label>
                            </th>
                            <th style="width: 120px; " class="text-center FullName_col"
                                data-field="field:Name,cssClass:text-left,hasTitle:true">
                                <label for="">规则名称</label>
                            </th>
                            <!--<th style="width: 100px; " class="text-center FullName_col"-->
                            <!--data-field="field:AppID,type:render,renderMethod:appNameRender,cssClass:text-left,hasTitle:true">-->
                            <!--<label for="">生效时间</label>-->
                            <!--</th>-->
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:StartTime,cssClass:text-left,hasTitle:true,enum:{null= }">
                                <label for="">生效时间</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:EndTime,cssClass:text-left,hasTitle:true,type:render,renderMethod:EndTimeRender">
                                <label for="">失效时间</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:Origin,cssClass:text-center,hasTitle:true,enum:{0=人工录入&1=系统发布}">
                                <label for="">来源</label>
                            </th>
                            <th style="width: 100px; " class="text-center FullName_col"
                                data-field="field:DelFlag,cssClass:text-center,hasTitle:true,enum:{0=启用&1=禁用&2=过期}">
                                <label for="">状态</label>
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

    </div>


</template>

<script>
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

            };
        },
        components: {
            'LayoutSingleList': LayoutSingleList
        },
        mounted(){
            var that = this

            this.$_loadData()

        },
        methods: {
            $_loadData(){
                this.rsCode = this.$route.query.rsCode
                if(this.rsCode == "" || !this.rsCode){
                    return;
                }
                var that = this
                //表格初始化
                var isshow = $("#IsShowHistory").prop("checked")
                //表格初始化
                var postData = {
                    "filter": {
                        "RSCode": this.rsCode,
                        "isShowOld":isshow?"on":"off"
                    }
                };

                $("#rule_set_version_table").datagrid17({
                    showPagination: true,
                    url: FrameSGHost+"TTP-RE_GetRuleSetVersionList-V0101",
                    tableType: "single",
                    resizeCol: true,
                    hiddenInps: [
                        {inpNm: "hidId", inpValue: "ID"}
                    ],
                    vm:that,
                    success: function (rData) {

                    }
                }).data('bs.datagrid17').searchByFilter({searchCond: postData});

                $("#rule_set_version_table").on("SELECT_ROW_CHANGE",function (thizz) {
                    var data = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData()

                    if(data.DelFlag == 2){
                        $("#enableBtn").attr("disabled","true")
                        $("#disableBtn").attr("disabled","true")
                    }
                    if(data.DelFlag == 0){
                        $("#enableBtn").attr("disabled","true")
                        $("#disableBtn").removeAttr("disabled")
                    }
                    if(data.DelFlag == 1){
                        $("#enableBtn").removeAttr("disabled")
                        $("#disableBtn").prop("disabled","true")
                    }
                })

            },
//            $_getAppNameFromCache(AppID){
//
//                for(var index in this.ApplicationNames){
//                    var item = this.ApplicationNames[index]
//                    if(item.ApplicationName == AppID){
//                        return item.ApplicationName_CN;
//                    }
//                }
//            },
            EndTimeRender(rowData){
                var EndTime = rowData.EndTime
                return /9999*/.test(EndTime)==true?"":EndTime
            },

            Add(){
                this.$router.push({path:"/RuleEngine/WholeDefine", query: {rsCode: this.rsCode}})
            },
            CopyAdd(){
                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();

                if (datas) {

                    this.$router.push({path:"/RuleEngine/WholeDefine", query: {cpRsId: datas.ID,rsCode: this.rsCode}})
                } else {
                    return NotifyWarning("请选择一条要复制的记录！");
                }
            },
            Edit(){
                this.PageType="edit";
                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();

                if (datas) {
                    this.$router.push({path:"/RuleEngine/WholeDefine", query: {rsId: datas.ID}})
                } else {
                    return NotifyWarning("请选择一条要编辑的记录！");
                }
            },
            Del(){
                var that = this
                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    bootbox.setDefaults("locale", "zh_CN");
                    bootbox.confirm("确定删除该规则集么么？", function (ok) {
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
                if(this.dsData.Name=="")return NotifyWarning("请输入规则集名称");;

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
                    });
            },
            VersionView(){

                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    ///RuleEngine/historyVersion
                    this.$router.push({path:"/RuleEngine/historyVersion", query: {rsCode: datas.Code}})
                } else {
                    return NotifyWarning("请选择一条记录！");
                }
            },
            goBack(){
                this.$router.go(-1)
            },
            enableVersion(){
                var that = this;
                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    var postData = {id:JSON.stringify(datas.ID)};
                    let dataUrl = FrameSGHost + "TTP-RE_EnableRuleSetVersion-V0101"
                    window.getDataAsync(dataUrl, "post",
                        postData, result => {
                            if(result && result.state=="1"){
                                NotifySuccess("操作成功！");

                                that.$_loadData();
                            } else{
                                NotifyError("操作失败！");
                            }
                        });
                } else {
                    return NotifyWarning("请选择一条记录！");
                }


            },
            disableVersion(){
                var that = this
                var datas = $("#rule_set_version_table").data('bs.datagrid17').getSelectedRowData();
                if (datas) {
                    var postData = {id:JSON.stringify(datas.ID)};
                    let dataUrl = FrameSGHost + "TTP-RE_DisableRuleSetVersion-V0101"
                    window.getDataAsync(dataUrl, "post",
                        postData, result => {
                            if(result && result.state=="1"){
                                NotifySuccess("操作成功！");
                                that.$_loadData();
                            } else{
                                NotifyError("操作失败！");
                            }

                        });
                } else {
                    return NotifyWarning("请选择一条记录！");
                }

            },
            showOldVersion(){
                var isshow = $("#IsShowHistory").prop("checked")
                //表格初始化
                var postData = {
                    "filter": {
                        "RSCode": this.rsCode,
                        "isShowOld":isshow?"on":"off"
                    }
                };
                $("#rule_set_version_table").data('bs.datagrid17').searchByFilter({searchCond: postData});
            }

        }
    };
</script>
