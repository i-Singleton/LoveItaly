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

		/**
		 * Lo renderizza in automatico in cover-full per le pagine
		 */
		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			$("#content").prepend(this.el);
			return this;
		},
		
		/**
		 * Alternativo al render, usato per il caricamento di piu' elementi
		 * (es. nella Home)
		 */
		renderForMoreItem : function() {
			// load the template
			this.el.innerHTML = this.template({});
			var t = this;
			setTimeout(function() {
				t.$el.css("position", "relative");
				t.$el.css("top", "0");
				t.$("#preloader-circolare").removeClass("top50");
			}, 1000);
			return this;
		},

		/**
		 * Concatenabile con i render per aggiungere una trasparenza
		 * (es. nel Login)
		 */
		trasparente : function() {
			this.$el.css("background-color", "rgba(220, 220, 220, 0.2)");
			return this;
		},

		/**
		 * Rimuove il Preloader Circolare
		 */
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