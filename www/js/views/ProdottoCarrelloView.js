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

		/**
		 * Se non e' disponibile l'immagine o si verifica un errore,
		 * mostra un'immagine di errore da locale
		 */
		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			this.$("img").on('error', function(e){
				$(e.currentTarget).attr("src", "img/prodotto-errore.png");
			});
			return this;
		}

	});

	return ProdottoCarrelloView;

});