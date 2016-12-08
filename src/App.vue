<template>
  <div id="app">
    <p>
        <router-link :to="{name:'hello',params:{id:123,num:8}}">hello</router-link><!--方法一：命名路由-->
        <router-link to="/hello/123/8">hello2</router-link><!--方法二-->
        <router-link to="/hello/067/4/sub">helloSUB</router-link><!--含子路由-->
        <router-link to="/home/pxx">home</router-link>

        <router-link to="/">defalut</router-link><!--渲染多个视图-->
        <router-link to="/a">a</router-link><!--渲染多个视图-->
    </p>
    
        <router-view class="aabb"></router-view><!--未设置name，默认为default-->  
       <router-view name="a"></router-view>      
       <router-view name="b"></router-view>   

  </div>
</template>

<script>

export default {
    components:{
      
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
