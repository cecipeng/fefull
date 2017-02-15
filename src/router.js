import Vue from 'vue'
import VueRouter from 'vue-router' //router

import store from './store.js'

import Home from './components/home'
import Article from './components/article'
import ArticleDetail from './components/articleDetail'
import Search from './components/searchResult'
import Usercenter from './components/usercenter'
import MyartCreate from './components/myartCreate'
import MyartList from './components/myartList'
import Login from './components/login'

Vue.use(VueRouter);

//公用方法
import UTIL from './util.js'

const routes = [
    {   path: '/home',name:'home',component: Home},
    {   path: '/article',name:'article',component: Article},
    {   path: '/articleDetail/:articleId',name:'articleDetail',component: ArticleDetail},
    {   path: '/search/:keyword/:type',name:'search',component: Search},
    {   path: '/login',name:'login',component: Login},
    {   path: '/usercenter',name:'usercenter',component: Usercenter,
        children: [
            {
                path: '/usercenter/myartCreate',name:'myartCreate',component: MyartCreate,
            },
            {
                path: '/usercenter/myartList',name:'myartList',component: MyartList,
            }
        ],
        beforeEnter: (to, from, next) => {
            if(isLogin()) {
                next();
            }
            else {
                router.push({ path: '/login' });
            }
        },
    },
    { path: '/',name:'default',redirect:'/article'} //设置默认页
  ];

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
    routes
});

//每次页面跳转前获取用户信息，用于渲染页面
router.beforeEach((to, from, next) => {
    store.commit('getLoginInfor');
    next();
})

function isLogin(){
    //去后台校验token
    const localStorage = window.localStorage;
    if(localStorage.userId) {
        console.log("router：登录成功");
        return true;
    }
    else {
        console.log("router：登录失败");
        return false;
    }
}

// router.beforeEach((transition) => {
//     console.log("d");
//                 transition.next();
// });

module.exports = router;