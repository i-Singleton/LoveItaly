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
			$("#main").append(this.el);
			return this;
		},

		trasparente : function() {
			this.$el.css("background-color", "rgba(220, 220, 220, 0.2)");
			return this;
		},

		rimuovi : function() {
			// imposto block per eventuali precedenti fadeOut che impostano none
			this.$el.css("display", "block");
			var t = this;
			setTimeout(function() {
				t.$el.fadeOut(250, function() {
					t.$el.remove();
				});
			}, 1000);
		}

	});

	return PreloaderCircolareView;

});