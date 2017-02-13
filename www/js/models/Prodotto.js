define(function(require) {

	var Backbone = require("backbone");

	var Prodotto = Backbone.Model.extend({

		constructorName : "Prodotto",

		defaults : {
			id : '',
			nome : '',
			azienda : '',
			quantita : 1,
			prezzo : '',
			totale : '',
			disponibilita : '',
			immagine_default : '',
			descrizione : '',
			immagini : []
		},

		initialize : function() {

		},

		/**
		 * Salva il Prodotto in locale
		 * 
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica il Prodotto da locale
		 * 
		 * @return this
		 */
		carica : function() {
			var prodottoJSONString = null;
			if ((prodottoJSONString = localStorage
					.getItem(this.constructorName)) != null) {
				this.set(JSON.parse(prodottoJSONString));
			}
			this.setQuantitaETotale(1);
			return this;
		},
		
		/**
		 * Ritorna l'id
		 * 
		 * @return int
		 */
		getId : function() {
			return parseInt(this.get("id"));
		},

		/**
		 * Ritorna la quantita
		 * 
		 * @return int
		 */
		getQuantita : function() {
			return parseInt(this.get("quantita"));
		},

		/**
		 * Ritorna il prezzo con due cifre dopo la virgola
		 * 
		 * @return float
		 */
		getPrezzo : function() {
			return parseFloat(this.get("prezzo")).toFixed(2);
		},

		/**
		 * Ritorna il totale con due cifre dopo la virgola
		 * 
		 * @return float
		 */
		getTotale : function() {
			var quantita = this.getQuantita();
			var prezzo = this.getPrezzo();
			return parseFloat(quantita * prezzo).toFixed(2);
		},

		/**
		 * Ritorna l'array di url di immagini
		 * 
		 * @return array
		 */
		getImmagini : function() {
			if (this.get("immagini").length > 1) 
				return this.get("immagini");
			
			return [ this.get("immagine_default") ];
		},

		/**
		 * Metodo a cui viene passata una quantita' e aggiorna lo stato del
		 * Prodotto impostandone la quantita' e ne calcola il prezzo totale
		 * 
		 * @param quantita
		 */
		setQuantitaETotale : function(quantita) {
			this.set("quantita", quantita);
			this.set("totale", this.getTotale());
		},

		/**
		 * Incrementa la quantita' del Prodotto
		 */
		incrementa : function() {
			var q = this.getQuantita();
			if (q > 0) {
				q++;
				this.setQuantitaETotale(q);
			}
		},

		/**
		 * Decrementa la quantita' del Prodotto
		 */
		decrementa : function() {
			var q = this.getQuantita();
			if (q > 1) {
				q--;
				this.setQuantitaETotale(q);
			}
		}

	});

	return Prodotto;
});