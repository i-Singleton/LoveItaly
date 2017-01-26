define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var CarouselImmagineView = require("views/CarouselImmagineView");

	var CarouselView = Backbone.View.extend({

		constructorName : "CarouselView",

		// model : Prodotto,

		tagName : "div",

		// id : "prodottoCard",

		className : "carousel carousel-slider center",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.carousel;
			this.$el.attr("data-indicators", "true");
		},

		render : function(array_url_immagini) {
			// load the template
			this.el.innerHTML = this.template();

			for (var i = 0; i < array_url_immagini.length; i++){
				var carouselImmagineView = new CarouselImmagineView();
				this.$el.append(carouselImmagineView.render(array_url_immagini[i]).$el);
			}

			// initialize del carousel di immagini, secondo la libreria
			$(document).ready(function() {
				$('.carousel.carousel-slider').carousel({
					full_width : true,
					indicators : true
				});
			});

			return this;
		}

	});

	return CarouselView;

});