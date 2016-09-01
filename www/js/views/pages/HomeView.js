define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCardView = require("views/ProdottoCardView");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var HomeView = Utils.Page.extend({

		constructorName : "HomeView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.home;
			$("#titolo").html("Home");
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "white"
			});
			$(".drag-target").css("left", "0px");
			// $(document).ready(function() {
			// // in base al model che associo poi alla View, limito il ciclo
			// for (i = 0; i < 3; i++) {
			// var prodottoSX = new ProdottoCardView();
			// var prodottoDX = new ProdottoCardView();
			// $("#home-col-sx").append(prodottoSX.getTemplate());
			// $("#home-col-dx").append(prodottoDX.getTemplate());
			// }
			// });
		},

		id : "home-view",

		// className : "i-g page",

		events : {},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});

			// carico il preloader per il contenuto
			var spinner = new PreloaderCircolareView();
			spinner.render();

			$(document).ready(function() {
				// in base al model che associo poi alla View, limito il ciclo
				for (i = 0; i < 3; i++) {
					var prodottoSX = new ProdottoCardView();
					var prodottoDX = new ProdottoCardView();
					$("#home-col-sx").append(prodottoSX.getTemplate());
					$("#home-col-dx").append(prodottoDX.getTemplate());
				}
			});

			return this;
		},
	});

	return HomeView;

});
