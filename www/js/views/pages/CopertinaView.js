define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var CopertinaView = Utils.Page.extend({

		constructorName : "CopertinaView",

		// model : MyModel,

		// id : "",
		
		// className : "",
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.copertina;
			
			$("#content").empty();
		},

		events : {},

		render : function() {
			$(this.el).html(this.template());
			return this;
		}
		
	});

	return CopertinaView;

});
