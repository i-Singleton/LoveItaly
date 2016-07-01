define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCardView = require("views/ProdottoCardView");

	var HomeView = Utils.Page.extend({

		constructorName : "HomeView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.home;
			$("#titolo").html("Home");
			$("#cerca").css("display", "inline-block");
			$(document).ready(function() {
				// in base al model che associo poi alla View, limito il ciclo
				for (i = 0; i < 3; i++) {
					var prodottoSX = new ProdottoCardView();
					var prodottoDX = new ProdottoCardView();
					$("#home-col-sx").append(prodottoSX.getTemplate());
					$("#home-col-dx").append(prodottoDX.getTemplate());
				}
			});
		},

		// id : "home",
		// className : "i-g page",

		events : {
		// "tap #goToMap" : "goToMap"
		},

		render : function() {
			$(this.el).html(this.template());
			// this.el.innerHTML = this.template({});
			return this;
		},

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return HomeView;

});
