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
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			// this.spinner = new PreloaderCircolareView();
		},

		id : "home-view",

		// className : "",

		events : {},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});

			// carico il preloader per il contenuto
			// this.spinner.render();

			for (i = 0; i < 3; i++) {
				var prodottoSX = new ProdottoCardView();
				var prodottoDX = new ProdottoCardView();
				this.$("#home-col-sx").append(prodottoSX.render().$el);
				this.$("#home-col-dx").append(prodottoDX.render().$el);
			}

			return this;
		},
	});

	return HomeView;

});
