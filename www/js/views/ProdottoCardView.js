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

	return ProdottoCardView;

});