define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var CarrelloView = Utils.Page.extend({

		constructorName : "CarrelloView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.carrello;
			document.getElementById("titolo").innerHTML = "Carrello";
			$("#cerca").css("display", "inline-block");
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

	return CarrelloView;

});
