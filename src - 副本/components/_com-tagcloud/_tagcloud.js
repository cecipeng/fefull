(function(){
	var $uiTagcloudWarp = $('.com-tagcloud');
	var $uiTagcloudSelector = $('.com-tagcloud .mainlink');
	var $uiTagcloudBody = $('.com-tagcloud .dropdown-cloud');

	$uiTagcloudWarp.on('mouseenter', function(){
		$(this).find('.dropdown-cloud').toggle();
		$(this).toggleClass('on');
	})
	$uiTagcloudWarp.on('mouseleave', function(){
		$(this).find('.dropdown-cloud').hide();
		$(this).removeClass('on');
	})
})();