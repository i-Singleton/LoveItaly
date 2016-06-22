define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var HomeView = Utils.Page.extend({

		constructorName : "HomeView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.home;
			document.getElementById('titolo').innerHTML = "Home";
		},

		// id : "home",
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

	return HomeView;

});
