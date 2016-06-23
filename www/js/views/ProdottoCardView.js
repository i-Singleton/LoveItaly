define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var ProdottoCardView = Backbone.View.extend({

		constructorName : "ProdottoCardView",

		// id : "prodottoCard",

		events : {
		// "tap #nav1": "myView",
		// "tap #nav2": "map"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoCard;
			// this.on("inTheDOM", this.rendered);
			// bind the back event to the goBack function
			// document.getElementById("back").addEventListener("back",
			// this.goBack(), false);
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		},

		getTemplate : function(model) {
			// opzionalmente passo il model che poi passo, come array JSON a
			// template({json})
			this.el.innerHTML = this.template({});
			return this.el;
		},

		// generic go-back function
		goBack : function() {
			// window.history.back();
		}

	});

	return ProdottoCardView;

});