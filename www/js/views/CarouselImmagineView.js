define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var CarouselImmagineView = Backbone.View.extend({

		constructorName : "CarouselImmagineView",
		
		// model : Prodotto,
		
		tagName: "div",

		// id : "prodottoCard",
		
		className : "carousel-item",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.carouselImmagine;
		},

		render : function(url_immagine) {
			// load the template
			this.el.innerHTML = this.template();
			this.$el.css('background-image', 'url(' + url_immagine + ')');
			return this;
		}

	});

	return CarouselImmagineView;

});