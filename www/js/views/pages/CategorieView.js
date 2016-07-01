define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var CategorieView = Utils.Page.extend({

		constructorName : "CategorieView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.categorie;
			document.getElementById('titolo').innerHTML = "Categorie";
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

	return CategorieView;

});
