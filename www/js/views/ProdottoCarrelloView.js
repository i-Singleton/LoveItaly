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

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCarrello;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return ProdottoCarrelloView;

});