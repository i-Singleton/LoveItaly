define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var OrdiniView = Utils.Page.extend({

		constructorName : "OrdiniView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.ordini;
			document.getElementById('titolo').innerHTML = "Ordini";
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

	return OrdiniView;

});
