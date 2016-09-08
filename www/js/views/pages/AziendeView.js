define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var AziendeView = Utils.Page.extend({

		constructorName : "AziendeView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.aziende;
			document.getElementById("titolo").innerHTML = "Aziende";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "#f5f5f5"
			});
			$(".drag-target").css("left", "0px");
		},

		// id : "myview",
		// className : "i-g page",

		events : {
		// "tap #goToMap" : "goToMap"
		},

		render : function() {
			$(this.el).html(this.template());
			return this;
		},

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return AziendeView;

});
