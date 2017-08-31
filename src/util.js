import Vue from 'vue';
import VueResource from 'vue-resource'; //ajax
import store from './store.js'
import router from './router.js'

Vue.use(VueResource);

//拦截器，请求异常时返回404页面
Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if(!response.ok) {
            router.push({ path: '/pageError' }); //跳转到登录页
        }
        else return response;
    });
});

//统一接口地址前缀
// const baseUrl = "http://121.40.121.128:8090/api/";
const baseUrl = "http://121.40.121.128:8090/api/";
// const baseUrl = "http://192.168.1.102:8899/fefull/api/";
// const baseUrl = "http://seazy.ngrok.cc/fefull/api/";
// const baseUrl = "http://192.168.1.104:8899/fefull/api/";
// const baseUrl = "http://192.168.1.104:8899/fefull/api/";
// const baseUrl = "http://seazy.ngrok.cc/fefull/api/";


export default {
    
    // 公用get请求
    AJAX_GET: function(url,_data,callback){
        Vue.http.get(
            baseUrl + url,
            _data,
            {
                // emulateJSON : true,
                // async: false,
                headers: {
                    // "Content-Type":"application/x-www-form-urlencoded", //post默认以request payload提交data，改为form data形式
                    "Authorization": localStorage.accessToken || "" //身份验证，与后端约定每次请求附上token值验明是否登录

                },
                // params: _data
            }
        )
        .then((response) => {
            switch(response.data.meta.code) {
                case "1001": //未登录
                    router.push({ path: '/login' }); //跳转到登录页
                    break;
                case "1002": //请求参数错误
                    const mess = {
                        show: true, //是否显示提示
                        content: "参数错误，请重试～", //内容
                        type: "error", //类型
                        showClosebtn: true //是否显示关闭按钮
                    }
                    store.commit('setMessage',mess);
                    console.log("FEFull："+response.data.meta.message);
                    break;
                default: //请求成果,或其他业务返回码
                    callback(response.data, router, store);
            }
        })
        .catch(function(response) {
            console.log("FEFull："+response.statusText);
        })
    },

    // 公用post请求
    AJAX_POST: function(url,data,callback,showLoading){
  
        Vue.http.post(
            baseUrl + url,
            data,
            {
                // emulateJSON : true,
                headers: {
                    // "Content-Type":"application/x-www-form-urlencoded", //post默认以request payload提交data，改为form data形式
                    "Authorization": localStorage.accessToken || "" //身份验证，与后端约定每次请求附上token值验明是否登录
                }
            }
        )
        .then((response) => {
            switch(response.data.meta.code) {
                case "1001": //未登录
                    router.push({ path: '/login' }); //跳转到登录页
                    break;
                case "1002": //请求参数错误
                    const mess = {
                        show: true, //是否显示提示
                        content: "参数错误，请重试～", //内容
                        type: "error", //类型
                        showClosebtn: true //是否显示关闭按钮
                    }
                    store.commit('setMessage',mess);
                    console.log("FEFull："+response.data.meta.message);
                    break;
                default: //请求成果,或其他业务返回码
                    callback(response.data, router, store);
            }
        })
        .catch(function(response) {
            console.log("FEFull："+response.statusText);
        })
    },

    //接口地址汇总
    AJAX_URL: function(){
        return {
            article : "article/queryPage", //文章列表
            articleDetail : "article/getArticleById", //文章详情
            saveOrUpdate : "article/saveOrUpdate", //创建文章
            articleCategories : "article/categories", //文章分类
            articleTags : "article/tags", //文章标签
            addFavor : "article/collection", //点击收藏文章
            removeFavor : "article/uncollection", //取消收藏文章
            myarticle : "article/getMyArticles", //我创建的文章
            myarticleDel : "article/delete", //删除我创建的文章
            favor : "article/queryCollectionPage", //我收藏的文章
            login : "login/verify", //登录验证
            navMember : "navigator/member", //导航列表（登录后）：获取系统和用户自定义导航
            navSystem : "navigator/system", //导航列表（登录前）：仅获取系统导航
            addMemberCategories : "navigator/saveNavCategory", //新增用户导航分类
            addMemberNavigator : "navigator/saveCategory", //新增用户导航
        }
    },

    //判断value是否属于validlist中的
    oneOf: function(value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    }
}