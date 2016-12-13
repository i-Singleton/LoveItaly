define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");
	var Carrello = require("collections/Carrello");
	var CarouselView = require("views/CarouselView");

	var SchedaProdottoView = Utils.Page.extend({

		constructorName : "SchedaProdottoView",

		model : Prodotto,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.schedaProdotto;
			document.getElementById("titolo").innerHTML = "Scheda prodotto";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
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
			this.carousel = new CarouselView();

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
			this.$el.prepend(
					this.carousel.render(this.model.getImmagini()).$el
			);
			return this;
		},
		
		setQuantitaETotale : function() {
			this.$("#quantita").html(this.model.getQuantita());
			this.$("#totale").html(this.model.getTotale());
		},

		decrementa : function() {
			this.model.decrementa();
			this.setQuantitaETotale();
		},

		incrementa : function() {
			this.model.incrementa();
			this.setQuantitaETotale();
		},

		aggiungiAlCarrello : function() {
			var carrello = new Carrello();
			carrello.aggiungiProdotto(this.model);
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
