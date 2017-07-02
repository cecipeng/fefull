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
                    <p class="edit-maintitle">管理常用网址</p>
                    <div class="mynav-sort">
                        <div class="ui-formrow mynav-sort-title">
                            <label class="form-label">分类：</label>
                            <div class="form-con">
                                <input type="text" class="form-input">
                            </div>
                        </div>
                        <ul class="mynav-sort-list">
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-edit"></a>
                                    <a href="###" class="btn-del"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-edit"></a>
                                    <a href="###" class="btn-del"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                        </ul>
                    </div>
                    <div class="mynav-sort">
                        <div class="ui-formrow mynav-sort-title">
                            <label class="form-label">分类：</label>
                            <div class="form-con">
                                <input type="text" class="form-input">
                            </div>
                        </div>
                        <ul class="mynav-sort-list">
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-edit"></a>
                                    <a href="###" class="btn-del"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-edit"></a>
                                    <a href="###" class="btn-del"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                        </ul>
                    </div>
                    <a class="btn-add-navigation ui-btn ui-btn-default" @click="$refs.showModal2.showModal()">添加导航</a>    
                </div>  
                <!--／我的导航-->     

                <!--公共导航-->
                <div class="navigation-sysnav">
                    <p class="edit-maintitle">热门导航推荐</p>
                    <div class="sysnav-sort">
                        <p class="sysnav-sort-text">宠物：</p>
                        <ul class="sysnav-sort-list">
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-add"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-add"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                        </ul>
                    </div>
                    <div class="sysnav-sort">
                        <p class="sysnav-sort-text">宠物：</p>
                        <ul class="sysnav-sort-list">
                            <li>
                                <p class="item-edit">
                                    <a href="###" class="btn-add"></a>
                                </p>
                                <p class="item-title">sdf</p>
                            </li>
                            <li class="isFav">
                                <p class="item-edit">
                                    <a href="###" class="btn-add"></a>
                                </p>
                                <p class="item-title">sdf</p>
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
                    <div class="form-con">
                        <!--<comDropdown :reltext="curEditElement.category.categoryName" ref="handleClose">-->
                        <comDropdown reltext="11111" ref="handleClose">
                            <a slot="rel" class="btn-rel btn-rel-category">
                                <span class="selector-btn">ffsfsdf</span>
				                <i class="dropdown-arrow"></i>
                            </a>
                            <ul slot="list" class="droplist">
                                <li v-for="(item, index) in memberList"><a @click="$refs.handleClose.handleClose()" class="dropitem" :data-id="item.categoryId">{{item.categoryName}}</a></li>
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
import store from './../../store.js'

//公用方法
import UTIL from './../../util.js'
            
export default {

    data () {
        return {
            // showDropdown: false, //添加导航弹窗中，显示分类下拉菜单
            curEditElement: { //绑定当前编辑的导航内容：更新值
                category: {
                    categoryId: 0,
                    categoryName: ""
                }, //所属分类
                navigatorName: "",
                navigatorUrl: "",
                description: ""
            },
            orgEditElement: { //绑定当前编辑的导航内容：原始值
                category: {
                    categoryId: 0,
                    categoryName: ""
                }, //所属分类
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
            viewIndex: 1 //列表显示类型，0:大卡片，1:小卡片
        }
    },
    components: { comListNavigation,comModal,comError,comDropdown },
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
    }
}
</script>

<style lang="scss">

.ui-maintitle[data-style="style2"] {
    margin-bottom: 10px;
}


</style>
