define(function(require) {

	var Backbone = require("backbone");

	var Azienda = Backbone.Model.extend({

		constructorName : "Azienda",

		defaults : {
			id : '',
			nome : '',
			img : ''
		},
		
		/**
		 * Salva l'Azienda in locale
		 * 
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica l'Azienda da locale
		 * 
		 * @return this
		 */
		carica : function() {
			var prodottoJSONString = null;
			if((prodottoJSONString = localStorage.getItem(this.constructorName)) != null){
				this.set(JSON.parse(prodottoJSONString));				
			}
			return this;
		},

	});

	return Azienda;
});