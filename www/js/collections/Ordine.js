define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	/*
	 * Ordine è inteso per: 
	 * 
	 * 	- 	Salvare lo stato dell'ordine attuale, che conincide con
	 * 		il carrello 
	 * 	-	Qualcosa così: Ordine.salva(carrello.getProdotti()) 
	 * 	-	Lo fa il carrello
	 * 
	 */
	var Ordine = Backbone.Collection.extend({

		constructorName : "Ordine",

		model : Prodotto,

		// initialize ha la valenza di un costruttore
		initialize : function() {
			// non inizializza niente
		},

		/**
		 * Salva l'ordine nel db locale
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
		
		/**
		 * Carica un ordine nel db locale
		 */
		salva : function(id_ordine) {
			/* API JS o jQ che richiama 
			 * il db locale per effettuare il salvataggio
			 */
			
			/* 	-	salvare la data e l'id (auto-increment)
			 * 	-	ogni Prodotto relativo a quest'ordine, ha questo id_ordine
			 * 	-	richiamare qualcosa così: foreach -> Prodotto.salva(id_ordine)
			 */
		},

	});

	return Ordine;
});