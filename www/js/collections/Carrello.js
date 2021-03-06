define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	var Carrello = Backbone.Collection.extend({

		constructorName : "Carrello",

		model : Prodotto,

		initialize : function() {
			this.carica();
		},

		/**
		 * Salva (e aggiorna) lo stato corrente del Carrello
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica l'ultimo stato del Carrello
		 */
		carica : function() {
			// se contiene qualcosa, allora carica lo stato
			var carrelloJSONString = null;
			if ((carrelloJSONString = localStorage
					.getItem(this.constructorName)) != null) {
				this.set(JSON.parse(carrelloJSONString));
			}
			return this;
		},

		/**
		 * Svuota il Carrello e lo elimina dal db locale
		 */
		svuota : function() {
			this.reset();
			localStorage.removeItem(this.constructorName);
		},

		/**
		 * Aggiunge un Prodotto se non e' presente; ne aggiunge la quantita' se
		 * e' gia' presente
		 */
		aggiungiProdotto : function(prodotto) {
			var id = prodotto.getId();
			var prodotto_aggiornato = this.get(id);
			// se non e' presente nel carrello lo aggiunge
			if (prodotto_aggiornato == undefined) {
				this.push(prodotto);
			} else {
				var quantita = prodotto.getQuantita()
						+ prodotto_aggiornato.getQuantita();
				prodotto_aggiornato.setQuantitaETotale(quantita);
				this.push(prodotto_aggiornato, {
					merge : true
				});
			}
			this.salva();
		},

		/**
		 * Aggiorna un prodotto esistente nel Carrello
		 */
		aggiornaProdotto : function(prodotto) {
			this.push(prodotto, {
				merge : true
			});
			this.salva();
		},

		/**
		 * Rimuove un Prodotto dal Carrello e ne aggiorna lo stato chiamando il
		 * metodo per salvare
		 */
		rimuoviProdotto : function(prodotto) {
			this.remove(prodotto);
			this.salva();
		},

		/**
		 * Ritorna il prezzo totale dei Prodotti presenti nel Carrello, per uso
		 * esterno a questa classe
		 * 
		 * @return float
		 */
		getTotale : function() {
			var totale = 0;
			// selezioni tutti i totali parziali mettendoli in un array
			var array_totali_parziali = this.pluck("totale");
			for (var i = 0; i < array_totali_parziali.length; i++) {
				var totale_parziale = parseFloat(array_totali_parziali[i])
						.toFixed(2);
				// converto con l'operatore + in un numero,
				// altrimenti verrebbero trattati come stringhe
				totale = +totale + +totale_parziale;
			}
			return parseFloat(totale).toFixed(2);
		}

	});

	return Carrello;
});