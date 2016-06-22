define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	/*
	 * StoricoOrdini è inteso per: 
	 * 
	 * 	-	caricare lo storico degli ordini secondo
	 * 		filtri per data, per la View degli Ordini
	 * 
	 */
	var StoricoOrdini = Backbone.Collection.extend({

		constructorName : "StoricoOrdini",

		model : Prodotto,

		initialize : function() {
			// caricare gli ultimi tot. Ordini
			// l'ultimo ordine in cima in evidenza
		},

		carica : function() {
			// politiche di caricamento qui
			// oppure più metodi di caricamento nella classe
		},

	});

	return StoricoOrdini;
});