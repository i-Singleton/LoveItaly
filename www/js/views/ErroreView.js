define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var ErroreView = Backbone.View.extend({

		constructorName : "ErroreView",

		// model : myModel,

		tagName : "div",

		id : "errore-view",

		className : "center-align",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.errore;
		},

		render : function(string) {
			var params;
			if (string == "risultato") {
				params = {
					url : "img/nessun-risultato.png",
					testo : "Nessun risultato"
				}
			} else if (string == "connessione") {
				params = {
					url : "img/nessuna-connessione.png",
					testo : "Connessione dati assente"
				}
			}
			// load the template
			this.el.innerHTML = this.template(params);
			if (string == "connessione")
				$("#content").empty().append(this.$el);
			return this;
		},
		
		clear : function() {
			$("#content").empty();
		}

	});

	return ErroreView;

});