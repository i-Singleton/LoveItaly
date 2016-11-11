define(function(require) {

	var Backbone = require("backbone");

	var Categoria = Backbone.Model.extend({

		constructorName : "Categoria",

		defaults : {
			id : '',
			nome : ''
		},
		
		/**
		 * Salva la Categoria nel db locale
		 * 
		 */
		salva : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},

		/**
		 * Carica la Categoria dal db locale
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