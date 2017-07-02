<template>
	<div class="ui-dropdown" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
		<div class="dropdown-rel" @click="handleClick">
			<slot name="rel">
				<a class="btn-rel">
					<span class="selector-btn">{{reltext}}</span>
					<i class="dropdown-arrow"></i>
				</a>
			</slot>
		</div>
		<div class="dropdown-list" v-show="show">
			<slot name="list">
				<!--<ul class="droplist">
					<li v-for="(item, index) in droplist"><a @click="handleClose(item)" class="dropitem">{{}}</a></li>
				</ul>-->
			</slot>
		</div>
	</div>
</template>

<script>
//公用方法
import UTIL from './../../util.js'

export default {
	data: function(){
		return {
			show: false //显示下拉菜单
		}
	},
	props: {
		trigger: {
			validator (value) {
				return UTIL.oneOf(value, ['click', 'hover']);
			},
			default: 'hover'
		},
		position: {
			validator (value) {
				return UTIL.oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
			},
			default: 'bottom'
		},
		width: {
			default: '100%'
		},
		reltext: {
			default: '下拉菜单'
		},
		droplist: {

		}
	},
	created() {
	},
	methods: {
		//点击显示／隐藏：click方式
		handleClick(){
			if (this.trigger !== 'click') return false;
			this.show = !this.show;
		},
		//点击隐藏：click方式
		handleClose(){
			if (this.trigger !== 'click') return false;
			this.show = false;
		},
		//hover显示：hover方式
		handleMouseEnter(){
			if (this.trigger !== 'hover') return false;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.show = true;
			}, 250);
		},
		//hover隐藏：hover方式
		handleMouseLeave(){
			if (this.trigger !== 'hover') return false;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.show = false;
			}, 250);
		},
// 		changeShowDropdown: function(){
// 			this.show = !this.show;
// 		},
// 		orderList: function(orderId){
// 			this.show = false;
// console.log(orderId);
// 		}
	}
}
</script>