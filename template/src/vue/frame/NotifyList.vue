<template>
    <div class="notify-list">
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :modal="false"
                   :direction="direction" size="22%" style="top: 50px;height: calc(100% - 50px);"
                   :before-close="handleClose" id="wrpNotifyDrawer">

                <div class="notify-container">
                    <div class="notify-block-header" v-show="isCpUser && featureData.length > 0">
                        <span style="line-height: 35px">新产品特性</span>
                        <a title="查看全部" class="clearBtn" @click="clearAllFeature">清除全部</a>
                    </div>
                    <div v-show="isCpUser&& featureData.length > 0" class="notify-list-content">
                        <template v-for="item in featureData">
                            <div class="notify-message">
                                <div class="message-svg" v-on:click="watchFeature(item.Code,item.ID)">
                                    <img v-bind:src="newIcon" width="40px" height="40px"/>
                                </div>
                                <div class="message-content" v-on:click="watchFeature(item.Code,item.ID)">
                                    <span style="font-weight: bold;font-size: 14px">{{item.TFSWorkItemTypeName +" "+item.Code+": "}}</span>
                                    <span>{{item.Name}}</span>
                                    <br><br>
                                    <span>{{item.FinishTime.split(" ")[0]}}</span>
                                </div>

                                <div title="删除" class="notify-message-closeBtn el-icon-close" v-on:click="deleteFeature(item.ID)"></div>
                            </div>
                        </template>
                    </div>
                    <!--<div v-show="isCpUser && featureData.length > 0" style="text-align: right;margin-bottom: 10px;">-->
                        <!--<a title="查看全部" class="watchAll" @click="watchMoreFeature">全部></a>-->
                    <!--</div>-->

                    <!--新功能-->
                    <div class="notify-block-header" v-show="false">
                        <span style="line-height: 35px">新功能发布</span>
                    </div>
                    <div class="notify-list-content" v-show="false">

                    </div>

                    <!--错误信息-->
                    <div v-show="isCpUser && errorData.length>0" class="notify-block-header">
                        <span style="line-height: 35px">错误信息</span>
                        <a title="查看全部" class="clearBtn" @click="clearAllErrorData">清除全部</a>
                    </div>
                    <div class="notify-list-content" v-show="isCpUser && errorData.length>0">

                        <template v-for="item in errorData">
                            <div class="notify-message">
                                <div class="message-svg">
                                    <img v-bind:src="errorIcon" width="40px" height="40px"/>
                                </div>
                                <div class="message-content">
                                    <span style="font-weight: bold;font-size: 14px">{{item.ErrorCode}}</span><br>
                                    <span style="word-break: break-all;" v-html="item.ErrorInfo"></span>
                                    <br><br>
                                    <span>{{item.Date}}</span>
                                </div>

                                <div title="删除" class="notify-message-closeBtn el-icon-close" v-on:click="deleteError(item.ID)"></div>
                            </div>
                        </template>
                    </div>
                    <div class="notify-list-content" v-show="featureData.length==0 && errorData.length==0">
                        <div class="notify-no-message">
                            <span>没有新通知</span>
                        </div>
                    </div>
                </div>


                <!--固定工具栏-->
                <div style="position: absolute;bottom: 0;background: #f3f3f3;width: 100%">
                    <div class="fix-tools-bar" @click="watchMoreFeature">
                        <img v-bind:src="oldIcon" style="width: 20px;height: 20px;display: block;margin-top: 10px;margin-left: 5px;"/>
                        <span style="font-size: 12px;margin-left: 5px;margin-top: 18px;display: block;">全部产品特性</span>
                    </div>
                </div>

        </el-drawer>
    </div>
</template>
<script>
    import newIcon from './new.png'
    import errorIcon from './error.png'

    export default{
        data(){
           return {
               direction: 'rtl',
               newIcon:newIcon,
               errorIcon:errorIcon
           }
        },
        props:{
            drawer:{
                type: Boolean,
                required: true
            },
            isCpUser:{
                type: Boolean,
                required: true
            },
            featureData:{
                type: Array,
                required: true
            },
            errorData:{
                type: Array,
                required: true
            },
            currentWrpFeatureTimeKey:{
                type: String,
                required: true
            }
        },
        methods:{
            clearAllErrorData:function () {
                this.$emit("clearAllErrorData")
            },
            clearAllFeature:function () {
                this.$emit("clearAllFeature")
            },
            watchMoreFeature:function () {
                this.$emit("watchMoreFeature")
            },
            watchFeature:function (code,id) {
                this.$emit("watchFeature",code,id)
            },
            handleClose:function () {
                this.$emit("notifyClose");
            },
            deleteFeature:function (id) {
                this.$emit("deleteFeature",id);
            },
            deleteError:function (id) {
                this.$emit("deleteError",id);
            }

        }
    }
</script>
<style>

    *:focus { outline: none }

    .notify-container{
        overflow-y: auto;
        background: #f3f3f3!important;
        height: calc(100% - 85px);
    }
    .notify-container::-webkit-scrollbar {/*滚动条整体样式*/
        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;

    }
    .notify-container::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #C0C0C0;
    }
    .notify-container::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: #FFFFFF;
    }

    .el-drawer__body{
        /*overflow-y: auto!important;*/
        background: #f3f3f3!important;
        height:calc(100% - 0px);
    }
    .el-drawer {
        display: block!important;
        background: #f3f3f3!important;
    }
</style>
<style scoped>

    .fix-tools-bar{
        width: 90px;
        height: 70px;
        float: left;
        background: rgb(222, 222, 222);
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
    }
    .fix-tools-bar:hover{
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #00a7cb;
    }
    .notify-no-message {
        vertical-align: middle;
        text-align: center;
        /*position: relative;*/
        /*min-height: calc(33% - 51px);*/
    }
    .notify-no-message span {
        /*line-height:calc(33% - 51px);*/
        /*position: absolute;*/
        line-height: 430px;
    }

    .notify-list-content {
        margin:5px 10px;
        min-height: calc(33% - 62px);
    }
    .watchAll{
        margin-right: 10px;
        cursor: pointer;
        color: #00a7cb!important;
        text-decoration: none!important;
    }
    .clearBtn{
        float: right;
        margin-right: 10px;
        cursor: pointer;
        line-height: 35px;
        color: #00a7cb!important;
        font-weight: normal!important;
        text-decoration: none!important;
    }
    .message-svg{
        width: 40px;height: 40px;display: inline-block;vertical-align: top;
    }
    .message-content{
        padding: 2px 10px;
        display: inline-block;
        width: calc(100% - 60px);
    }
    .notify-message-closeBtn {
        position: absolute;
        top: 8px;
        right: 5px;
        cursor: pointer;
        color: #909399;
        font-size: 16px;
    }

    .notify-message{
        background: white;padding: 10px;position: relative;margin-bottom: 10px;
    }
    .notify-message:hover{box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);cursor: pointer}
    .notify-block-header{height: 45px;color: #00a7cb;font-weight:bold;border-bottom: 1px solid #f3f3f3;padding: 5px 10px;background: white;}
    .notify-block-header > span {color: #00a7cb;font-weight:bold;}
    div.notify-block-header:before {
        display: block;
        content: "";
        position: relative;
        left: -10px;
        bottom: 0;
        right: 0;
        height: 3px;
        max-height: 3px;
        overflow: hidden;
        background-color: #2dc3e8;
        top: 38px;
        width: 100px;
    }
</style>
