define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	var Carrello = Backbone.Collection.extend({

		constructorName : "Carrello",

		model : Prodotto,

		initialize : function() {
			// viene richiamato il metodo carica
//			var a = new Prodotto({
//				id : '1',
//				nome : '',
//				quantita : '5',
//				prezzo : '10',
//				totale : ''
//			});
//			var b = new Prodotto({
//				id : '2',
//				nome : '',
//				quantita : '2',
//				prezzo : '10',
//				totale : ''
//			});
//			var c = new Prodotto({
//				id : '3',
//				nome : '',
//				quantita : '1',
//				prezzo : '10',
//				totale : ''
//			});
//			this.add([ a, b, c ]);
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
				// totale += parseFloat(model.get("totale"));
			});
			return totale;
			// return totale.toFixed(2);
		}

	});

	return Carrello;
});