define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");
	var Carrello = require("collections/Carrello");

	var SchedaProdottoView = Utils.Page.extend({

		constructorName : "SchedaProdottoView",

		model : Prodotto,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.schedaProdotto;
			document.getElementById("titolo").innerHTML = "Scheda prodotto";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "white"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			this.model = new Prodotto();
			this.model.carica();
			this.listenTo(this.model, "change", this.render);

		},

		id : "scheda-prodotto-view",

		// className : "",

		events : {
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa",
			"click #aggiungi-al-carrello" : "aggiungiAlCarrello"
		},

		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			// initialize del carousel di immagini, secondo la libreria
			$(document).ready(function() {
				$('.carousel.carousel-slider').carousel({
					full_width : true,
					indicators : true
				});
			});
			return this;
		},

		decrementa : function() {
			this.model.decrementa();
		},

		incrementa : function() {
			this.model.incrementa();
		},

		aggiungiAlCarrello : function() {
			var carrello = new Carrello();
			carrello.setProdotto(this.model);
			/**
			 * "html embedded" in questo punto perche' cosi' 
			 * impone la libreria per il componente Toast
			 */ 
			var toastContent = 'Aggiunto al carrello <i class="material-icons left">check</i>';
			Materialize.toast(toastContent, 3000);
		}

	});

	return SchedaProdottoView;

});
