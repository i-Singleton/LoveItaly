define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

	var ProdottoCarrelloView = Backbone.View.extend({

		constructorName : "ProdottoCarrelloView",

		model : Prodotto,

		// id : "prodottoCarrello",

		className : "card",

		events : {
			"click #rimuovi-prodotto" : "rimuovi",
			"click #decrementa-quantita" : "decrementa",
			"click #incrementa-quantita" : "incrementa"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCarrello;
			this.model = new Prodotto();
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		},

		rimuovi : function() {
			this.$el.remove();
		},

		decrementa : function() {
			var q = this.$("#quantita").html();
			if (q > 0) {
				q--;
				this.$("#quantita").html(q)
			}
			if (q == 0)
				this.rimuovi();
		},

		incrementa : function() {
			var q = this.$("#quantita").html();
			if (q > 0) {
				q++;
				this.$("#quantita").html(q)
			}
		}

	});

	return ProdottoCarrelloView;

});