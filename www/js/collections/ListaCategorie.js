define(function(require) {

	var Backbone = require("backbone");
	var Categoria = require("models/Categoria");
	
	// url e api key
	var baseUrl = "http://192.168.56.101/loveitaly/api";
//	var baseUrl = "http://loveitaly.altervista.org/api";
	var apiKey = "IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";

	var ListaCategorie = Backbone.Collection.extend({

		constructorName : "ListaCategorie",

		model : Categoria,
		
		initialize : function() {
			// ordina le Categorie per nome
			this.comparator = "nome";			
		},
		
		fetchSuccess: function (collection, response) {
	        console.log('Collection fetch success', response);
	        var array = response['categories'];
	        var res = [];
	    	for(var i = 0; i < array.length; i++){
	    		var categoria = new Categoria();
	    		categoria.set({
	    			id : array[i]['id'],
	    			nome : array[i]['name']
	    		});
	    		// pulizia della risposta dal server
	    		if(categoria.get("id") != 1 
	    			&&	categoria.get("id") != 2
	    			&&	categoria.get("id") != 31
	    			&&	categoria.get("id") != 32)
	    			res.push(categoria);
	    	}
	    	collection.reset();
	    	collection.set(res);
	    	console.log('Collection models: ', collection.models);
	    },

	    fetchError: function (collection, response) {
	    	console.log('fetch error');
	    },
	    
	    /**
	     * Metodo per recuperare le Categorie dal server
	     */
	    getResult : function() {
			this.url = baseUrl 
			+ '/categories/?io_format=JSON&display=full'
			+ '&ws_key=' 
			+ apiKey;
	    	this.fetch({
	    		success: this.fetchSuccess,
	    		error: this.fetchError
	    	});	    	
	    }

	});

	return ListaCategorie;
});