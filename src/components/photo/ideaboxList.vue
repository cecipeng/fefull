<template>
    <div class="layout-mod mod-photo">
      <div class="ui-modhead">
        <div class="layout-wrapper">
          <div class="ui-modhead__fl">
            <div class="ui-modhead__title">摄影</div>
            <div class="ui-crumb">
              <span class="ui-crumb__position">灵感集</span>
            </div>
          </div>
          <div class="ui-modhead__fr">
            <a class="ui-btn ui-btn-main" @click="$refs.showAddboxModal.showModal()">添加灵感集</a>
          </div>
          <div class="ui-modhead__intro"></div>  
        </div>  
      </div>
      <div class="layout-wrapper">
        <div class="photo-sider">
          <ul class="photo-sider__menu">
            <li class="on">灵感集</li>
            <li>我的摄影集</li>
          </ul>
        </div>
        <div class="photo-content">
          <div class="ui-list photo-card">
            <ul class="ui-card ui-card--four ui-card--bg">
              <li>
                <div class="ui-card__wrapper">
                  <a class="ui-card__item">
                    <div class="ui-card__bg" style="background-image:url(src/assets/pics/demo-article-cover.png)">
                    </div>
                    <p class="ui-card__title-center">人像</p>
                    <div class="ui-card__footer">
                      <div class="fl">
                        <p class="ui-card__infor"><span class="photo-card__create">2018-01-01 14:00:33</span>创建</p>
                        <p class="ui-card__infor"><span class="photo-card__number">33</span>张照片</p>
                      </div>
                    </div>
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
                      </ul>
                    </div>
                  </a>
                  <!-- <div class="ui-card__mask">
                    <ul class="ui-card__maskctrl">
                      <li>
                        <i class="ui-card__ctrlicon ui-card__icon--edit"></i>
                        <p class="ui-card__ctrltext">编辑</p>
                      </li>
                      <li>
                        <i class="ui-card__ctrlicon ui-card__icon--delete"></i>
                        <p class="ui-card__ctrltext">删除</p>
                      </li>
                    </ul>
                  </div> -->
                </div>
              </li>
            </ul>
          </div>      
        </div>
      </div>

      <comModal :modalOpt='{
        confirmButtonText: "新增",
        size: "large",
        title: "添加灵感集"
      }' ref="showAddboxModal">
        <div slot="body" class="formwrap">
          <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">名称：</label>
              <div class="form-con">
                  <input type="text" class="form-input" >
              </div>
              <p class="form-tip"></p>
          </div>
        </div>
      </comModal>
    </div>
</template>

<script>
import comModal from './../common/modal'

export default {
  data () {
    return {
      msg: 'Welcome to home'
    }
  },
  components: { comModal }
}
</script>
