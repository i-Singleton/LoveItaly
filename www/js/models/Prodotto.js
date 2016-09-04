define(function(require) {

	var Backbone = require("backbone");

	var Prodotto = Backbone.Model.extend({

		constructorName : "Prodotto",

		defaults : {
			id : '',
			nome : '',
			quantita : '2'
		},

		initialize : function() {
			// 
		},
		
		/**
		 * Salva il Prodotto nel db locale
		 * 
		 * @param id_ordine
		 */
		salva : function(id_ordine) {
			/* API JS o jQ che richiama 
			 * il db locale per effettuare il salvataggio
			 */
			
			// salvare l'id (auto-increment), il nome, l'id_ordine
		},
		
		/**
		 * Restituisce i Prodotti relativi a un Ordine dal db locale
		 * 
		 * @param id_ordine
		 * 
		 * @return Prodotti
		 */
		carica : function(id_ordine) {
			//
		},

	});

	return Prodotto;
});