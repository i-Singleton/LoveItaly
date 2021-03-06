define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");
	var Carrello = require("collections/Carrello");
	var CarouselView = require("views/CarouselView");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var SchedaProdottoView = Utils.Page.extend({

		constructorName : "SchedaProdottoView",

		model : Prodotto,

		id : "scheda-prodotto-view",
		
		// className : "",
		
		events : {
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa",
			"click #aggiungi-al-carrello" : "aggiungiAlCarrello"
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.schedaProdotto;
			
			$("#content").empty();
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
			this.spinner = new PreloaderCircolareView();

		},

		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			this.spinner.render();
			this.$el.prepend(
					this.carousel.render(this.model.getImmagini()).$el
			);
			this.spinner.rimuovi();
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
			
			var toastContent = 'Aggiunto al carrello';
			Materialize.toast(toastContent, 3000);
			
			// piccola vibrazione di 125 millisecondi, 
			// come feedback sensoriale di aggiunta del prodotto
			navigator.vibrate(125);	
		}

	});

	return SchedaProdottoView;

});
