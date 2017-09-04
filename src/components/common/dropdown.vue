<template>
	<div class="ui-dropdown" :placement="placement" :class="{disabled:disabled}"  @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
		<div class="dropdown-rel" @click="handleClick">
			<slot name="rel">
				<a class="btn-rel">
					<span class="selector-btn" :data-id="reltextId">{{reltextName}}</span>
					<i class="dropdown-arrow"></i>
				</a>
			</slot>
		</div>
		<transition name="slider-top">
			<div class="dropdown-list" v-show="show" :style="{width: width,position: top,'margin-left': offset}">
				<slot name="list"></slot>
			</div>
		</transition>
	</div>
</template>

<script>


//公用方法
import UTIL from './../../util.js'

export default {
	data: function(){
		return {
			offset: 0,
			slider: 'slider-bottom', //弹出层出现的动画
			position: 'top', //弹出层出现位置的数值：根据传入的placement确定，如传入left，则top的值为100%
			show: false //显示下拉菜单
		}
	},
	props: {
		trigger: { //触发方式
			validator (value) {
				return UTIL.oneOf(value, ['click', 'hover']);
			},
			default: 'hover'
		},
		top: { //下拉菜单高度
			default: '36px'
		},
		placement: { //位置
			validator (value) {
				return UTIL.oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
			},
			default: 'bottom'
		},
		width: { //下拉菜单宽度
			default: '100%'
		},
		reltextId: { //rel显示内容id值
			default: ''
		},
		reltextName: { //rel显示文字
			default: '下拉菜单'
		},
		disabled: { //是否可编辑
			type: Boolean,
			default: false
		}
	},
	created() {
		this.offset = parseInt(this.width) / -2;
	},
	mounted () {
		this.$on('itemClickDropdown', function(val) {
			this.show = false;
			this.$emit('itemClickParent', val);
		}.bind(this));

		switch(this.placement) {
			case "top-start":
			case "top":
			case "top-end":
				this.position = 'bottom';
				this.slider = 'slider-top';
                break;
            case "bottom-start":
			case "bottom":
			case "bottom-end":
				this.position = 'top';
				this.slider = 'slider-bottom';
				break;
			case "left-start":
			case "left":
			case "left-end":
				this.position = 'right';
				this.top = '100%';
				this.slider = 'slider-left';
				break;
			case "right-start":
			case "right":
			case "right-end":
				this.position = 'left';
				this.top = '100%';
				this.slider = 'slider-right';
                break;
			default: 
				this.position = 'top';
				this.slider = 'slider-bottom';
		}
		
	},
	methods: {
		//点击显示／隐藏：click方式
		handleClick(){
			if (this.trigger !== 'click' || this.disabled == true) return false;
			this.show = !this.show;
		},
		//点击隐藏：click方式
		handleClose(){
			if (this.trigger !== 'click' || this.disabled == true) return false;
			this.show = false;
		},
		//hover显示：hover方式
		handleMouseEnter(){
			if (this.trigger !== 'hover' || this.disabled == true) return false;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.show = true;
			}, 250);
		},
		//hover隐藏：hover方式
		handleMouseLeave(){
			if (this.trigger !== 'hover' || this.disabled == true) return false;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.show = false;
			}, 250);
		}
	}
}
</script>