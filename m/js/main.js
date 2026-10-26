$(document).ready(function () {
	$('.head .btn_menu, #menu .btn_menu').on('click', function () {
		$('#menu').toggleClass('open');
	});
	$('#gotop').on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 300);
	});
	$('.btn_googlemaps button').on('click', function () {
		var link = $(this).attr('link');
		if (link) window.open(link, '_blank');
	});
});
