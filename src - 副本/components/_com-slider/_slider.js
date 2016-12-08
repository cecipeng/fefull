/**
 * 幻灯片 com-slider
 */

function Slider(sliderOpt){

	//传入的参数
	var wrapname = sliderOpt.ele || "#sliderWrap";	//默认顶级id为sliderWrap
	this.isCSS3 = sliderOpt.iscss3 == undefined ? true : sliderOpt.iscss3;	//默认支持css3
	this.isturn = sliderOpt.isturn == undefined ? true : sliderOpt.isturn; //默认有左右翻页
	this.isnav = sliderOpt.isnav == undefined ? true : sliderOpt.isnav; //默认有导航点切换
	this.autoPlay = sliderOpt.autoPlay || 0; //默认不自动翻页，大于0的值表示自动翻页时间间隔（单位ms）

	//内部节点
	this.sliderLi = $(wrapname).find(".sliderbody > li") || undefined;	//内容
	this.sliderNav = $(wrapname).find(".slidernav .navbody") || undefined;	//导航点
	this.sliderBtnPrev = $(wrapname).find(".slider-prev") || undefined;	//左切换按钮
	this.sliderBtnNext = $(wrapname).find(".slider-next") || undefined;	//右切换按钮

	this.activeName = this.isCSS3 ? ["prevCSS3","activeCSS3","nextCSS3"] : ["prev","active","next"];

	this.init();
}

Slider.prototype.init = function(){
	var _this = this;
	var num = _this.sliderLi.length;	//总个数

	//导航点个数初始化
	if(_this.isnav) {
		_this.sliderNav.empty();
		for(var i=0; i<num; i++){
			_this.sliderNav.append('<span class="navdot"></span>');
		}
	}

	//默认显示第一张
	if(_this.isnav) {
		_this.sliderNav.find(".navdot:eq(0)").addClass('on');	//第一个导航点加on
	}
	if(_this.isturn) {
		_this.judgeTurnBtn(0);	//左切换按钮消失
	}
	_this.sliderLi.attr("data-status",_this.activeName[2]).eq(0).attr("data-status",_this.activeName[1]); //第一个Li添加active标记，其他添加next标记

	//有翻页按钮则绑定相关事件
	if(_this.isturn) {
		_this.preBtn();
		_this.nextBtn();
	}
	else {
		_this.sliderBtnPrev.hide();
		_this.sliderBtnNext.hide();
	}
	
	//有导航切换按钮则绑定相关事件
	if(_this.isnav) {
		_this.navBtn();
	}
	else {
		_this.sliderNav.hide();
	}

	if(_this.autoPlay > 0) {
		_this.autoPlayAction();
	}
	
}

//上一张切换事件
Slider.prototype.preBtn = function(){
	var _this = this;
	var indexOld = 0;
	var $btnPre = _this.sliderBtnPrev;
	$btnPre.on("click",function(){
		indexOld = _this.getIndex();	//获取切换前active的索引
		_this.slider(indexOld,indexOld-1);
	});
}

//下一张切换事件
Slider.prototype.nextBtn = function(){
	var _this = this;
	var indexOld = 0;
	var $btnNext = _this.sliderBtnNext;

	$btnNext.on("click",function(){
		indexOld = _this.getIndex();
		_this.slider(indexOld,indexOld+1);
	});
}

//导航点切换事件
Slider.prototype.navBtn = function(){
	var _this = this;
	var indexOld = 0, indexNew = 0;
	var $btnNav = _this.sliderNav.find(".navdot");
	
	$btnNav.on("click",function(){
		indexOld = _this.getIndex();
		indexNew = $(this).index();
		_this.slider(indexOld,indexNew);
	});
}

//切换
Slider.prototype.slider = function(oldone,newone){
	var _this = this;
	var diff = newone - oldone;

	//切换后的节点添加active标记
	_this.sliderLi.eq(newone).attr("data-status",_this.activeName[1]);

	//往后翻其他节点添加prev标记
	if(diff > 0){
		for(var i=oldone;i<newone;i++){
			// if(_this.isCSS3){
			// 	_this.sliderLi.eq(i).css({
			// 		transform: 'translateX(-100%)'
			// 	});
			// }
			// else {
			// 	_this.sliderLi.eq(i).css({
			// 		left: '-100%'
			// 	});
			// }
			_this.sliderLi.eq(i).attr("data-status",_this.activeName[0]);
		}
	}
	//往前翻其他节点添加next标记
	if(diff < 0){
		for(var i=oldone;i>newone;i--){
			// if(_this.isCSS3){
			// 	_this.sliderLi.eq(i).css({
			// 		transform: 'translateX(100%)'
			// 	});
			// }
			// else {
			// 	_this.sliderLi.eq(i).css({
			// 		left: '100%'
			// 	});
			// }
			_this.sliderLi.eq(i).attr("data-status",_this.activeName[2]);
		}
	}

	//导航点切换
	if(_this.isnav) {
		_this.sliderNav.find(".navdot").removeClass('on').eq(newone).addClass('on');
	}

	//左右按钮判断是否要隐藏
	if(_this.isturn) {
		_this.judgeTurnBtn(newone);
	}
}

//获取当前active标记的索引值
Slider.prototype.getIndex = function(){
	var _this = this;
	var $sliderLi = _this.sliderLi;
	for(var i=0;i<$sliderLi.length;i++){
		if($sliderLi.eq(i).attr("data-status") === _this.activeName[1]) return i;
	}
}

//控制左右按钮的显示隐藏
Slider.prototype.judgeTurnBtn = function(newone){
	var _this = this;

	if(newone == 0) {
		_this.sliderBtnPrev.hide();
		_this.sliderBtnNext.show();
	}
	else
	if(newone == _this.sliderLi.length-1) {
		_this.sliderBtnNext.hide();
		_this.sliderBtnPrev.show();
	}
	else {
		_this.sliderBtnPrev.show();
		_this.sliderBtnNext.show();
	}
}

//自动轮播
Slider.prototype.autoPlayAction = function(){
	var _this = this;
	var indexOld = 0;

	var t = setInterval(function(){
		indexOld = _this.getIndex();
		if(indexOld == _this.sliderLi.length-1) {
			_this.slider(indexOld,0);
		}
		else {
			_this.slider(indexOld,indexOld+1);
		}
	}, _this.autoPlay);
	
}