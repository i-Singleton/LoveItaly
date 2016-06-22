define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var CercaView = Utils.Page.extend({

		constructorName : "CercaView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.cerca;
			document.getElementById('titolo').innerHTML = "Cerca";
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

	return CercaView;

});
