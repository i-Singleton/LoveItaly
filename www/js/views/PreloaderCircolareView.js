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
			//$("#content").css("display", "none");
			$("#main").append(this.el);
			setTimeout(function() {
				$("#preloader-circolare").fadeOut();
				$("#preloader-circolare-container").remove();
				//$("#content").css("display", "block");
			}, 1000);
			return this;
		},
		
		trasparente : function() {
			$(this).css("background-color", "rgba(220, 220, 220, 0.2)");
			return this;
		}

	});

	return PreloaderCircolareView;

});