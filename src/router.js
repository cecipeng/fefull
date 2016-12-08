import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from './components/hello'
import Hellosub from './components/hellosub'
import Home from './components/home'
import A from './components/a'
import B from './components/b'

Vue.use(VueRouter);

const routes = [
    { path: '/hello/:id/:num',name:'hello', component: Hello,
    	children: [
    		{ path: 'sub', component: Hellosub}
    	]
	},
    { 
    	path: '/home/:username', 
    	component: Home
    	 
    },
    { //渲染多个视图
    	path: '/', 
    	components: {
    		default: B,
    		a: A,
    		b: B
    	} 
    },
    { //渲染多个视图 
    	path: '/a', 
    	components: {
    		default: A,
    		a: B,
    		b: A
    	} 
    }

  ];

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
    routes
});

module.exports = router;