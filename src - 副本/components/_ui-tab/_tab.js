/**
 * 首页幻灯 com-slider
 */

(function(){
	
	$(".ui-tab .tab-head li").on("click",function(){
		var _index = $(this).index();
		var _root = $(this).closest(".ui-tab");

		$(this).addClass("on").siblings("li").removeClass("on");
		_root.find(".tab-body .tab-eachcon:eq("+_index+")").addClass("on").siblings(".tab-eachcon").removeClass("on");
	})

})(jQuery);
