<template>
    <div class="layout-mod mod-navigation">

    	<div class="navigation-box">
            <div class="layout-wrapper">
                <div class="ui-maintitle maintitle-mynav" data-style='style1'>
                    <h4 class="maintitle">我的导航</h4>      
                    <div class="frbox">
                        <p class="viewwrap">
                            <a href="###" class="btn-view btn-view-detail" :class="{'on':viewIndex=='detail'}" @click="viewIndex = 'detail'" title="详细"></a>  
                            <a href="###" class="btn-view btn-view-list" :class="{'on':viewIndex=='list'}" @click="viewIndex = 'list'" title="缩略"></a>
                            <a href="###" class="btn-view btn-view-slider" :class="{'on':viewIndex=='slider'}" @click="viewIndex = 'slider'" title="收起"></a>
                        </p>
                        <a href="###" class="ui-btn ui-btn-default btn-editor" data-size="size-s" @click="$refs.showModal1.showModal()"><i class="edit"></i>编辑</a>  
                    </div>  
                </div>
                <comError :text="showError.text" :type="showError.type" v-if="showError.show" size="smallCol"></comError>
                <div class="navigation-box" :class="[viewIndex ? viewIndex : 'navigation-mod-list']" v-for="item in memberList" v-else>
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
            <div class="navigation-box" :class="[viewIndex ? viewIndex : 'navigation-mod-list']" v-for="item in sysList">
                <div class="ui-maintitle" data-style='style2'>
                    <h4 class="maintitle" :data-id="item.categoryId">{{item.categoryName}}</h4>     
                </div>
                <comListNavigation :list="item.navigators"></comListNavigation>
            </div>
        </div>

        <!--弹窗：编辑导航-->
        <comModal ref="showModal1" v-on:modalSubmit='http_batchUpdateNavigation' :modalOpt='{
            showHeader: false,
            size: "large",
            top: "5%",
            confirmButtonText: "保存",
            bodyHeight: "700px"
        }'>
            <div slot="body" class="navigation-modal-edit">
                <!--我的导航-->
                <div class="navigation-mynav">
                    <p class="edit-maintitle">我的导航</p>
                    <comError :text="showError.text" :type="showError.type" v-if="showError.show" size="smallCol"></comError>
                    <draggable v-model="memberList" class="mynav-sortwrap" v-else :options="{group:'category',handle:'.btn-move-category'}">
                        <div class="mynav-sort" v-for="(item,index) in memberList">
                            <div class="ui-formrow mynav-sort-title">
                                <label class="form-label">分类：</label>
                                <div class="form-con">
                                    <input type="text" class="form-input" v-model="item.categoryName">
                                    <a href="###" class="btn-category-ctrl btn-move-category"></a>
                                    <a href="###" class="btn-category-ctrl btn-del-category" @click="http_delCategory(item)"></a>
                                </div>
                            </div>
                            <draggable element="ul" class="mynav-sort-list" v-model="memberList[index].navigators" :options="{group:'navigator',handle:'.btn-move-navigator'}" @start="dragging=true" @end="dragging=false" @change="log">
                                <li v-for="list in memberList[index].navigators" :key="list.navigatorId" >
                                    <p class="item-edit">
                                        <a href="###" class="btn-edit" v-if="list.isSystem!=1" @click="openModal2(true,list,memberList[index].categoryId,memberList[index].categoryName)"></a>
                                        <a href="###" class="btn-del" @click="http_delNavigator(list.navigatorId)"></a>
                                        <a href="###" class="btn-move-navigator"></a>
                                    </p>
                                    <p class="item-title" :data-id="list.navigatorId">{{list.navigatorName}}</p>
                                </li>
                            </draggable>
                        </div>
                    </draggable>
                    
                    <a class="btn-add-navigation ui-btn ui-btn-default" @click="openModal2(false)">添加导航</a>    
                </div>  
                <!--／我的导航-->     

                <!--公共导航-->
                <div class="navigation-sysnav">
                    <p class="edit-maintitle">热门导航推荐<span class="subtitle">（点击添加到我的导航）</span></p>
                    <div class="sysnav-sort" v-for="item in sysList">
                        <p class="sysnav-sort-text" :data-id="item.categoryId">{{item.categoryName}}：</p>
                        <ul class="sysnav-sort-list">
                            <li v-for="list in item.navigators" :class="{isFav: list.isFavor == 1}">
                                <div class="item-edit">
                                    <comDropdown trigger="click" width="150px" top="30px" placement="top-end" @itemClickParent="itemClickCall">
                                        <a slot="rel" class="btn-add btn-ctrl"></a>
                                        <ul slot="list" class="droplist">
                                            <comDropdownItem v-for="(item, index) in memberList" class="dropitem" @click.native="http_addSystem(list,item.categoryId)" :val="item.categoryId">{{item.categoryName}}</comDropdownItem>
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
                                <p class="item-title" :data-id="list.navigatorId">{{list.navigatorName}}</p>
                            </li>
                        </ul>
                    </div>
                </div>  
                <!--／公共导航-->              
            </div>
        </comModal>   
        <!--/弹窗：编辑导航-->

        <!--弹窗：新建导航-->
        <comModal ref="showModal2" v-on:modalSubmit='http_addNavigation' :modalOpt='{
            confirmButtonText: editNavigation ? "修改" : "保存",
            title: editNavigation ? "编辑导航" : "新建导航",
            customClass: "modal-addNav"
        }'> 
            <div slot="body" class="formwrap">
                <div class="ui-formrow">
                    <label class="form-label">分类</label>
                    <div class="form-con" style="width: 70%">
                        <comDropdown trigger="hover" placement="bottom" :disabled="editNavigation ? true : false" @itemClickParent="itemClickCall">
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
        <!--／弹窗：新建导航-->
    </div>
</template>

<script>

import draggable from 'vuedraggable'
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
                navigatorId: "",
                navigatorName: "",
                navigatorUrl: "",
                description: ""
            },
            orgEditElement: { //绑定当前编辑的导航内容：原始值
                categoryId: 0, //所属分类
                categoryName: "",
                navigatorId: "",
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
            memberList: [
            // {
            //     "categoryId": 3, 
            //     "categoryName": "竞技游戏", 
            //     "navigators": [
            //         {
            //             "navigatorId": 1, 
            //             "navigatorName": "魔兽", 
            //             "navigatorUrl": "www.moshou.com", 
            //             "description": "魔兽简介", 
            //             "isFavor": 1,
            //             "isSystem": 1
            //         },
            //         {
            //             "navigatorId": 1, 
            //             "navigatorName": "魔兽1", 
            //             "navigatorUrl": "www.moshou.com", 
            //             "description": "魔兽简介", 
            //             "isFavor": 1,
            //             "isSystem": 1
            //         }
            //     ]
            // },
            // {
            //     "categoryId": 3, 
            //     "categoryName": "竞技游戏2", 
            //     "navigators": [
            //         {
            //             "navigatorId": 1, 
            //             "navigatorName": "魔兽2", 
            //             "navigatorUrl": "www.moshou.com", 
            //             "description": "魔兽简介", 
            //             "isFavor": 1,
            //             "isSystem": 1
            //         },
            //         {
            //             "navigatorId": 1, 
            //             "navigatorName": "魔兽22", 
            //             "navigatorUrl": "www.moshou.com", 
            //             "description": "魔兽简介", 
            //             "isFavor": 1,
            //             "isSystem": 1
            //         }
            //     ]
            // }
        ], //用户导航列表
            showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
            viewIndex: 'detail', //列表显示类型，'detail':详情，'list'，'slider'
            addcategory: true, //新建分类，点击变为false，开始编辑
            dragging: false, //拖拽标记
            addcategoryText: "", //新建分类名称
            editNavigation: false, //修改导航or新建导航。false：新建，true：修改 
        }
    },
    components: { comListNavigation,comModal,comError,comDropdown,comDropdownItem,draggable },
    created: function(){
        this.http()
    },
    computed: {
        
    },
    // beforeRouteEnter (to, from, next) {
        // let url = "";
        // let sort = ""; //请求接口不同，标记返回的数据类型：0:未登录下，1:已登录下
        // //获取登录状态
        // store.commit('getLoginInfor');

        // //已登录的请求地址和未登录的请求地址
        // if(store.state.loginUser.isLogining) { //已登录接口
        //     url = UTIL.AJAX_URL().navMember;
        //     sort = 1;
        // }
        // else { //未登录接口
        //     url = UTIL.AJAX_URL().navSystem;
        //     sort = 0;
        // }

        // //获取导航列表
        // UTIL.AJAX_POST(
        //     url,
        //     "",
        //     function(RE,r,s){
        //         if(RE.meta.code == "0000") { //请求成功
        //             next(vm => {
                        
        //                 if(sort===0) {//未登录数据
        //                     vm.sysList = RE.datas;
        //                     vm.memberList = false;
        //                     vm.showError.show = true;//提示未登录
        //                     vm.showError.type = "weberror";
        //                     vm.showError.text = "未登录，无法查看个人收藏导航，请先登录～";

        //                 }
        //                 else if(sort===1) {//已登录数据
        //                     vm.sysList = RE.datas.system;
                            
        //                     if(RE.datas.member.length==0) { //内容为空时，显示无内容缺省图
        //                         vm.showError.show = true;
        //                         vm.showError.type = "empty";
        //                     }
        //                     else {
        //                         vm.showError.show = false;
        //                         vm.memberList = RE.datas.member;
        //                     }
        //                 }
        //             });
        //         }
        //         else { 
        //             next(false);
        //             console.log("FEFull：获取公共列表失败，"+RE.meta.message);
        //         }
        //     }
        // );
    // },
    methods: {
        http(){
            const _this = this;
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
                        
                            if(sort===0) {//未登录数据
                                _this.sysList = RE.datas;
                                _this.memberList = false;
                                _this.showError.show = true;//提示未登录
                                _this.showError.type = "weberror";
                                _this.showError.text = "未登录，无法查看个人收藏导航，请先登录～";

                            }
                            else if(sort===1) {//已登录数据
                                _this.sysList = RE.datas.system;
                                console.log(RE.datas.member);
                                if(RE.datas.member.length==0) { //内容为空时，显示无内容缺省图
                                    _this.showError.show = true;
                                    _this.showError.type = "empty";
                                }
                                else {
                                    _this.showError.show = false;
                                    _this.memberList = RE.datas.member;
                                    
                                }
                            }
                    }
                    else { 
                        
                        console.log("FEFull：获取公共列表失败，"+RE.meta.message);
                    }
                }
            );
        },
        //列表显示方式切换
        changeView: function(idx){
            this.viewIndex = idx;
        },
        //下拉菜单回调事件
        itemClickCall(val){
            this.memberList.forEach((x)=>{
                if(x.categoryId == val) {
                    this.curEditElement.categoryId = x.categoryId;
                    this.curEditElement.categoryName = x.categoryName;
                    return;
                }
            })
        },
        //拖动结束
        log(evt) {
            console.log('拖动前的索引 :' + evt.oldIndex)
            console.log('拖动后的索引 :' + evt.newIndex)
        },
        //新建分类
        http_addcategory(){
            this.addcategory = true;
            var _this = this;
            
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().addMemberCategories,
                {
                    categoryName: this.addcategoryText
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                       _this.memberList = RE.datas;
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                        console.log("FEFull：新建导航分类失败，"+RE.meta.message);
                    }
                    //新增完成后清空input，并隐藏
                    this.addcategoryText = "";
                }
            )  
        },
        //新建or修改导航
        http_addNavigation(){
            const _this = this;
            var _param = {};
            console.log(this.curEditElement.categoryId);
            _param.categoryId = this.curEditElement.categoryId;
            _param.navigatorId = this.curEditElement.navigatorId;
            _param.navigatorName = this.curEditElement.navigatorName;
            _param.navigatorUrl = this.curEditElement.navigatorUrl;
            _param.description = this.curEditElement.description;
console.log(_param.categoryId);
            if(this.editNavigation) { //修改导航
                UTIL.AJAX_POST(
                    UTIL.AJAX_URL().updateNav,
                    _param,
                    function(RE,r,s){
                        if(RE.meta.code == "0000") { //请求成功
                            // _this.memberList = RE.datas;
                            _this.memberList.forEach(function(x1){
                                x1.navigators.forEach(function(x2){
                                    if(x2.navigatorId == RE.datas.navigatorId) {
                                        x2.navigatorName = RE.datas.navigatorName;
                                        x2.navigatorUrl = RE.datas.navigatorUrl;
                                        x2.description = RE.datas.description;
                                        return;
                                    }
                                });
                            });
                            
                        }
                        else if(RE.meta.code == "1003") { //服务端错误
                            s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                            console.log("FEFull：修改导航失败，"+RE.meta.message);
                        }
                        
                    }
                )  
            }
            else { //新增导航
                UTIL.AJAX_POST(
                    UTIL.AJAX_URL().saveNav,
                    _param,
                    function(RE,r,s){
                        if(RE.meta.code == "0000") { //请求成功
                        
                            if(_this.memberList.length == 0) {
                                _this.memberList[0] = {
                                    "categoryId": RE.datas.categoryId, 
                                    "categoryName": RE.datas.categoryName, 
                                    "navigators": [
                                        {
                                            "navigatorId": RE.datas.navigatorId, 
                                            "navigatorName": RE.datas.navigatorName, 
                                            "navigatorUrl": RE.datas.navigatorUrl, 
                                            "description": RE.datas.description, 
                                            "isFavor": 1,
                                            "isSystem": 0
                                        }
                                    ]
                                }
                            }
                            else {
                                _this.memberList.forEach(function(x1){
                                    if(x1.categoryId == RE.datas.categoryId) {
                                        x1.navigators.push({
                                            'navigatorId': RE.datas.navigatorId,
                                            'navigatorName': RE.datas.navigatorName,
                                            'navigatorUrl': RE.datas.navigatorUrl,
                                            'description': RE.datas.description
                                        });
                                    }
                                });
                            }
                        }
                        else if(RE.meta.code == "1003") { //服务端错误
                            s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                            console.log("FEFull：新建导航失败，"+RE.meta.message);
                        }
                    }
                )
            }
        },
        //批量修改导航（分类名称，导航排序，分类排序）
        http_batchUpdateNavigation(){
            const _this = this;
          
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().batchUpdate,
                {
                    dataList: this.memberList
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                    
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                        console.log("FEFull：批量修改导航失败，"+RE.meta.message);
                    }
                }
            )  
        },
        //删除导航
        http_delNavigator(id){
            var _this = this;
            console.log(id);
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().deleteNav,
                {
                    navigatorId: id
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.memberList.forEach(function(x1,index1){
                            x1.navigators.forEach(function(x2,index2){
                                if(x2.navigatorId == id) {
                                    _this.memberList[index1].navigators.splice(index2,1);
                                    if(x2.isSystem == 1) { //系统导航
                                        _this.sysList.forEach(function(x3,index3){
                                            x3.navigators.forEach(function(x4,index4){
                                                if(x4.navigatorId == id) {
                                                    _this.sysList[index3].navigators[index4].isFavor = 0;
                                                    return;
                                                }
                                            });
                                        });
                                    }
                                    return;
                                }
                            });
                        });
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                        console.log("FEFull：删除导航分类失败，"+RE.meta.message);
                    }
                }
            )  
        },
        //删除导航分类
        http_delCategory(item){
            var _this = this;
            console.log(item.navigators);
            if(item.navigators.length > 0) {
                this.$store.commit('setMessage',[true,"无法删除分类，请先删除分类下的导航","warn",false]);
            }
            else {
                UTIL.AJAX_POST(
                    UTIL.AJAX_URL().deleteNavCategory,
                    {
                        categoryId: item.categoryId
                    },
                    function(RE,r,s){
                        if(RE.meta.code == "0000") { //请求成功
                            _this.memberList.forEach(function(x1,index1){
                                if(x1.categoryId == item.categoryId) {
                                    _this.memberList.splice(index1,1);
                                    s.commit('setMessage',[true,"删除成功","success",false]);
                                    return;
                                }
                            });
                        }
                        else if(RE.meta.code == "1003") { //服务端错误
                            s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                            console.log("FEFull：删除导航分类失败，"+RE.meta.message);
                        }
                    }
                )  
            }
        },
        //添加系统导航
        http_addSystem(navigator,categoryId){
            var _this = this;
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().collectSystemNav,
                {
                    navigatorId: navigator.navigatorId,
                    categoryId: categoryId,
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.sysList.forEach(function(x1,index1){
                            x1.navigators.forEach(function(x2,index2){
                                if(x2.navigatorId == navigator.navigatorId) {
                                    _this.sysList[index1].navigators[index2].isFavor = 1;
                                    return;
                                }
                            });
                        });
                        _this.memberList.forEach(function(x1,index1){
                            if(x1.categoryId == categoryId){
                                _this.memberList[index1].navigators.push(navigator);
                                return;
                            }
                        })
                        s.commit('setMessage',[true,"成功添加系统导航","success",false]);
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                        console.log("FEFull：添加系统导航失败，"+RE.meta.message);
                    }
                }
            )  
        },
        //点击展开添加弹窗
        openModal2(editoradd,item,categoryId,categoryName){
            this.editNavigation = editoradd;
            this.initEditElement(item,categoryId,categoryName);
            this.$refs.showModal2.showModal();
        },
        //初始化新增导航弹窗
        initEditElement(item,categoryId,categoryName){
            this.orgEditElement.categoryId = categoryId ? categoryId : "";
            this.orgEditElement.categoryName = categoryName ? categoryName : "--选择分类--";
            this.orgEditElement.navigatorId = item ? item.navigatorId : "";
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
