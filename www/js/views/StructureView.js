define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var StructureView = Backbone.View.extend({

		constructorName : "StructureView",

		id : "main",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.structure;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		}

	});

	return StructureView;

});