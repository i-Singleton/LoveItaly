define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

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

			this.model = new Prodotto({
				id : '1',
				nome : '',
				quantita : '1',
				prezzo : '10',
				totale : ''
			});
			this.listenTo(this.model, "change", this.render);

		},

		id : "scheda-prodotto-view",

		// className : "i-g page",

		events : {
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa",
			"click #aggiungi-al-carrello" : "aggiungiAlCarrello"
		},

		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			// this.$el.css("display", "none");
			// this.$el.fadeIn();
			// initialize dello slider di immagini
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
			// TODO - inserire un materialize toast "prodotto aggiunto"
		}

	});

	return SchedaProdottoView;

});
