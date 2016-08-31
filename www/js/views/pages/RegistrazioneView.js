define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var RegistrazioneView = Utils.Page.extend({

		constructorName : "RegistrazioneView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.registrazione;
		},

		id : "registrazione-view",

		// className : "i-g page",

		events : {
			// "tap #goToMap" : "goToMap"
			"click #chiudi-registrazione-view" : "chiudi"
		},

		render : function() {
			$(this.el).html(this.template());
			return this;
		},

		chiudi : function() {
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"background-color" : "white",
				"height" : "calc(100% - 80px)"
			});
		}

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return RegistrazioneView;

});
