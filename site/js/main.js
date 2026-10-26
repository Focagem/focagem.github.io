/* Adicione aqui o seu codigo javascript do front-end*/
$(document).ready(function () {

	Menu_Selecionado();
	initMobileMenu();
	initSearchPage();
	initCandidaturaPage();
	
	$('.top').hover(function(){},function(){Menu_Selecionado()})
	
	$('.top ul li').hover(function () {
		if (window.innerWidth <= 960) return;
		var pos_obj = $(this).position();
		var pos_obj2 = $(this).offset();

		if ($(this).hasClass('dropdown')) {
			$(".nav_sub").animate({"top": "0"}).removeClass('active');
			$('.nav_sub#sm' + $(this).attr("idm")).stop().animate({"top": "103px"}).addClass('active');
			$('.nav_sub#sm' + $(this).attr("idm") + " ul").stop().css({'left': pos_obj2.left});
		} else {
			$(".nav_sub").stop().animate({"top": "0"}).removeClass('active');
		}
	}, function () {
	});

    $('.sel_menu').hover(function () {
        //DOES NOTHING
    }, function () {
        $('.sel_menu').hide();
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

		var $form = $(this);
		var nome = $.trim($form.find('input[name="nome"]').val() || '');
		var email = $.trim($form.find('input[name="email"]').val() || '');
		var empresa = $.trim($form.find('input[name="empresa"]').val() || '');
		var telefone = $.trim($form.find('input[name="telefone"]').val() || '');
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!nome || !email) {
			$("#alertas").show().html("Por favor preencha o Nome e o Email.");
			return;
		}
		if (!emailRegex.test(email)) {
			$("#alertas").show().html("Por favor introduza um endereço de email válido.");
			return;
		}

		$("#alertas").show().html("A validar...");

		var subject = encodeURIComponent("Subscrição de Newsletter - Focagem");
		var body = encodeURIComponent(
			"Pedido de subscrição de Newsletter:\n\n" +
			"Nome: " + nome + "\n" +
			"Email: " + email + "\n" +
			"Empresa: " + (empresa || "-") + "\n" +
			"Telefone: " + (telefone || "-")
		);

		setTimeout(function() {
			$form.find("input").val("");
			$("#alertas").show().html("Subscrição validada! A abrir o seu cliente de email para confirmação.");
			window.location.href = "mailto:focagem@focagem.com?subject=" + subject + "&body=" + body;
			if ($.fn.placeholder) {
				$('input, textarea').placeholder();
			}
		}, 250);
	});

	if($('#google_map').length > 0) {
		startMap("google_map");
	}
	
	if($('#google_map2').length > 0) {
		startMap("google_map2");
	}

});

function initMobileMenu() {
	var $topContainer = $('.top .container');
	if ($topContainer.length === 0 || $('#mobile-nav-drawer').length > 0) return;

	var $toggleBtn = $('<button type="button" class="mobile-nav-toggle" aria-label="Abrir Menu" aria-expanded="false"><span></span><span></span><span></span></button>');
	$topContainer.append($toggleBtn);

	var $overlay = $('<div id="mobile-nav-overlay"></div>');
	var $drawer = $('<nav id="mobile-nav-drawer" aria-label="Menu Principal Mobile"><ul class="mobile-nav-list"></ul></nav>');
	var $list = $drawer.find('.mobile-nav-list');

	$topContainer.find('ul > a').each(function () {
		var $a = $(this);
		var $li = $a.find('li');
		var label = $.trim($li.text());
		var href = $a.attr('href') || '#';
		var idm = $li.attr('idm');
		var isDropdown = $li.hasClass('dropdown');
		var $subSource = idm ? $('#sm' + idm + ' ul li a') : $();

		if (isDropdown && $subSource.length > 0) {
			var $item = $('<li class="mobile-nav-item has-sub"><a href="#" class="mobile-nav-link mobile-sub-toggle"><span>' + label + '</span><span class="mobile-arrow"></span></a><ul class="mobile-sub-list"></ul></li>');
			var $subList = $item.find('.mobile-sub-list');

			if (idm === '3' || idm === '4') {
				$subList.append('<li class="mobile-sub-all"><a href="' + href + '">Ver todos (' + label + ')</a></li>');
			}

			$subSource.each(function () {
				var subLabel = $.trim($(this).text());
				var subHref = ($(this).attr('href') || '#').replace('iindex.html', 'index.html');
				if (subLabel) {
					$subList.append('<li><a href="' + subHref + '">' + subLabel + '</a></li>');
				}
			});

			$list.append($item);
		} else {
			$list.append('<li class="mobile-nav-item"><a href="' + href + '" class="mobile-nav-link">' + label + '</a></li>');
		}
	});

	var searchHref = $topContainer.find('.pesquisa a').attr('href');
	if (searchHref) {
		$list.append('<li class="mobile-nav-item"><a href="' + searchHref + '" class="mobile-nav-link">Pesquisa</a></li>');
	}

	$('body').append($overlay).append($drawer);

	function closeDrawer() {
		$toggleBtn.removeClass('open').attr('aria-expanded', 'false');
		$drawer.removeClass('open');
		$overlay.removeClass('open');
		$('body').removeClass('mobile-nav-open');
	}

	$toggleBtn.on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var isOpen = $drawer.hasClass('open');
		if (isOpen) {
			closeDrawer();
		} else {
			$toggleBtn.addClass('open').attr('aria-expanded', 'true');
			$drawer.addClass('open');
			$overlay.addClass('open');
			$('body').addClass('mobile-nav-open');
		}
	});

	$overlay.on('click', function () {
		closeDrawer();
	});

	$drawer.on('click', '.mobile-sub-toggle', function (e) {
		e.preventDefault();
		var $parent = $(this).closest('.has-sub');
		var $sub = $parent.find('.mobile-sub-list');
		$parent.toggleClass('open');
		$sub.stop(true, true).slideToggle(200);
	});

	$(window).on('resize', function () {
		if (window.innerWidth > 960) {
			closeDrawer();
		}
	});
}

function initSearchPage() {
	var $form = $('#form_pesquisa');
	if ($form.length === 0) return;

	var pages = [
		{ title: "Apresentação", url: "/pt/pagina/27/apresentacao/index.html", text: "focagem empresa fundada 2000 parceira primavera processos de gestão financeiros administrativos logísticos organizações consultoria sistemas de informação" },
		{ title: "Missão e Valores", url: "/pt/pagina/28/missao-e-valores/index.html", text: "missão valores rigor transparência excelência ética responsabilidade orientação para o cliente soluções integradas de gestão" },
		{ title: "Serviços", url: "/pt/servicos.html", text: "todos os serviços assistência técnica desenvolvimento software primavera eticadata wintouch disaster recovery gestão documental business analytics" },
		{ title: "Assistência Técnica e Monitorização de Sistemas", url: "/pt/servico/7/assistencia-tecnica-e-monitorizacao-de-sistemas/index.html", text: "assistência técnica monitorização sistemas infraestrutura servidores redes manutenção preventiva corretiva helpdesk suporte" },
		{ title: "Desenvolvimento de Software à Medida", url: "/pt/servico/8/desenvolvimento-de-software-a-medida/index.html", text: "desenvolvimento software à medida aplicações específicas integração sistemas erp análise requisitos programação" },
		{ title: "Implementação de Sistemas Primavera", url: "/pt/servico/9/implementacao-de-sistemas-primavera/index.html", text: "implementação sistemas primavera bss erp consultoria parametrização formação suporte parceiro certificado" },
		{ title: "Implementação de Sistemas Eticadata", url: "/pt/servico/10/implementacao-de-sistemas-eticadata/index.html", text: "implementação sistemas eticadata software erp gestão comercial contabilidade recursos humanos parceiro" },
		{ title: "Implementação de Sistemas Wintouch", url: "/pt/servico/11/implementacao-de-sistemas-wintouch/index.html", text: "implementação sistemas wintouch restauração retalho hotelaria pos ponto de venda faturação" },
		{ title: "Disaster Recovery", url: "/pt/servico/12/disaster-recovery/index.html", text: "disaster recovery recuperação desastres backup cópias de segurança continuidade de negócio cloud proteção dados" },
		{ title: "Gestão Documental", url: "/pt/servico/18/gestao-documental/index.html", text: "gestão documental filedoc desmaterialização normalização indexação workflow pesquisa arquivo digital redução de custo" },
		{ title: "Business Analytics", url: "/pt/servico/20/business-analytics/index.html", text: "business analytics primavera tomada de decisão indicadores gestão dashboards relatórios análise dados" },
		{ title: "Soluções", url: "/pt/solucoes.html", text: "todas as soluções logística financeiras crm projetos recursos humanos ativos hoteleira e-portals creches clínicas hospitalares veterinárias" },
		{ title: "Soluções de Logística", url: "/pt/solucao/1/solucoes-de-logistica/index.html", text: "soluções de logística circuito comercial vendas compras gestão de inventário stocks pos faturação eletrónica encomendas" },
		{ title: "Soluções Financeiras", url: "/pt/solucao/2/solucoes-financeiras/index.html", text: "soluções financeiras contabilidade geral analítica orçamental tesouraria bancos contas correntes fiscalidade saft" },
		{ title: "Soluções de Contatos e Oportunidades / CRM", url: "/pt/solucao/3/solucoes-de-contatos-e-oportunidades-crm/index.html", text: "soluções de contatos e oportunidades crm clientes força de vendas campanhas marketing fidelização" },
		{ title: "Solução de Projetos e Serviços", url: "/pt/solucao/4/solucao-de-projetos-e-servicos/index.html", text: "solução de projetos e serviços gestão operacional financeira obras orçamentos pós-venda assistência técnica" },
		{ title: "Solução de Recursos Humanos", url: "/pt/solucao/5/solucao-de-recursos-humanos/index.html", text: "solução de recursos humanos processamento salarial remunerações honorários cadastro colaboradores Segurança Social IRS" },
		{ title: "Solução de Gestão de Ativos", url: "/pt/solucao/6/solucao-de-gestao-de-ativos/index.html", text: "solução de gestão de ativos imobilizado amortizações depreciações reavaliações ciclo de vida bens" },
		{ title: "Solução de Gestão Hoteleira", url: "/pt/solucao/13/solucao-de-gestao-hoteleira/index.html", text: "solução de gestão hoteleira hotéis alojamento reservas check-in check-out housekeeping faturação" },
		{ title: "Soluções de e-Portals", url: "/pt/solucao/14/solucoes-de-e-portals/index.html", text: "soluções de e-portals portais web colaboradores clientes fornecedores self-service" },
		{ title: "Solução para Gestão de Creches e Infantários", url: "/pt/solucao/15/solucao-para-gestao-de-creches-e-infantarios/index.html", text: "solução para gestão de creches e infantários colégios ensino inscrições mensalidades alunos atividades" },
		{ title: "Solução de Gestão de Clínicas Hospitalares", url: "/pt/solucao/16/solucao-de-gestao-de-clinicas-hospitalares/index.html", text: "solução de gestão de clínicas hospitalares saúde consultórios médicos marcações consultas utentes" },
		{ title: "Solução para Gestão de Clínicas Veterinárias", url: "/pt/solucao/17/solucao-para-gestao-de-clinicas-veterinarias/index.html", text: "solução para gestão de clínicas veterinárias animais fichas clínicas vacinas consultas" },
		{ title: "Candidatura / Recrutamento", url: "/pt/candidatura.html", text: "candidatura espontânea recrutamento emprego carreira currículo recursos humanos" },
		{ title: "Acesso Remoto / Suporte Técnico", url: "/pt/acesso_remoto.html", text: "acesso remoto suporte técnico assistência remota download cliente" },
		{ title: "Contatos", url: "/pt/pagina/22/contatos.html", text: "contatos morada telefone fax email algés lisboa comercial suporte newsletter localização" }
	];

	function normalizeStr(s) {
		return (s || '').toLowerCase()
			.replace(/[áàâãä]/g, 'a')
			.replace(/[éèêë]/g, 'e')
			.replace(/[íìîï]/g, 'i')
			.replace(/[óòôõö]/g, 'o')
			.replace(/[úùûü]/g, 'u')
			.replace(/[ç]/g, 'c');
	}

	function renderSearch(query) {
		var cleanQuery = $.trim(query || '');
		$('.resultados_pesquisa').remove();
		if (!cleanQuery) return;

		var normQuery = normalizeStr(cleanQuery);
		var terms = normQuery.split(/\s+/);
		var results = [];

		for (var i = 0; i < pages.length; i++) {
			var p = pages[i];
			var haystack = normalizeStr(p.title + ' ' + p.text);
			var matched = true;
			for (var t = 0; t < terms.length; t++) {
				if (terms[t] && haystack.indexOf(terms[t]) === -1) {
					matched = false;
					break;
				}
			}
			if (matched) {
				results.push(p);
			}
		}

		var $container = $('<div class="resultados_pesquisa"></div>');
		if (results.length === 0) {
			$container.append('<div class="titulo_resultados">Não foram encontrados resultados para "<strong></strong>".</div>');
			$container.find('strong').text(cleanQuery);
		} else {
			$container.append('<div class="titulo_resultados">Resultados da pesquisa para "<strong></strong>" (' + results.length + '):</div>');
			$container.find('strong').text(cleanQuery);
			var $listWrap = $('<div class="lista_resultados"><ul style="list-style: none; padding-left: 0;"></ul></div>');
			var $ul = $listWrap.find('ul');
			for (var j = 0; j < results.length; j++) {
				var $li = $('<li style="margin-bottom: 12px;"><a class="blue" style="font-weight: 700; text-decoration: none;" href="' + results[j].url + '"></a></li>');
				$li.find('a').text(results[j].title);
				$ul.append($li);
			}
			$container.append($listWrap);
		}

		$('.pesquisa_bloco').append($container);
	}

	$form.on('submit', function (e) {
		e.preventDefault();
		var q = $form.find('input[name="pesq"]').val();
		renderSearch(q);
	});

	var match = window.location.search.match(/[?&]pesq=([^&]+)/);
	if (match && match[1]) {
		var initialQ = decodeURIComponent(match[1].replace(/\+/g, ' '));
		$form.find('input[name="pesq"]').val(initialQ);
		renderSearch(initialQ);
	}
}

window.selectRadio = function () {
	// Handled centrally by initCandidaturaPage
};

function initCandidaturaPage() {
	var $cand = $('.candidatura');
	if ($cand.length === 0) return;

	// 1. Radio buttons (Masculino / Feminino)
	$cand.find('.input_radio').off('click').on('click', function () {
		var $this = $(this);
		var $group = $this.closest('td, .form-group');
		if ($group.length === 0) $group = $cand;
		$group.find('.input_radio').removeClass('selected').find('input[type="radio"]').prop('checked', false);
		$this.addClass('selected');
		$this.find('input[type="radio"]').prop('checked', true);
	});

	// 2. File upload ("Explorar...") button and filename display
	$cand.find('.explorar').off('click').on('click', function (e) {
		e.preventDefault();
		$('#html_btn').trigger('click');
	});

	$('#html_btn').off('change').on('change', function () {
		var fileName = (this.files && this.files.length > 0) ? this.files[0].name : ($(this).val().split('\\').pop() || 'Currículo');
		$cand.find('.title_cv').text(fileName);
	});

	// 3. Local Confirmation Image (replacing defunct Google reCAPTCHA v1)
	var currentCode = '';
	function generateCaptcha() {
		var chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
		currentCode = '';
		for (var i = 0; i < 5; i++) {
			currentCode += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		var $imgBox = $('#recaptcha_image');
		if ($imgBox.length > 0) {
			$imgBox.css({
				'width': '220px',
				'height': '50px',
				'background': '#f1f3f8',
				'border': '1px solid #0C3483',
				'display': 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				'font-family': 'Georgia, monospace',
				'font-size': '24px',
				'font-weight': 'bold',
				'letter-spacing': '6px',
				'color': '#0C3483',
				'user-select': 'none',
				'margin-bottom': '6px'
			}).text(currentCode);
		}
		$('.recaptcha_only_if_incorrect_sol').hide();
	}

	$('.recaptcha_only_if_audio').hide();
	$('.recaptcha_only_if_incorrect_sol').hide();
	generateCaptcha();

	window.Recaptcha = {
		reload: function () {
			generateCaptcha();
		},
		switch_type: function () {
			generateCaptcha();
		},
		showhelp: function () {
			alert('Introduza os caracteres apresentados na imagem de confirmação no campo "Escreva Aqui".');
		}
	};

	// 4. Static form submission handler
	$cand.find('form').on('submit', function (e) {
		e.preventDefault();
		var typedCode = $.trim($('#recaptcha_response_field').val() || '').toUpperCase();
		if (typedCode !== currentCode) {
			$('.recaptcha_only_if_incorrect_sol').show();
			$('#recaptcha_response_field').focus();
			return false;
		}
		$('.recaptcha_only_if_incorrect_sol').hide();

		var $f = $(this);
		var nome = $.trim($f.find('input[name="nome"]').val() || '');
		var contacto = $.trim($f.find('input[name="contacto"]').val() || '');
		var email = $.trim($f.find('input[name="email"]').val() || '');
		var hab = $.trim($f.find('select[name="habilitacoes"] option:selected').text() || '');
		var nasc = $.trim($f.find('input[name="data_nasc"]').val() || '');
		var sexo = $f.find('input[name="sexo"]:checked').val() === '1' ? 'Feminino' : 'Masculino';
		var msg = $.trim($f.find('textarea[name="mensagem"]').val() || '');

		var subject = encodeURIComponent("Candidatura Espontânea - " + nome);
		var body = encodeURIComponent(
			"Candidatura submetida através do site Focagem:\n\n" +
			"Nome: " + nome + "\n" +
			"Telefone: " + contacto + "\n" +
			"E-mail: " + email + "\n" +
			"Habilitações: " + hab + "\n" +
			"Data de Nascimento: " + nasc + "\n" +
			"Género: " + sexo + "\n\n" +
			"Mensagem:\n" + msg + "\n\n" +
			"(Nota: Por favor anexe o seu ficheiro de Currículo a este e-mail antes de enviar.)"
		);

		window.location.href = "mailto:recrutamento@focagem.com?subject=" + subject + "&body=" + body;
	});
}

function startMap(id_mapa) {
	var container = document.getElementById(id_mapa);
	if (!container) return;
	var isBgMap = (id_mapa === "google_map");
	var pointerStyle = isBgMap ? "pointer-events:none;" : "";
	container.innerHTML = '<iframe title="Localização Focagem" src="https://maps.google.com/maps?q=Rua%20General%20Ferreira%20Martins%208,%201495-137%20Alg%C3%A9s&t=m&z=15&output=embed&iwloc=near" width="100%" height="100%" frameborder="0" style="border:0;width:100%;height:100%;display:block;filter:grayscale(80%) invert(90%) contrast(85%) hue-rotate(180deg);' + pointerStyle + '" allowfullscreen loading="lazy"></iframe>';
}

function Menu_Selecionado()
{
	if (window.innerWidth <= 960) {
		$('.sel_menu').hide();
		return;
	}
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
