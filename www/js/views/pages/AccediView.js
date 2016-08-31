define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var AccediView = Utils.Page.extend({

		constructorName : "AccediView",

		titolo : "Accedi",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.accedi;
		},

		id : "accedi-view",

		// className : "i-g page",

		events : {
			"click #chiudi-accedi-view" : "chiudi"
		},

		render : function() {
			$(this.el).html(this.template());
			$("#statusbar").css("display", "none");
			$("#headbar").css("display", "none");
			$("#content").css({
				"background-color" : "#4caf50",
				"height" : "100%"
			});
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

	});

	return AccediView;

});
