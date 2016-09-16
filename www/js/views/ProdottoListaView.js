define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

	var ProdottoListaView = Backbone.View.extend({

		constructorName : "ProdottoListaView",

		model : Prodotto,

		// id : "prodottoLista",

		className : "card",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoLista;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return ProdottoListaView;

});