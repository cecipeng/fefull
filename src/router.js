import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home'
import Article from './components/article'
import ArticleDetail from './components/articleDetail'
import Search from './components/searchResult'
import Usercenter from './components/usercenter'
import MyartCreate from './components/myartCreate'
import MyartList from './components/myartList'

Vue.use(VueRouter);

const routes = [
    {   path: '/home',name:'home',component: Home},
    {   path: '/article',name:'article',component: Article},
    {   path: '/articleDetail/:articleId',name:'articleDetail',component: ArticleDetail},
    {   path: '/search/:keyword/:type',name:'search',component: Search},
    {   path: '/usercenter',name:'usercenter',component: Usercenter,
            beforeEnter: (to, from, next) => {
                if(needLogin()) {
                    next();
                }
                
            },
            children: [
                {
                    path: '/myartCreate',name:'myartCreate',component: MyartCreate,
                },
                {
                    path: '/myartList',name:'myartList',component: MyartList,
                }
            ]
    },
    { path: '/',name:'default',redirect:'/article'} //设置默认页
  ];

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
    routes
});



function needLogin(){
    const localStorage = window.localStorage;
    if(localStorage.ui) {
        console.log("登录成功");
        return true;
    }
    else {
        console.log("登录失败");
        return false;
    }
}

// router.beforeEach((transition) => {
//     console.log("d");
//                 transition.next();
// });

module.exports = router;