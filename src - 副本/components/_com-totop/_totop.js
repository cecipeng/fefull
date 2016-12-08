/**
 * 返回顶部 com-totop
 */

(function(){


	//滚动时显示按钮
	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		if( _top > 100 && flag === 0 ){
		    $('.com-totop').show();
		    flag = 1;
		}
		else
		if( _top <= 100 && flag === 1) {
			$('.com-totop').hide();
			flag = 0;
		}
	})

	//点击返回顶部
	$(".com-totop").on("click",function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop:0},500);
	})

})(jQuery);



