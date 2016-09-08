define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var BarraRicercaView = require("views/BarraRicercaView");

	var CercaView = Utils.Page.extend({

		constructorName : "CercaView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.cerca;
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "#f5f5f5"
			});
			$(".drag-target").css("left", "0px");
		},

		// id : "",
		// className : "",

		events : {},

		render : function() {
			// Caricamento della Barra di Ricerca
			// nascondo l'icona cerca
			$("#cerca").css("display", "none");
			// carico il template della barra di ricerca
			var bar = new BarraRicercaView();
			$("#titolo").html(bar.getTemplate());
			// metto il focus sull'input
			$("#barra-ricerca input").focus();
			$("#barra-ricerca").css("background-color", "#4caf50");
			
			// comportamento di default
			$(this.el).html(this.template());
			return this;
		}

	});

	return CercaView;

});
