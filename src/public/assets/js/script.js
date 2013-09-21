jQuery(document).ready(function() {

	/** jQuery Tabs qui switch en accordéon pour le responsive **/
	jQuery('#tabs').easyResponsiveTabs({
         type: 'default',           
         width: 'auto',
         fit: true
    });


	/** Wizard pour les étapes du formulaire de don **/
	jQuery("#fDon").formToWizard({ 
		submitButton: 'SaveAccount',
		nextLabel: "Passer à l'étape suivante",
		prevLabel: "Retourner à l'étape précédente" 
	})


	/** Stylé les champ select **/
	jQuery('select').selectBoxIt({
		showEffect: "fadeIn",
    	showEffectSpeed: 200,
    	hideEffect: "fadeOut",
    	hideEffectSpeed: 200,
    	downArrowIcon: "icon-hand-down"
	});


	/** Pagination pour les tabs avec classement **/
	jQuery('.pagination').pajinate({
		num_page_links_to_display : 3,
		items_per_page : 6,
		nav_label_prev: 'Précédente',
		nav_label_next: 'Suivante'
	});


	/** Toggle class sur bouton Suivre dans l'accueil **/
	jQuery('.bt-suivie').click(function(){
		if(jQuery(this).hasClass('select')) {
			jQuery(this).removeClass('select');
			jQuery(this).text('Suivre');
		} else {
			jQuery(this).addClass('select');
			jQuery(this).text('Suivie');
		}
		return false;
	});


	/** Toggle class sur bouton des types de dons **/
	jQuery(".bt-gris").click(function(){
		jQuery(".bt-gris").removeClass('select');   
		jQuery(this).addClass('select');
		return false;
	});


	/** Input de datepicker où nécessaire **/
	jQuery( "#datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "/images/calendar.png",
      buttonImageOnly: true
    });


	/** Slider pour le montant désiré dans formulaire de don **/
	$s = $('#montant').slider({
		animate: true,
		value: 20,
		min: 0,
		max: 40,
		step: 5,
		range: 'min',
		slide: function(event, ui) {
			var prix = ui.value;
			var output =  prix + " $ ";
			output += "<span>(" + prix*12 + " $ par année)</span>";
			jQuery('#priceBox').html(output);
	    }
	});

	jQuery('#priceBox').html('20 $<span>(240 $ par année)</span>');
	jQuery('#priceBox').appendTo(jQuery('.ui-slider-handle'));


	/** Déplacer zone Dashboard lorsque tablette **/
	if(jQuery(window).width() < 768) {
		jQuery('#dashboard').appendTo('.admin');
	} 
	jQuery(window).resize(function(){
		if(jQuery(window).width() < 768) {
			jQuery('#dashboard').appendTo('.admin');
		} else {
			jQuery('#dashboard').insertAfter('.admin');
		}
	})


	/** Validation du formulaire de don **/
	jQuery("#fDon").validate({
		rules: {
			champPrenom: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champNom: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champAdresse: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champVille: {
				required: false,
				minlength: 2,
				maxlength: 30
			},
			champCP: {
				required: false,
				regex: "^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$"
			},
			champTelBur1: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelBur2: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelBur3: {
				required: false,
				rangelength: [4,4],
				number: true
			},
			champTelDom1: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelDom2: {
				required: false,
				rangelength: [3,3],
				number: true
			},
			champTelDom3: {
				required: false,
				rangelength: [4,4],
				number: true
			},
			champCourrielBur: {
				required: false,
				email: true
			},
			champCourrielPerso: {
				required: false,
				email: true
			}

		},
		messages: {
			champPrenom: "Au moins 2 caractère",
			champNom: "Au moins 2 caractère",
			champAdresse: "Au moins 2 caractère",
			champVille: "Au moins 2 caractère",
			champCP: "Code postal non valide",
			champTelBur1: "Numéro non valide",
			champTelBur2: "Numéro non valide",
			champTelBur3: "Numéro non valide",
			champTelDom1: "Numéro non valide",
			champTelDom2: "Numéro non valide",
			champTelDom3: "Numéro non valide",
			champCourrielBur: "Courriel non valide",
			champCourrielPerso: "Courriel non valide"
		},
		errorPlacement: function(error, element) {
			element.parent().find('.notice').text(error.text()); 
		},
		submitHandler: function() {
			alert("submitted!");
		},
		success: function(label, element){
			$(element).parent().find('.notice').addClass('valid'); 
		},
		highlight: function(element, errorClass) {
			$(element).addClass('error');
		}
	});

	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}
	);


	/** Effect actif sur le menu **/
	var url = window.location.href.toString().split(window.location.host)[1];
	jQuery('a').each(function(){
		if(jQuery(this).attr('href') == url) {
			jQuery(this).addClass('select');
		}
	});

});
