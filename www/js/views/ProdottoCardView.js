define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var ProdottoCardView = Backbone.View.extend({

		constructorName : "ProdottoCardView",

		// id : "prodottoCard",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCard;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		}

	});

	return ProdottoCardView;

});