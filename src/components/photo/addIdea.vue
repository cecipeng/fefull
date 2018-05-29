<template>
    <div class="layout-mod mod-photo">
      <div class="ui-modhead">
        <div class="layout-wrapper">
          <div class="ui-modhead__fl">
            <div class="ui-modhead__title">摄影</div>
            <div class="ui-crumb">
              <span class="ui-crumb__position">添加灵感</span>
            </div>
          </div>
          <div class="ui-modhead__fr">
          </div>
          <div class="ui-modhead__intro"></div>  
        </div>  
      </div>
      <div class="layout-wrapper">
        <div class="photo-container photo-addlayout">
          <ul class="photo-smalllist">
            <li><img src="" alt=""></li>
            <li class="on"><img src="" alt=""></li>
            <li class="done"><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
          </ul>
          <div class="photo-addlayout__sider">
            <div class="photo-add__img">
              <img src="" alt="">
            </div>
          </div>
          <div class="photo-addlayout__content">
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">标题：</label>
              <div class="form-con">
                <input type="text" class="form-input">
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">设置为封面：</label>
              <div class="form-con">
                <div class="form-switch" data-status="off">
                  <span class="form-switch-off">否</span>
                  <span class="form-switch-on">是</span>
                </div>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">亮点：</label>
              <div class="form-con">
                <textarea type="text" class="form-textarea"></textarea>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">标签：</label>
              <div class="form-con">
                <div class="photo-add__tag">
                  <ul class="photo-add__tag-choose">
                    <li>人像<a class="tag-delete"></a></li>
                    <li>人像<a class="tag-delete"></a></li>
                    <li>人像<a class="tag-delete"></a></li>
                  </ul>
                  <div class="photo-add__tag-wrap">
                    <div class="tagitem">
                      <span class="label">构图：</span>
                      <div class="taglist">
                        <span class="tag">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag">构图1</span>
                        <span class="tag">构图1</span>
                        <span class="tag">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag done">构图1</span>
                      </div>
                    </div>
                    <div class="tagitem">
                      <span class="label">构图：</span>
                      <div class="taglist">
                        <span class="tag">构图1</span>
                        <span class="tag done">构图1</span>
                        <span class="tag">构图1</span>
                        <span class="tag">构图1</span>
                        <span class="tag">构图1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="photo-add__dec-line"></div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">器材：</label>
              <div class="form-con">
                <p class="form-value">NIKON</p>
                <input type="text" class="form-input">
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">光圈：</label>
              <div class="form-con photo-add__para">
                <comDropdown trigger="hover" placement="bottom" maxHeight="180px" reltextName="光圈"></comDropdown>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">快门速度：</label>
              <div class="form-con photo-add__para">
                <comDropdown trigger="hover" placement="bottom" maxHeight="180px" reltextName="快门速度"></comDropdown>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}">
              <label class="form-label">ISO：</label>
              <div class="form-con photo-add__para">
                <comDropdown trigger="hover" placement="bottom" maxHeight="180px" reltextName="ISO"></comDropdown>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="ui-formrow" :class="{'form-error':false}" style="margin-bottom: 100px">
              <label class="form-label">焦距：</label>
              <div class="form-con photo-add__para">
                <comDropdown trigger="hover" placement="bottom" maxHeight="180px" reltextName="焦距"></comDropdown>
              </div>
              <p class="form-tip"></p>
            </div>
            <div class="form-btnwrap">
                <a class="ui-btn ui-btn-main">保存</a>
                <a class="ui-btn ui-btn-sub">放弃上传</a>
            </div>
          </div>
        </div>
      </div>

      
    </div>
</template>

<script>

import comDropdown from './../common/dropdown'
import comDropdownItem from './../common/dropdown-item'


export default {
  data () {
    return {
      msg: 'Welcome to home'
    }
  },
  components: { comDropdown,comDropdownItem },
}
</script>
