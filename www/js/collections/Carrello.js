define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	var Carrello = Backbone.Collection.extend({

		constructorName : "Carrello",

		model : Prodotto,

		initialize : function() {
			// viene richiamato il metodo carica
		},

		// metodo per salvare lo stato corrente del Carrello
		salva : function() {
			// se contiene qualcosa, allora salva lo stato
		},

		// metodo per caricare l'ultimo stato del Carrello
		carica : function() {
			// se contiene qualcosa, allora carica lo stato
		},

	});

	return Carrello;
});