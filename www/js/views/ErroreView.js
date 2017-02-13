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

		/**
		 * In base alla stringa passata:
		 * 
		 * - risultato
		 * - carrello
		 * - connessione
		 * 
		 * renderizza i corrispondenti immagini e messaggi testuali
		 */
		render : function(string) {
			var params;
			if (string == "risultato") {
				params = {
					url : "img/nessun-risultato.png",
					testo : "Nessun risultato"
				}
			} else if (string == "carrello") {
				params = {
					url : "img/nessun-risultato.png",
					testo : "Il carrello è vuoto"
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