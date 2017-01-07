import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home'
import Article from './components/article'
import ArticleDetail from './components/articleDetail'
import Search from './components/searchResult'

Vue.use(VueRouter);

const routes = [
    { path: '/home',name:'home',component: Home},
    { path: '/article',name:'article',component: Article},
    { path: '/articleDetail/:articleId',name:'articleDetail',component: ArticleDetail},
    { path: '/search/:keyword/:type',name:'search',component: Search},
    { path: '/',name:'default',redirect:'/article'} //设置默认页
  ];

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
    routes
});

module.exports = router;