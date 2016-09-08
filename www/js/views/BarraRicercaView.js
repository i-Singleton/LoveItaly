define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var BarraRicercaView = Backbone.View.extend({

		constructorName : "BarraRicercaView",

		id : "barra-ricerca-view",

		events : {
			"click #barra-ricerca" : "focusInput",
			"blur #barra-ricerca" : "blurInput",
			"click #icona-chiudi" : "resetInput"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.barraRicerca;
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			return this;
		},

		getTemplate : function(model) {
			this.el.innerHTML = this.template({});
			return this.el;
		},

		focusInput : function(event) {
			$("#barra-ricerca input").focus();
			$("#barra-ricerca i").css("color", "white");
			$("#barra-ricerca .input-field").css("border-color", "white");
			$("#barra-ricerca").css("background-color", "#4caf50");
		},

		blurInput : function(event) {
			$("#barra-ricerca i").css("color", "#e9e9e9");
			$("#barra-ricerca .input-field").css("border-color", "#e9e9e9");
			$("#barra-ricerca").css("background-color", "unset");
		},

		resetInput : function(event) {
			$("#barra-ricerca input").val("");
		}

	});

	return BarraRicercaView;

});