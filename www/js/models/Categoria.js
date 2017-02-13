define(function(require) {

	var Backbone = require("backbone");

	var Categoria = Backbone.Model.extend({

		constructorName : "Categoria",

		defaults : {
			id : '',
			nome : ''
		},
		
		/**
		 * Salva la Categoria in locale
		 * 
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica la Categoria da locale
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

	return Categoria;
});