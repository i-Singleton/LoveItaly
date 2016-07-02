define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var PreloaderCircolareView = Backbone.View.extend({

		constructorName : "PreloaderCircolareView",

		id : "preloader-circolare-container",

		className : "cover-full",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.preloaderCircolare;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			$("#content").append(this.el);
			setTimeout(function() {
				$("#preloader-circolare").fadeOut();
				$("#preloader-circolare-container").remove();
			}, 1000);
			return this;
		}

	});

	return PreloaderCircolareView;

});