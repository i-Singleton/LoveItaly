define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Azienda = require("models/Azienda");

	var AziendaElementoView = Backbone.View.extend({

		constructorName : "AziendaElementoView",

		model : Azienda,

		tagName : "a",

		// id : "",

		// className : "",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.aziendaElemento;
			this.$el.attr("data-id", this.model.get("id"));
			this.$el.attr("href", "#prodottiAzienda/" + this.model.get("id"));
		},

		/**
		 * Se non e' disponibile l'immagine o si verifica un errore, mostra
		 * un'immagine di errore da locale
		 */
		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return AziendaElementoView;

});