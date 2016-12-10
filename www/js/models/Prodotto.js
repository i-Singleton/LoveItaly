define(function(require) {

	var Backbone = require("backbone");

	var Prodotto = Backbone.Model.extend({

		constructorName : "Prodotto",

		defaults : {
			id : '',
			nome : '',
			azienda : '',
			quantita : '',
			prezzo : '',
			totale : '',
			disponibilita : '',
			img : '',
			descrizione : ''
		},

		initialize : function() {
			// 
			this.set({
				totale : this.getTotale()
			});
		},

		/**
		 * Salva il Prodotto nel db locale
		 * 
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica il Prodotto dal db locale
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

		setQuantitaETotale : function(quantita) {
			this.set("quantita", quantita);
			this.set({
				totale : this.getTotale()
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