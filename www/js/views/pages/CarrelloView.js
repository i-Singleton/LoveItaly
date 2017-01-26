define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCarrelloView = require("views/ProdottoCarrelloView");
	var Carrello = require("collections/Carrello");
	var Prodotto = require("models/Prodotto");

	var CarrelloView = Utils.Page.extend({

		constructorName : "CarrelloView",

		collection : Carrello,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.carrello;
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
			this.listenTo(this.collection, "add change remove", this.render);
		},

		id : "carrello-view",

		// className : "i-g page",

		events : {
			"click #rimuovi-prodotto" : "rimuovi",
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa",
			"click .card" : "cacheProdotto"
		},

		render : function() {
			$(this.el).html(this.template({
				totale : this.collection.getTotale()
			}));
			this.collection.each(function(item) {
				var prodottoCarrelloView = new ProdottoCarrelloView({
					model : item
				});
				this.$el.append(prodottoCarrelloView.render().$el);
			}, this);
			return this;
		},

		rimuovi : function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			this.collection.rimuoviProdotto(prodotto);
		},

		decrementa : function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto = prodotto.decrementa();
			this.collection.aggiornaProdotto(prodotto);
		},

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
