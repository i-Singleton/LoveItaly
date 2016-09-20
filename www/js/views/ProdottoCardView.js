define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

	var ProdottoCardView = Backbone.View.extend({

		constructorName : "ProdottoCardView",
		
		model : Prodotto,
		
		tagName: "a",

		// id : "prodottoCard",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCard;
			this.$el.attr("href", "#schedaProdotto");
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return ProdottoCardView;

});