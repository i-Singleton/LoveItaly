define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var RiepilogoView = Utils.Page.extend({

		constructorName : "RiepilogoView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.riepilogo;
			document.getElementById("titolo").innerHTML = "Riepilogo";
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

	return RiepilogoView;

});
