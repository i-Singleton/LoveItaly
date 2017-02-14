define(function(require) {

	var Backbone = require("backbone");
	var Azienda = require("models/Azienda");
	
	var ListaCategorie = Backbone.Collection.extend({

		constructorName : "ListaAziende",

		model : Azienda,
		
		initialize : function() {
			
		},
		
		fetchSuccess: function (collection, response) {
	        var array = response['manufacturers'];
	        var res = [];
	    	for(var i = 0; i < array.length; i++){
	    		var azienda = new Azienda();
	    		azienda.set({
	    			id : array[i]['id'],
	    			nome : array[i]['name'],
	    			img : window.baseUrl 
	    					+ '/images/manufacturers/'
	    					+ array[i]['id']
	    					+ '?&ws_key='
	    					+ window.apiKey
	    		});
	    		if(azienda.get("id") != 13 && azienda.get("id") != 14)
	    			res.push(azienda);
	    	}
	    	collection.reset();
	    	collection.set(res);
	    },

	    fetchError: function (collection, response) {
	    	//console.log('fetch error');
	    },
	    
	    /**
	     * Metodo per recuperare le Categorie dal server
	     */
	    getResult : function() {
			this.url = window.baseUrl 
			+ '/manufacturers/?io_format=JSON&display=[id,name]'
			+ '&ws_key=' 
			+ window.apiKey;
	    	this.fetch({
	    		success: this.fetchSuccess,
	    		error: this.fetchError
	    	});	    	
	    }

	});

	return ListaCategorie;
});