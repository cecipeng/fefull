<template>
	<div class="ui-modal" v-show="show" :class="[modal.customClass]" :style="{'z-index': zindex}">
		<div class="modal-dialog" :class="modal.size" :style="{top: modal.top,'height': modal.totalHeight}">

			<a class="close-modal" v-if="modal.showCloseBtn" @click="closeModal()"></a>

			<!--头部-->
			<div class="modal-header" v-if="modal.showHeader">
				<slot name="header">
					<p class="title">{{modal.title}}</p>
				</slot>
				
			</div>
			<!--/头部-->

			<!--内容区域-->
			<div class="modal-body" :style="{'max-height': modal.bodyHeight}">
				<slot name="body">
					<p class="notice">{{modal.text}}</p>
				</slot>
			</div>
			<!--/内容区域-->

			<!--尾部,操作按钮-->
			<div class="modal-footer" v-if="modal.showFooter">
				<slot name="footer">
					<a v-if="modal.showCancelButton" href="javascript:void(0)" class="ui-btn" :class="modal.cancelButtonClass" @click="closeModal()">{{modal.cancelButtonText}}</a>
					<a v-if="modal.showConfirmButton" href="javascript:void(0)" class="ui-btn" :class="modal.confirmButtonClass" @click="submit()">{{modal.confirmButtonText}}</a>
				</slot>
			</div>
			<!--/尾部,操作按钮-->
        </div>
	</div>
	
</template>

<script>
export default {
	data: function(){
		return {
			show: false,    //是否显示弹窗
			zindex: 102 //弹窗层级，初始值为102
		}
	},
	props: [ "modalOpt" ],
	computed: {
		modal(){
			const _modal = this.modalOpt;
			return {
				title: _modal.title || "提示", //弹窗标题文字
				text: _modal.text || "提示文字", //纯文本

				showCloseBtn: typeof _modal.showCloseBtn === 'undefined' ? true : _modal.showCloseBtn, //是否显示关闭按钮，默认：true
				showHeader: typeof _modal.showHeader === 'undefined' ? true : _modal.showHeader, //是否显示头部，默认：true
				showFooter: typeof _modal.showFooter === 'undefined' ? true : _modal.showFooter, //是否显示底部，默认：true

                showCancelButton: typeof _modal.showCancelButton === 'undefined' ? true : _modal.showCancelButton, //是否显示取消按钮，默认：true
                cancelButtonClass: _modal.cancelButtonClass ? _modal.cancelButtonClass : 'ui-btn-default', //取消按钮样式
                cancelButtonText: _modal.cancelButtonText ? _modal.cancelButtonText : '取消', //取消按钮文字
                showConfirmButton: typeof _modal.showConfirmButton === 'undefined' ? true : _modal.showConfirmButton, //是否显示提交按钮，默认：true
                confirmButtonClass: _modal.confirmButtonClass ? _modal.confirmButtonClass : 'ui-btn-main', //提交按钮样式
                confirmButtonText: _modal.confirmButtonText ? _modal.confirmButtonText : '确定', //提交按钮文字

				size: "modal-dialog-" + (_modal.size ? _modal.size : "small"), //弹窗大小,支持：small/large/full
				top: _modal.top ? _modal.top : "15%", //CSS 中的 top 值（仅在 size 不为 full 时有效）
				// showMask: ((typeof _modal.showMask === 'undefined') || (_modal.showMask === true)) ? "" : "nomask", //是否显示遮罩层，默认：显示(为空)
				bodyHeight: _modal.bodyHeight ? _modal.bodyHeight : "auto", //内容区域固定高度，超过出现滚动条。设置为null表示不固定高度，默认：不固定高度
				totalHeight: _modal.totalHeight ? _modal.totalHeight : "auto", //弹窗总高度。设置为null表示不固定高度，默认：不固定高度
				customClass: _modal.customClass ? _modal.customClass : "" //弹窗自定义类名，用于控制特殊样式，默认：无
			};
		}
	},
	methods: {
		closeModal(){
			this.show = false;

			//设置弹窗遮罩可见，层级+1
			this.$store.commit('setModalMask',-1);

			//设置弹窗层级：状态管理中+2
			this.$store.commit('setModalZindex',-2);
		},
		showModal() {
			this.show = true;

			//设置弹窗层级：状态管理中+2
			this.$store.commit('setModalZindex',2);
			this.zindex = this.$store.state.modalZindex;

			//设置弹窗遮罩可见，层级+1
			this.$store.commit('setModalMask',1);
		},
		submit(){
			this.closeModal();

			this.$emit('modalSubmit');
		}
	}
}	
</script>
