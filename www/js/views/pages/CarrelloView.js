define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCarrelloView = require("views/ProdottoCarrelloView");
	var Carrello = require("collections/Carrello");
	var Prodotto = require("models/Prodotto");
	var ErroreView = require("views/ErroreView");

	var CarrelloView = Utils.Page.extend({

		constructorName : "CarrelloView",

		collection : Carrello,

		id : "carrello-view",

		// className : "i-g page",

		events : {
			"click #rimuovi-prodotto" : "rimuovi",
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa",
			"click .card" : "cacheProdotto"
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.carrello;
			
			$("#content").empty();
			document.getElementById("titolo").innerHTML = "Carrello";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 134px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
			
			this.collection = new Carrello();
			this.collection.carica();
			this.errore = new ErroreView();
			this.listenTo(this.collection, "add change remove", this.render);
		},

		render : function() {
			$(this.el).html(this.template({
				totale : this.collection.getTotale()
			}));
			if (this.collection.length == 0) {
				this.$("#btn-bottom-container").css("display", "none");
				$("#content").css("height", "calc(100% - 80px)");
				this.$el.append(this.errore.render("carrello").el);
			} else {
				this.$("#btn-bottom-container").css("display", "block");
				this.collection.each(function(item) {
					var prodottoCarrelloView = new ProdottoCarrelloView({
						model : item
					});
					this.$el.append(prodottoCarrelloView.render().$el);
				}, this);
			}
			return this;
		},

		/**
		 * Rimuove il Prodotto dal Carrello
		 */
		rimuovi : function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			this.collection.rimuoviProdotto(prodotto);
		},

		/**
		 * Decrementa la quantita' del Prodotto in questione
		 */
		decrementa : function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto = prodotto.decrementa();
			this.collection.aggiornaProdotto(prodotto);
		},

		/**
		 * Incrementa la quantita' del Prodotto in questione
		 */
		incrementa : function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto = prodotto.incrementa();
			this.collection.aggiornaProdotto(prodotto);
		},

		/**
		 * Salva nel db locale il prodotto per evitare una seconda richiesta
		 * superflua verso il server; e' gia' in nostro possesso il prodotto
		 */
		cacheProdotto : function(e) {
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto.salva();
		}

	});

	return CarrelloView;

});
