define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Carrello = require("collections/Carrello");

	var RiepilogoView = Utils.Page.extend({

		constructorName : "RiepilogoView",

		collection : Carrello,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.riepilogo;
			document.getElementById("titolo").innerHTML = "Riepilogo";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 134px)",
				"background-color" : "white"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			this.collection = new Carrello();
		},

		id : "riepilogo-view",
		// className : "i-g page",

		events : {
		// "tap #goToMap" : "goToMap"
		},

		render : function() {
			$(this.el).html(this.template({
				totale : this.collection.getTotale()
			}));
			return this;
		},

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return RiepilogoView;

});
