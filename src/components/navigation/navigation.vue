<template>
    <div class="layout-mod mod-navigation">

    	<div class="navigation-box">
            <div class="layout-wrapper">
                <div class="ui-maintitle maintitle-mynav">
                    <h4 class="maintitle">我的导航</h4>      
                    <div class="frbox">
                        <a href="###" class="btn-editor" @click="$refs.showModal1.showModal()"></a>    
                    </div>  
                </div>
                <div v-if="memberList === false">未登录</div>
                <div v-if="(memberList !== false && memberList.length==0)">为空</div>
                <div class="navigation-box" v-for="item in memberList" v-if="(memberList !== false && memberList.length>0)">
                    <div class="ui-maintitle maintitle-online">
                        <h4 class="maintitle" :data-id="item.categoryId">{{item.categoryName}}</h4>     
                    </div>
                    <comListNavigation :list="item.navigators"></comListNavigation>
                </div>
            </div>
        </div>

        <div class="layout-wrapper">
            <div class="navigation-box" v-for="item in sysList">
                <div class="ui-maintitle maintitle-online">
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
         
        }'> 
        </comModal> 
    </div>
</template>

<script>

import comListNavigation from './../common/list-navigation'
import comModal from './../common/modal'
import store from './../../store.js'

//公用方法
import UTIL from './../../util.js'
            
export default {

    data () {
        return {
            sysList: "", //公共导航列表
            memberList: "", //用户导航列表
        }
    },
    components: { comListNavigation,comModal },
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
            url = "navigator/member";
            sort = 1;
        }
        else { //未登录接口
            url = "navigator/system";
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
                        }
                        else if(sort===1) {//已登录数据
                            vm.sysList = RE.datas.system;
                            vm.memberList = RE.datas.member;
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

    }
}
</script>

<style lang="scss">
.ui-maintitle {
    margin-bottom: 30px;
}

</style>
