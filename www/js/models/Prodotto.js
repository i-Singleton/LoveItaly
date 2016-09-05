define(function(require) {

	var Backbone = require("backbone");

	var Prodotto = Backbone.Model.extend({

		constructorName : "Prodotto",

		defaults : {
			id : '',
			nome : '',
			quantita : '',
			prezzo : '',
			totale : ''
		},

		initialize : function() {
			// 
			this.set({
				totale : this.get("quantita") * this.get("prezzo")
			});
		},

		/**
		 * Salva il Prodotto nel db locale
		 * 
		 * @param id_ordine
		 */
		salva : function(id_ordine) {
			/*
			 * API JS o jQ che richiama il db locale per effettuare il
			 * salvataggio
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

		setQuantitaETotale : function(quantita) {
			this.set("quantita", quantita);
			this.set({
				totale : this.get("quantita") * this.get("prezzo")
			});
		},
		
		incrementa : function() {
			var q = this.get("quantita");
			if (q > 0) {
				q++;
				this.setQuantitaETotale(q);
			}
		},
		
		decrementa : function() {
			var q = this.get("quantita");
			if (q > 1) {
				q--;
				this.setQuantitaETotale(q);
			}
		}

	});

	return Prodotto;
});