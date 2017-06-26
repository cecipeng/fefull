<template>
	<div class="ui-modal" v-show="modal.showModal">
		<div class="modal-dialog">

			<a class="close-modal" v-if="modal.showCloseBtn"></a>

			<!--头部-->
			<div class="modal-header" v-if="modal.showheader">
				<slot name="header">
					<p class="title">{{modal.title}}</p>
				</slot>
				
			</div>
			<!--/头部-->

			<!--内容区域-->
			<div class="modal-body">
				<slot name="body">
					<p class="notice">{{modal.text}}</p>
				</slot>
			</div>
			<!--/内容区域-->

			<!--尾部,操作按钮-->
			<div class="modal-footer" v-if="modal.showFooter">
				<slot name="footer">
					<a v-if="modal.showCancelButton" href="javascript:void(0)" class="ui-btn" :class="modal.cancelButtonClass">{{modal.cancelButtonText}}</a>
					<a v-if="modal.showConfirmButton" href="javascript:void(0)" class="ui-btn" :class="modal.confirmButtonClass">{{modal.confirmButtonText}}</a>
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
				text: _modal.text, //纯文本

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

			};
		}
	},
	methods: {
		
	}
}	
</script>
