/**
 * 查看大图 com-pop-largeview
 */

(function(){

	//初始化
	$(function(){
		$(".com-largeview").each(function(){
			var _own = $(this).find(".largeview");
			var total = _own.children("li").size();
			_own.children("li:first-child").addClass("on").siblings("li").removeClass("on");
			_own.siblings(".btn-prev").hide();
			_own.siblings(".pagenum").find(".num").text(1);
			_own.siblings(".pagenum").find(".total").text(total);
		})
	})

	$(".com-largeview").on("click",function(event){
		var _root = $(this).find(".largeview");
		var _old = _root.children("li.on").index();
		var _new;
		var _handle = function(index){
			if(index <= 0) {
				_root.siblings(".btn-prev").hide();
			}
			else
			if(index >= _root.find("li").size() - 1) {
				_root.siblings(".btn-next").hide();
			}
			else {
				_root.siblings(".btn-crl").show();
			}
			_root.siblings(".pagenum").find(".num").text(index+1);
			_root.children("li:eq("+_new+")").addClass("on").siblings().removeClass("on");
		};

		//上一张
		if($(event.target).is(".btn-prev")) {
			_new = _old - 1;
			_handle(_new);
		}

		//下一张
		if($(event.target).is('.btn-next')) {
			_new = _old + 1;
			_handle(_new);
		}
	})

})(jQuery);



