<template>
	<div class="ui-modal" v-show="modal.showModal" :class="[modal.customClass, modal.showMask]">
		<div class="modal-dialog" :class="modal.size" :style="{top:modal.top}">

			<a class="close-modal" v-if="modal.showCloseBtn" @click="close()"></a>

			<!--头部-->
			<div class="modal-header" v-if="modal.showHeader">
				<slot name="header">
					<p class="title">{{modal.title}}</p>
				</slot>
				
			</div>
			<!--/头部-->

			<!--内容区域-->
			<div class="modal-body" :style="{height: modal.bodyHeight}">
				<slot name="body">
					<p class="notice">{{modal.text}}</p>
				</slot>
			</div>
			<!--/内容区域-->

			<!--尾部,操作按钮-->
			<div class="modal-footer" v-if="modal.showFooter">
				<slot name="footer">
					<a v-if="modal.showCancelButton" href="javascript:void(0)" class="ui-btn" :class="modal.cancelButtonClass" @click="close()">{{modal.cancelButtonText}}</a>
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
		}
	},
	props: [ "modalOpt" ],
	computed: {
		modal(){
			const _modal = this.modalOpt;
			return {
				title: _modal.title || "提示", //弹窗标题文字
				text: _modal.text || "提示文字", //纯文本

				showModal: _modal.showModal || false, //是否显示弹窗
				showCloseBtn: _modal.showCloseBtn || true, //是否显示关闭按钮
				showHeader: _modal.showHeader || true, //是否显示头部
				showFooter: _modal.showFooter || true, //是否显示底部

                showCancelButton: typeof _modal.showCancelButton === 'undefined' ? true : _modal.showCancelButton, //是否显示取消按钮
                cancelButtonClass: _modal.cancelButtonClass ? _modal.showCancelButton : 'ui-btn-default', //取消按钮样式
                cancelButtonText: _modal.cancelButtonText ? _modal.cancelButtonText : '取消', //取消按钮文字
                showConfirmButton: typeof _modal.showConfirmButton === 'undefined' ? true : _modal.cancelButtonClass, //是否显示提交按钮
                confirmButtonClass: _modal.confirmButtonClass ? _modal.confirmButtonClass : 'ui-btn-main', //提交按钮样式
                confirmButtonText: _modal.confirmButtonText ? _modal.confirmButtonText : '确定', //提交按钮文字

				size: "modal-dialog-" + (_modal.size ? _modal.size : "small"), //弹窗大小,支持：small/large/full
				top: _modal.top ? _modal.size : "15%", //CSS 中的 top 值（仅在 size 不为 full 时有效）
				showMask: (typeof _modal.showMask === undefined)||(_modal.showMask === true) ? "" : "noMask", //是否显示遮罩层，默认显示
				bodyHeight: _modal.bodyHeight ? _modal.bodyHeight : "auto", //内容区域固定高度，超过出现滚动条。设置为null表示不固定高度
				customClass: _modal.customClass ? _modal.customClass : "" //弹窗自定义类名，用于控制特殊样式
			};
		}
	},
	methods: {
		close(){
			console.log("d");
			this.modal.showModal = false;
		}
	}
}	
</script>
