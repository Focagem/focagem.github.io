/* Adicione aqui o seu codigo javascript do front-end*/
$(document).ready(function () {

	Menu_Selecionado();
	
	$('.top').hover(function(){},function(){Menu_Selecionado()})
	
	$('.top ul li').hover(function () {
		var pos_obj = $(this).position();
		var pos_obj2 = $(this).offset();
		/*$('.sel_menu').show();
		$('.sel_menu').attr("tom", $(this).attr("idm"));
		$('.sel_menu').stop().animate({'left': pos_obj.left + ($(this).width() / 2) - 5});*/

		if ($(this).hasClass('dropdown')) {
			$(".nav_sub").animate({"top": "0"}).removeClass('active');
			$('.nav_sub#sm' + $(this).attr("idm")).stop().animate({"top": "103px"}).addClass('active');
			$('.nav_sub#sm' + $(this).attr("idm") + " ul").stop().css({'left': pos_obj2.left});
		} else {
			$(".nav_sub").stop().animate({"top": "0"}).removeClass('active');
		}
	}, function () {
		/*if (!$('.sel_menu').is(":hover") && !$('.nav_sub').is(":hover")) {
			if ($(this).hasClass('dropdown')) {
				$('.sel_menu').hide();
				$('.nav_sub#sm' + $(this).attr("idm")).stop().animate({"top": "0"});
			}
		}*/
	});

    /*$('.nav_sub').hover(function () {
        $('.sel_menu').show();
    }, function () {
        $(this).stop().animate({"top": "0"});
        $('.sel_menu').stop().fadeOut(200);
    });*/

    $('.sel_menu').hover(function () {
        //DOES NOTHING
    }, function () {
//        if (!$('.nav_sub').is(":hover")) {
            $('.sel_menu').hide();
//        }
    });
	
	var slider_banner = $('#slider_banners').bxSlider({
		auto: true,
		mode: 'fade',
		controls: true,
		pager: true,
		pause: 8000,
		speed: 750,
		prevSelector: $('#banner_prev'),
		nextSelector: $('#banner_next'),
		prevText: '<img src="/site/imagens/banner_prev.png" />',
		nextText: '<img src="/site/imagens/banner_next.png" />',
		pagerCustom: $('#banner_pager'),
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			$('.banners .images').backstretch("show", newIndex);
			slider_banner.startAuto();
		}
	});
	
	$('#cases_slider').bxSlider({
		auto: true,
		mode: 'fade',
		controls: true,
		pager: true,
		prevSelector: $('#cases_prev'),
		nextSelector: $('#cases_next'),
		prevText: '<img src="/site/imagens/cases_prev.png" />',
		nextText: '<img src="/site/imagens/cases_next.png" />',
		pagerCustom: $('#cases_pager')
	});
	
	$('#form_newsletter').submit(function(e) {
		e.preventDefault();

		var $serialize = $(this).serialize();

		$("#alertas").show().html("A validar...");

		$.post("/processes/ajax_newsletter", $serialize, function(data) {
			var $res = JSON.parse(data);

			if($res.type == "warning") {
				$("#alertas").show().html($res.value);
			} else if($res.type == "success") {
				$("#form_newsletter").find("input").val("");
				$("#alertas").show().html($res.value);
			}
		});
		
		$('input, textarea').placeholder();
	});

	if($('#google_map').length > 0) {
		startMap("google_map");
	}
	
	if($('#google_map2').length > 0) {
		startMap("google_map2");
	}

});

function startMap(id_mapa) {
	
	function initialize() {
		var myLatLng = new google.maps.LatLng(38.707560,-9.223440);
		var LagLngStart = new google.maps.LatLng(38.713000,-9.223440);
		
		var style = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}];
		
		var mapProp = {
			center: LagLngStart,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles: style
		};
		
		var map = new google.maps.Map(document.getElementById(id_mapa), mapProp);
		
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map
		});
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
}

function Menu_Selecionado()
{
	var menu = $('.sel_menu').attr("menu");
	
	$('.sel_menu').show();
	if(menu == 'pagina')
	{
		$('.sel_menu').css('left','487.797px');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');
	}
	else if(menu == 'servicos')
	{
		$('.sel_menu').css('left','442.109px');
		$('#menu_3').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}		
	else if(menu == 'solucoes'){
		$('.sel_menu').css('left','543.953px');	
		$('#menu_4').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else if(menu == 'clientes'){
		$('.sel_menu').css('left','547.047px');	
		$('#menu_6').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else if(menu == 'missao-e-valores' || menu == 'apresentacao')
	{
		$('.sel_menu').css('left','345.031px');	
		$('#menu_2').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else if(menu == 'contatos' ){
		$('.sel_menu').css('left','791.609px');	
		$('#menu_7').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else if(menu == 'candidatura' ){
		$('.sel_menu').css('left','664px');
		$('#menu_10').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else if(menu == 'acesso_remoto' ){
		$('.sel_menu').css('left','895px');
		$('#menu_11').css('color','#FBD504');
		$('.sel_menu').css('background','url(/site/imagens/sel_menu_selected.png) center 0px no-repeat');	
	}
	else
		$('.sel_menu').hide();
}







//	$(".data_input").inputmask("dd-mm-yyyy");
//	/*INICIO FANCYBOX*/
//		$(".fancybox").fancybox({
//			type: "image",
//			openEffect	: 'none',
//			closeEffect	: 'none',
//			beforeShow: function () {
//
//					this.title = $(this.element).children('img').attr('alt');
//                  
//			}
//		});
//	
//	
//	
//		/*FANCYBOX VIDEO*/
//		$(".fancy_youtube").click(function() {
//			$.fancybox({
//					'padding'       : 0,
//					'autoScale'     : false,
//					'transitionIn'  : 'none',
//					'transitionOut' : 'none',
//					'title'         : this.title,
//					'width'     : 680,
//					'height'        : 495,
//					'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
//					'type'          : 'swf',
//					'swf'           : {
//						 'wmode'        : 'transparent',
//						'allowfullscreen'   : 'true'
//					}
//				});
//
//			return false;
//		});
//
//
//	/*FIM FANCYBOX*/