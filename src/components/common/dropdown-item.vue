<template>
	<li :data-id="val" :class="{classname,disabled:disabled,selected:selected}" @click.stop="itemClick"><slot></slot></li>
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
		val: { //id值
			// type: [String, Number]
		},
		disabled: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Boolean,
			default: false
		},
		classname: {
			default: 'dropitem'
		},
	},
	created() {
	},
	methods: {
		//点击调用父级事件
		itemClick(){
        	this.$parent.$emit('itemClickDropdown', this.val);
		}
	}
}
</script>