<template>
    <div class="photo-detail-layout">
      
      <div class="photo-detail-layout__img">
        <a class="photo-detail__img-prev"></a>
        <a class="photo-detail__img-next"></a>
        <div class="photo-detail__img">
          <img src="" alt="">
        </div>
        <div class="photo-detail__preview">
          <a class="photo-detail__preview-prev"></a>
          <a class="photo-detail__preview-next"></a>
          <div class="photo-detail__preview-list">
            <ul class="list">
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="photo-detail-layout__infor">
        <div class="photo-detail__infor">
          <p class="title">是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了</p>
          <p class="subtext">拍摄时间：2018-01-01</p>
          <p class="subtext">上传时间：2018-01-01</p>
          <p class="subtext">分类：人像</p>
          <p class="subtext">灵感：</p>
          <div class="introduction">是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了是加夫里什减肥了</div>
        </div>
        <ul class="photo-detail__taglist">
          <li>sd</li>
          <li>sdsdf</li>
          <li>ssd</li>
          <li>ssdfd</li>
          <li>ssdd</li>
        </ul>
        <div class="photo-detail__infor">
          <div class="photo-detail__para">
            <div class="para-titlewrap">
              <p class="para-title">sfsefwefweflwejflwefwlejfgwlegjwlkgjwlkrgjw</p>
            </div>
            <span class="para-con para-gq">f／4</span>
            <span class="para-con para-km">1/500s</span>
            <span class="para-con para-iso">200</span>
            <span class="para-con para-jj">50mm</span>
          </div>

        </div>
      </div>
      <a class="photo-detail-layout__closebtn" @click="closeDetail()"></a>
    </div>
</template>

<script>

import da from './../../data_user.js' 

export default {
  data () {
    return {
      msg: 'Welcome to home',
      datas: da
    }
  },
  components: {
  
  },
  methods: {
    closeDetail(){
      const s = false;
      this.$store.state.showPop = false;
      this.$emit('closeDetailPop',s);
    }
  }
}
</script>
