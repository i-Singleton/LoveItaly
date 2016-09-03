define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var ProdottoCarrelloView = Backbone.View.extend({

		constructorName : "ProdottoCarrelloView",

		// id : "prodottoCarrello",

		className : "card",

		events : {
			"click #rimuovi-prodotto" : "rimuovi"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCarrello;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		},

		rimuovi : function() {
			this.$el.remove();
		}

	});

	return ProdottoCarrelloView;

});