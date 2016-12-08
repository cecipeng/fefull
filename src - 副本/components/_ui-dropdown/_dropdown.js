(function(){
	var $uiDropdownWarp = $('.ui-dropdown');
	var $uiDropdownSelector = $('.ui-dropdown .selector');
	var $uiDropdownBody = $('.ui-dropdown .dropdown');

	$uiDropdownWarp.on('click', function(){
		$(this).find('.dropdown').toggle();
		$(this).toggleClass('on');
	})
	$uiDropdownWarp.on('mouseenter', function(){
		$(this).find('.dropdown').toggle();
		$(this).toggleClass('on');
	})
	$uiDropdownWarp.on('mouseleave', function(){
		$(this).find('.dropdown').hide();
		$(this).removeClass('on');
	})
})();