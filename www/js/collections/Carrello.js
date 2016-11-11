define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	var Carrello = Backbone.Collection.extend({

		constructorName : "Carrello",

		model : Prodotto,

		initialize : function() {
			this.carica();
		},

		// metodo per salvare (e aggiornare) lo stato corrente del Carrello
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		// metodo per caricare l'ultimo stato del Carrello
		carica : function() {
			// se contiene qualcosa, allora carica lo stato
			var carrelloJSONString = null;
			if((carrelloJSONString = localStorage.getItem(this.constructorName)) != null){
				this.set(JSON.parse(carrelloJSONString));				
			}				
			return this;
		},

		setProdotto : function(prodotto) {
			this.set(prodotto);
			this.salva();
		},
		
		rimuoviProdotto : function(prodotto) {
			this.remove(prodotto);
			this.salva();
		},

		getTotale : function() {
			var totale = 0;
			this.each(function(item) {
				totale += item.get("totale");
			});
			return parseFloat(totale).toFixed(2);
		}

	});

	return Carrello;
});