define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCarrelloView = require("views/ProdottoCarrelloView");

	var CarrelloView = Utils.Page.extend({

		constructorName : "CarrelloView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.carrello;
			document.getElementById("titolo").innerHTML = "Carrello";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 134px)",
				"background-color" : "white"
			});
			$(".drag-target").css("left", "0px");
		},

		id : "carrello-view",

		// className : "i-g page",

		events : {
		// "tap #goToMap" : "goToMap"
		},

		render : function() {
			$(this.el).html(this.template());
			for (i = 0; i < 3; i++) {
				var prodotto = new ProdottoCarrelloView();
				this.$el.append(prodotto.render().$el);
			}
			return this;
		},

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return CarrelloView;

});
