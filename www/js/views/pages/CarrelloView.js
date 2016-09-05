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
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 134px)",
				"background-color" : "white"
			});
			$(".drag-target").css("left", "0px");

			this.collection = new Carrello();
			this.listenTo(this.collection, "change remove", this.render);
		},

		id : "carrello-view",

		// className : "i-g page",

		events : {
			"click #rimuovi-prodotto" : "rimuovi",
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa"
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
			var id = $(e.currentTarget).data("id");
			this.collection.remove(id);
		},

		decrementa : function(e) {
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto = prodotto.decrementa();
			this.collection.set(prodotto);
		},

		incrementa : function(e) {
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto = prodotto.incrementa();
			this.collection.set(prodotto);
		},

	});

	return CarrelloView;

});
