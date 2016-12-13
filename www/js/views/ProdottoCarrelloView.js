define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

	var ProdottoCarrelloView = Backbone.View.extend({

		constructorName : "ProdottoCarrelloView",

		model : Prodotto,

		tagName : "a",

		// id : "prodottoCarrello",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCarrello;
			this.$el.attr("href", "#schedaProdotto");
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return ProdottoCarrelloView;

});