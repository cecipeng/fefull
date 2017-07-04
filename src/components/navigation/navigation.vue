<template>
    <div class="layout-mod mod-navigation">

    	<div class="navigation-box">
            <div class="layout-wrapper">
                <div class="ui-maintitle maintitle-mynav" data-style='style1'>
                    <h4 class="maintitle">我的导航</h4>      
                    <div class="frbox">
                        <p class="viewwrap">
                            <a href="###" class="btn-view btn-view-large" :class="{'on':viewIndex==0}" @click="viewIndex = 0" title="详细"></a>  
                            <a href="###" class="btn-view btn-view-small" :class="{'on':viewIndex==1}" @click="viewIndex = 1" title="缩略"></a>
                        </p>
                        <a href="###" class="ui-btn ui-btn-default btn-editor" data-size="size-s" @click="$refs.showModal1.showModal()"><i class="edit"></i>编辑</a>  
                    </div>  
                </div>
                <comError :text="showError.text" :type="showError.type" v-if="showError.show" size="smallCol"></comError>
                <div class="navigation-box" :class="[viewIndex == 1 ? 'listsmall' : '']" v-for="item in memberList" v-else>
                    <div class="ui-maintitle" data-style='style2'>
                        <h4 class="maintitle" :data-id="item.categoryId">{{item.categoryName}}</h4>     
                    </div>
                    <comListNavigation :list="item.navigators"></comListNavigation>
                </div>
            </div>
        </div>

        <div class="layout-wrapper navigation-box-sysnav">
            <div class="ui-maintitle maintitle-sysnav" data-style='style1'>
                <h4 class="maintitle">热门导航</h4>  
            </div>
            <div class="navigation-box" :class="[viewIndex == 1 ? 'listsmall' : '']" v-for="item in sysList">
                <div class="ui-maintitle" data-style='style2'>
                    <h4 class="maintitle" :data-id="item.categoryId">{{item.categoryName}}</h4>     
                </div>
                <comListNavigation :list="item.navigators"></comListNavigation>
            </div>
        </div>

        <!--弹窗：编辑导航-->
        <comModal ref="showModal1" :modalOpt='{
            showHeader: false,
            size: "large",
            top: "5%",
            confirmButtonText: "保存",
            bodyHeight: "600px"
            
        }'>
            <div slot="body" class="navigation-modal-edit">
                <!--我的导航-->
                <div class="navigation-mynav">
                    <p class="edit-maintitle">我的导航</p>
                    <div class="mynav-sort" v-for="item in memberList">
                        <div class="ui-formrow mynav-sort-title">
                            <label class="form-label">分类：</label>
                            <div class="form-con">
                                <input type="text" class="form-input" v-model="item.categoryName">
                            </div>
                        </div>
                        <ul class="mynav-sort-list">
                            <li v-for="list in item.navigators">
                                <p class="item-edit">
                                    <a href="###" class="btn-edit" @click="openModal2(list,item.categoryId,item.categoryName)"></a>
                                    <a href="###" class="btn-del"></a>
                                </p>
                                <p class="item-title" :data-id="list.navigatorId">{{list.navigatorName}}</p>
                            </li>
                        </ul>
                    </div>
                    <a class="btn-add-navigation ui-btn ui-btn-default" @click="openModal2()">添加导航</a>    
                </div>  
                <!--／我的导航-->     

                <!--公共导航-->
                <div class="navigation-sysnav">
                    <p class="edit-maintitle">热门导航推荐<span class="subtitle">（点击添加到我的导航）</span></p>
                    <div class="sysnav-sort" v-for="item in sysList">
                        <p class="sysnav-sort-text" :data-id="item.categoryId">{{item.categoryName}}：</p>
                        <ul class="sysnav-sort-list">
                            <li v-for="list in item.navigators">
                                <p class="item-edit">
                                    <a href="###" class="btn-add"></a>
                                </p>
                                <p class="item-title" :data-id="list.navigatorId">{{list.navigatorName}}</p>
                            </li>
                        </ul>
                    </div>
                </div>  
                <!--／公共导航-->              
            </div>
        </comModal>   
        <!--弹窗：编辑导航-->

        <comModal ref="showModal2" :modalOpt='{
            confirmButtonText: "保存",
            title: "编辑导航",
            customClass: "modal-addNav"
        }'> 
            <div slot="body" class="formwrap">
                <div class="ui-formrow">
                    <label class="form-label">分类</label>
                    <div class="form-con" style="width: 70%">
                        <comDropdown trigger="hover" placement="bottom" @itemClickParent="itemClickCall">
                            <a slot="rel" class="btn-rel btn-rel-category">
                                <span class="selector-btn" :data-id="curEditElement.categoryId">{{curEditElement.categoryName}}</span>
				                <i class="dropdown-arrow"></i>
                            </a>
                            <ul slot="list" class="droplist">
                                <comDropdownItem v-for="(item, index) in memberList" class="dropitem" :val="item.categoryId">{{item.categoryName}}</comDropdownItem>
                                <li class="addcategory">
                                    <a class="btn-addcategory" @click="addcategory=false" v-if="addcategory">新建分类...</a>
                                    <div class="add-editbox" v-if="!addcategory">
                                        <a class="btn-add-commit ui-btn ui-btn-main" data-size="size-s" @click="http_addcategory">创建</a>
                                        <p class="add-input"><input type="text" class="form-input" v-model="addcategoryText"></p>
                                    </div>
                                </li>
                            </ul>
                        </comDropdown>
                    </div>
                </div>
                <div class="ui-formrow" :class="{'form-error':formStatus.navigatorName.status===1}">
                    <label class="form-label">导航名称</label>
                    <div class="form-con">
                        <input type="text" class="form-input" v-model="curEditElement.navigatorName">
                    </div>
                    <p class="form-tip">{{formStatus.navigatorName.tiptxt}}</p>
                </div>
                <div class="ui-formrow" :class="{'form-error':formStatus.navigatorUrl.status===1}">
                    <label class="form-label">导航地址</label>
                    <div class="form-con">
                        <input type="text" class="form-input" v-model="curEditElement.navigatorUrl">
                    </div>
                    <p class="form-tip">{{formStatus.navigatorUrl.tiptxt}}</p>
                </div>
                <div class="ui-formrow" :class="{'form-error':formStatus.description.status===1}">
                    <label class="form-label">导航简介</label>
                    <div class="form-con">
                        <textarea type="text" class="form-input" v-model="curEditElement.description"></textarea>
                    </div>
                    <p class="form-tip">{{formStatus.description.tiptxt}}</p>
                </div>
            </div>
        </comModal> 
    </div>
</template>

<script>

import comListNavigation from './../common/list-navigation'
import comModal from './../common/modal'
import comError from './../common/error'
import comDropdown from './../common/dropdown'
import comDropdownItem from './../common/dropdown-item'
import store from './../../store.js'

//公用方法
import UTIL from './../../util.js'
            
export default {

    data () {
        return {
            // showDropdown: false, //添加导航弹窗中，显示分类下拉菜单
            curEditElement: { //绑定当前编辑的导航内容：更新值
                categoryId: 0, //所属分类
                categoryName: "",
                navigatorName: "",
                navigatorUrl: "",
                description: ""
            },
            orgEditElement: { //绑定当前编辑的导航内容：原始值
                categoryId: 0, //所属分类
                categoryName: "",
                navigatorName: "",
                navigatorUrl: "",
                description: ""
            },
            formStatus: {
                navigatorName: {
                    status: 0, //1:error; 2:correct
                    tiptxt: ""
                },
                navigatorUrl: {
                    status: 0,
                    tiptxt: ""
                },
                description: {
                    status: 0,
                    tiptxt: ""
                }
            },
            sysList: "", //公共导航列表
            memberList: "", //用户导航列表
            showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
            viewIndex: 1, //列表显示类型，0:大卡片，1:小卡片
            dropdown: {//编辑弹窗中，选择分类显示文字
                id: "",
                name: "选择分类" 
            },
            addcategory: true, //新建分类，点击变为false，开始编辑
            addcategoryText: "", //新建分类名称
        }
    },
    components: { comListNavigation,comModal,comError,comDropdown,comDropdownItem },
    created: function(){
        // this.http_comNavigation()
    },
    computed: {
        
    },
    beforeRouteEnter (to, from, next) {
        let url = "";
        let sort = ""; //请求接口不同，标记返回的数据类型：0:未登录下，1:已登录下
        //获取登录状态
        store.commit('getLoginInfor');

        //已登录的请求地址和未登录的请求地址
        if(store.state.loginUser.isLogining) { //已登录接口
            url = UTIL.AJAX_URL().navMember;
            sort = 1;
        }
        else { //未登录接口
            url = UTIL.AJAX_URL().navSystem;
            sort = 0;
        }

        //获取导航列表
        UTIL.AJAX_POST(
            url,
            "",
            function(RE,r,s){
                if(RE.meta.code == "0000") { //请求成功
                    next(vm => {
                        
                        
                        if(sort===0) {//未登录数据
                            vm.sysList = RE.datas;
                            vm.memberList = false;
                            vm.showError.show = true;//提示未登录
                            vm.showError.type = "weberror";
                            vm.showError.text = "未登录，无法查看个人收藏导航，请先登录～";

                        }
                        else if(sort===1) {//已登录数据
                            vm.sysList = RE.datas.system;
                            
                            if(RE.datas.member==0) { //内容为空时，显示无内容缺省图
                                vm.showError.show = true;
                                vm.showError.type = "empty";
                            }
                            else {
                                vm.showError.show = false;
                                vm.memberList = RE.datas.member;
                            }
                        }

                    });
                }
                else { 
                    next(false);
                    console.log("FEFull：获取公共列表失败，"+RE.meta.message);
                }
            }
        );
    },
    methods: {
        //列表显示方式切换
        changeView: function(idx){
            this.viewIndex = idx;
        },
        //下拉菜单回调事件
        itemClickCall(val){
            console.log(val);
            this.memberList.forEach((x)=>{
                if(x.categoryId == val) {
                    this.curEditElement.categoryId = x.categoryId;
                    this.curEditElement.categoryName = x.categoryName;
                    console.log(this.curEditElement.categoryName);
                    return;
                }
            })
            
        },
        //新建分类
        http_addcategory(){
            this.addcategory = true;
            //添加到数据库
            //重新获取数据
        },
        //点击展开添加弹窗
        openModal2(item,categoryId,categoryName){
            this.initEditElement(item,categoryId,categoryName);
            this.$refs.showModal2.showModal();
        },
        //
        initEditElement(item,categoryId,categoryName){
            this.orgEditElement.categoryId = categoryId ? categoryId : "";
            this.orgEditElement.categoryName = categoryName ? categoryName : "--选择分类--";
            this.orgEditElement.navigatorName = item ? item.navigatorName : "";
            this.orgEditElement.navigatorUrl = item ? item.navigatorUrl : "";
            this.orgEditElement.description = item ? item.description : "";

            for(var i in this.orgEditElement) {
                this.curEditElement[i] = this.orgEditElement[i];
            }
        }

    }
}
</script>

<style lang="scss">

.ui-maintitle[data-style="style2"] {
    margin-bottom: 10px;
}


</style>
