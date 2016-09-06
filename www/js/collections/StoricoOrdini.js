define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	/*
	 * StoricoOrdini è inteso per: 
	 * 
	 * 	-	caricare lo storico degli ordini secondo
	 * 		filtri per data, per la View degli Ordini
	 *  - 	Salvare lo stato dell'ordine attuale, che conincide con
	 * 		il carrello 
	 * 	-	Qualcosa così: Ordine.salva(carrello.getProdotti()) 
	 * 	-	Lo fa il carrello
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
		
		/**
		 * Salva l'ordine corrente nel db locale
		 */
		salva : function(prodotti) {
			/* API JS o jQ che richiama 
			 * il db locale per effettuare il salvataggio
			 */
			
			/* 	-	salvare la data e l'id (auto-increment)
			 * 	-	ogni Prodotto relativo a quest'ordine, ha questo id_ordine
			 * 	-	richiamare qualcosa così: foreach -> Prodotto.salva(id_ordine)
			 */
		},

	});

	return StoricoOrdini;
});