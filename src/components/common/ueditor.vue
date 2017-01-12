<template>
	<div class="com-ueditor">
        <script id="ueditor" type="text/plain"></script>
    </div>
</template>

<script>

import './../../assets/libs/ueditor/ueditor.config.js'
import './../../assets/libs/ueditor/ueditor.all.js'
import './../../assets/libs/ueditor/lang/zh-cn/zh-cn.js'

export default {
    data () {
    	return {

    	}
    },
    created: function() {
        
    },
    mounted: function(){
       var ue = UE.getEditor('ueditor', {
            UEDITOR_HOME_URL: __dirname + "src/assets/libs/ueditor/",
            toolbars: [
                [
                    'fullscreen', //全屏
                    'source', //源代码
                    'preview', //预览
                    'undo', //撤销
                    'redo', //重做
                    'cleardoc', //清空文档
                    'selectall', //全选
                    'print', //打印
                    'searchreplace', //查询替换
                    'help', //帮助
                    'insertimage', //多图上传
                    'imagenone', //默认
                    'imageleft', //左浮动
                    'imageright', //右浮动
                    'imagecenter', //居中
                    'wordimage', //图片转存
                    'emotion', //表情
                    'spechars', //特殊字符
                    'blockquote', //引用
                    'snapscreen', //截图
                    'insertvideo', //视频
                    'insertcode', //代码语言
                    'link', //超链接
                    'insertframe', //插入Iframe
                ],
                [
                    'formatmatch', //格式刷
                    'removeformat', //清除格式
                    'fontfamily', //字体
                    'fontsize', //字号
                    'forecolor', //字体颜色
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'fontborder', //字符边框
                    'superscript', //上标
                    'subscript', //下标
                    'horizontal', //分隔线
                    'paragraph', //段落格式
                    'lineheight', //行间距
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'inserttable', //插入表格
                    'edittable', //表格属性
                    'edittd', //单元格属性
                    'insertrow', //前插入行
                    'insertcol', //前插入列
                    'inserttitle', //插入标题
                    'mergeright', //右合并单元格
                    'mergedown', //下合并单元格
                    'mergecells', //合并多个单元格
                    'splittorows', //拆分成行
                    'splittocols', //拆分成列
                    'deleterow', //删除行
                    'deletecol', //删除列
                    'deletecaption', //删除表格标题
                    'deletetable' //删除表格
                ]
            ], //工具栏
            zIndex: 0, //编辑器在页面上的z-index层级
            initialContent: '欢迎使用ueditor!', //初始化编辑器的内容
            initialFrameHeight: 400, //编辑器高度
            elementPathEnabled: false, //是否启用元素路径
            wordCount: false //是否开启字数统计
        });
    },
    methods: {
        
    }
    
}
</script>

<style lang="scss">
    
</style>