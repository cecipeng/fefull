<template>
    <div class="myartList">
    	<div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">我</em>的文章</h2>
			<comDropdown trigger="hover" placement="bottom">
				<a slot="rel" class="btn-rel">
					<span class="ui-btn ui-btn-main">新建</span>
					<i class="dropdown-arrow"></i>
				</a>
				<div slot="list" class="droplist">
					<router-link class="dropitem" tag="a" :to="{ name: 'myartCreate'}">新建文章</router-link>
					<router-link class="dropitem" tag="a" :to="{ name: 'myartCreateMarkdown'}">新建Markdown</router-link>
				</div>
			</comDropdown>
            
        </div>
        <div class="listbox">
			<table class="artlist">
				<thead>
					<tr>
						<td>序号</td>
						<td>标题</td>
						<td>创建日期</td>
						<td>是否原创</td>
						<td>所属分类</td>
						<td>所属标签</td>
						<td>评论数</td>
						<td>点赞数</td>
						<td>状态</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>标题CSS1</td>
						<td>2016.09.09 15:33</td>
						<td>原创</td>
						<td>CSS</td>
						<td>构建工具，图书</td>
						<td>123</td>
						<td>13</td>
						<td>已审核</td>
						<td>
							<a title="查看" target="_blank" class="btn-ctrl ctrl-view"></a>
							<a title="编辑" class="btn-ctrl ctrl-edit"></a>
							<a title="删除" class="btn-ctrl ctrl-del"></a>
						</td>
					</tr>
				</tbody>
			</table>
        </div>
    </div>
</template>

<script>
import comDropdown from './../common/dropdown'

export default {
	components: { comDropdown },
    data () {
        return {
           
        }
    },
    created: function(){
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
    .ui-user-header {
    	.ui-btn.ui-btn-main {
    		min-width: 110px;
    	}
    }
</style>
