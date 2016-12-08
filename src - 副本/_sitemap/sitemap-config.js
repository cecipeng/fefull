/**
 * 索引页相关js 
 */

//文件路径
var CONFIG = {
	hrefComp : "components/",	//组件目录（相对根目录）
	hrefPage : "views/",		//页面目录（相对根目录）

	namePage : "view",			//业务模块前缀名
	nameInclude : "com",		//include组件前缀名
	nameCopy : "ui",			//copy组件前缀名

	isModule : false
}


//内容信息
var CONTENT = [
	{	//框架
		type: 		CONFIG.namePage,		//view：业务模块，ui：复制组件，com：include组件
		cnname: 	"框架",	 	//中文名
		enname: 	"_frame",	//英文名
		author: 	"pxx",	 	//制作人
		conlist: 	["_frame"]	//文件列表
	},


	//以下为常见模块参考，根据需求增减到上一行
	{	//业务：账号管理
		type: 		CONFIG.namePage,		
		cnname: 	"账号管理",	 	
		enname: 	"account",	
		author: 	"pxx",	
		conlist: 	[
						{"zn":"个人基本资料","en":"account-person-basic"},
						{"zn":"账户筛选","en":"account-choose"}
					]	
	},
	{	//业务：登录
		type: 		CONFIG.namePage,		
		cnname: 	"登录",	 	
		enname: 	"login",	
		author: 	"pxx",
		conlist: 	["login"]	
	},

	{	//copy——btn
		type: 		CONFIG.nameCopy,
		cnname: 	"按钮",
		enname: 	"btn",
		author: 	"pxx",
		style: 		"col",		//col: 代码为左右显示，row代码为上下显示
		conlist: 	[
						{"zn":"主要确认按钮","en":"btn-main"},
						{"zn":"取消按钮","en":"btn-cancel"}
					]
	},
	{	//copy——crumb
		type: 		CONFIG.nameCopy,
		cnname: 	"面包屑",
		enname: 	"crumb",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["crumb"]
	},
	{	//copy——dropdown
		type: 		CONFIG.nameCopy,
		cnname: 	"下拉菜单",
		enname: 	"dropdown",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["dropdown"]
	},
	{	//copy——占位内容
		type: 		CONFIG.nameCopy,
		cnname: 	"占位内容",
		enname: 	"placeholder",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	[
						{"zn":"统一内容为空","en":"placeholder-empty"},
						{"zn":"统一操作成功提示","en":"placeholder-success"}
					]
	},
	{	//copy——表单
		type: 		CONFIG.nameCopy,
		cnname: 	"表单",
		enname: 	"form",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	[
						{"zn":"表单框架","en":"form"},
						{"zn":"输入框","en":"form-input"},
						{"zn":"下拉选择框","en":"form-select"},
						{"zn":"文本域","en":"form-textarea"},
						{"zn":"单选框","en":"form-radio"},
						{"zn":"多选框","en":"form-checkbox"},
						{"zn":"开关","en":"form-switch"},
						{"zn":"验证码","en":"form-vercode"},
						{"zn":"上传","en":"form-upload"}
					]
	},
	{	//copy——pop
		type: 		CONFIG.nameCopy,
		cnname: 	"弹窗框架",
		enname: 	"pop",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["pop"]
	},
	{	//copy——tab
		type: 		CONFIG.nameCopy,
		cnname: 	"tab",
		enname: 	"tab",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["tab"]
	},
	{	//copy——title
		type: 		CONFIG.nameCopy,
		cnname: 	"标题栏",
		enname: 	"title",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["title1"]
	},
	{	//copy——link
		type: 		CONFIG.nameCopy,
		cnname: 	"链接",
		enname: 	"link",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	["link"]
	},
	{	//copy——toast
		type: 		CONFIG.nameCopy,
		cnname: 	"自动消失提示",
		enname: 	"toast",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	["toast"]
	},
	{	//copy——paragraph
		type: 		CONFIG.nameCopy,
		cnname: 	"段落",
		enname: 	"para",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["para"]
	},

	{	//com——header
		type: 		CONFIG.nameInclude,
		cnname: 	"公用头部",
		enname: 	"header",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["header"]
	},
	{	//com——footer
		type: 		CONFIG.nameInclude,
		cnname: 	"公用底部",
		enname: 	"footer",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["footer"]
	},
	{	//com——largeview
		type: 		CONFIG.nameInclude,
		cnname: 	"大图幻灯片",
		enname: 	"largeview",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["largeview"]
	},
	{	//com——list
		type: 		CONFIG.nameInclude,
		cnname: 	"列表",
		enname: 	"list",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	[
						{"zn":"图-标题-正文","en":"list-itm"}
					]
	},
	{	//com——mainmenu
		type: 		CONFIG.nameInclude,
		cnname: 	"公用主菜单",
		enname: 	"mainmenu",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	["mainmenu"]
	},
	{	//com——page
		type: 		CONFIG.nameInclude,
		cnname: 	"分页",
		enname: 	"page",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["page"]
	},
	{	//com——star
		type: 		CONFIG.nameInclude,
		cnname: 	"星级评价",
		enname: 	"star",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	[
						{"zn":"整图只读款","en":"star-readonly"},
						{"zn":"点击评分","en":"star-ctrl"}
					]
	},
	{	//com——search
		type: 		CONFIG.nameInclude,
		cnname: 	"搜索框",
		enname: 	"search",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	["search"]
	},
	{	//com——totop
		type: 		CONFIG.nameInclude,
		cnname: 	"返回顶部",
		enname: 	"totop",
		author: 	"pxx",
		style: 		"col",	
		conlist: 	["totop"]
	},
	{	//com——slider
		type: 		CONFIG.nameInclude,
		cnname: 	"幻灯片轮播",
		enname: 	"slider",
		author: 	"pxx",
		style: 		"row",	
		conlist: 	["slider"]
	}
	
];


//DOM模板
var TEMP = [
	{

	}
];
