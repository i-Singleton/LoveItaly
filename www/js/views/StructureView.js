define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var StructureView = Backbone.View.extend({

		constructorName : "StructureView",

		id : "main",

		events : {
			"click #menu-list a" : "waitAndHideMenu",
			"click #menu-accedi a" : "hideAndDisableMenu",
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.structure;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			return this;
		},

		/**
		 * 
		 * Metodo esclusivamente per questioni di performance: si elimina del
		 * tutto il lag, grazie a un'attesa totalmente impercettibile
		 * all'utente, nonche' migliora il comfort visivo.
		 * 
		 * un decimo di secondo
		 * 
		 */
		waitAndHideMenu : function() {
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
			}, 100);
		},

		hideAndDisableMenu : function() {
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
				$(".drag-target").css("left", "-10px");
			}, 100);
		},

	});

	return StructureView;

});