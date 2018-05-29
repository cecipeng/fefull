<template>
    <div class="layout-mod mod-photo">
      <div class="ui-modhead">
        <div class="layout-wrapper">
          <div class="ui-modhead__fl">
            <div class="ui-modhead__title">摄影</div>
            <div class="ui-crumb">
              <a class="ui-crumb__link">人像</a>
              <em class="ui-crumb__seperate">></em>
              <a class="ui-crumb__link">人像</a>
              <em class="ui-crumb__seperate">></em>
              <span class="ui-crumb__position">人像</span>
            </div>
          </div>
          <div class="ui-modhead__fr">
            <a @click="$router.push({ path: '/addIdea' })" class="ui-btn ui-btn-main">添加图片</a>
          </div>
          <div class="ui-modhead__intro"></div>  
        </div>  
      </div>
      <div class="layout-wrapper">
        <div class="photo-container">
          <div class="ui-list photo-waterfall">
            <waterfall :min-line-gap="200" :line-gap="300" :max-line-gap="400" :watch="datas">
              <waterfall-slot
                v-for="(item, index) in datas"
                :width="item.width"
                :height="item.height"
                :order="index"
                :key="item.id"
              >
                <div class="photo-waterfall__item" @click="showDatail()">
                  <div class="photo-waterfall__infor">
                    <div class="photo-waterfall__inforitem"><span class="title">创建时间：</span><span class="infor">2018-01-01</span></div>
                    <div class="photo-waterfall__inforitem"><span class="title">创建时间：</span><span class="infor">2018-01-01</span></div>
                    <div class="ui-card__ctrl">
                      <a class="ui-card__ctrl-mainlink"></a>
                      <ul class="ui-card__ctrl-list">
                        <li>
                          <i class="icon icon-edit"></i> 
                          <span class="text">编辑</span>
                        </li>
                        <li>
                          <i class="icon icon-delete"></i> 
                          <span class="text">删除</span>
                        </li>
                        <li>
                          <i class="icon icon-moveto"></i> 
                          <span class="text">移动到</span>
                        </li>
                        <li>
                          <i class="icon icon-copyto"></i> 
                          <span class="text">复制到</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="photo-waterfall__img">
                    <img src="" alt="">
                  </div>
                  
                </div>
              </waterfall-slot>
            </waterfall>
            
          </div>      
        </div>
      </div>
      <IdeaDetail v-if="showDetail" v-on:closeDetailPop="closeDetail"/>
    </div>
</template>

<script>

import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import da from './../../data_user.js' 

import IdeaDetail from './ideaDetail'

export default {
  data () {
    return {
      msg: 'Welcome to home',
      datas: da,
      showDetail: false
    }
  },
  components: {
    Waterfall,
    WaterfallSlot,
    IdeaDetail
  },
  methods: {
    showDatail() {
      this.$store.state.showPop = true;
      this.showDetail = true;
    },
    closeDetail(s){
      this.showDetail = false;
    }
  }
}
</script>
