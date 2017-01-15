define(function(require) {

	var Backbone = require("backbone");
	var $ = require("jquery");
	var Prodotto = require("models/Prodotto");
	
	// url e api key
	var baseUrl = "http://192.168.56.101/loveitaly/api";
//	var baseUrl = "http://loveitaly.altervista.org/api";
	var apiKey = "IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";
	var productImageBaseUrl = baseUrl + "/images/products";

	var ListaProdotti = Backbone.Collection.extend({

		constructorName : "ListaProdotti",

		model : Prodotto,
		
		initialize : function() {
			
		},
		
		fetchSuccess: function (collection, response) {
	        console.log('Collection fetch success', response);
	        var array = response['products'];
	        var res = [];
	    	for(var i = 0; i < array.length; i++){
	    		// creo un array di immagini
	    		var array_id_immagini = array[i]['associations']['images'];
	    		var immagini = [];
	    		// se c'e' piu' di un'immagine, oltre quella di default,
	    		// popolo l'array di url di immagini
	    		if(array_id_immagini != undefined && array_id_immagini.length > 1){
		    		var id_prodotto = array[i]['id'];
		    		for(var k = 0; k < array_id_immagini.length; k++){
		    			var id_immagine = array_id_immagini[k]['id'];
		    			var url = productImageBaseUrl
	    				+ '/' + id_prodotto
		    			+ '/' + id_immagine
			    		+ '/?&ws_key=' 
						+ apiKey;
		    			immagini.push(url);
		    		}
	    		}
	    		var prodotto = new Prodotto();
	    		prodotto.set({
	    			id : array[i]['id'],
	    			nome : array[i]['name'],
	    			azienda : array[i]['manufacturer_name'] || '',
	    			prezzo : parseFloat(array[i]['price']).toFixed(2),
	    			disponibilita : array[i]['available_for_order'],
	    			totale : parseFloat(array[i]['price']).toFixed(2),
	    			immagine_default : productImageBaseUrl
	    				+ '/' + array[i]['id']
		    			+ '/' + array[i]['id_default_image']
			    		+ '/?&ws_key=' 
						+ apiKey,
					descrizione : $(array[i]['description']).text(),
					immagini : immagini
	    		});
	    		if(prodotto.get("id") != 64)
	    			res.push(prodotto);
	    	}
	    	collection.reset();
	    	collection.set(res);
	    	console.log('Collection models: ', collection.models);
	    },

	    fetchError: function (collection, response) {
	    	console.log('fetch error');
	    },
	    
	    getResult : function(factory, keyword) {
	    	if(factory == "Cerca" && keyword.length){
				this.url = baseUrl 
				+ '/search/?io_format=JSON&language=1&display=full&orderby=position&orderway=desc&query='
				+ keyword
				+ '&ws_key=' 
				+ apiKey;
			}else
			if(factory == "Home"){
				this.url = baseUrl 
				+ '/products/?io_format=JSON&display=full&orderby=position&orderway=desc'
				+ '&limit='
				+ '8'
				+ '&ws_key=' 
				+ apiKey;
			}else
			if(factory == "Categorie" && keyword.length){
				var id = keyword;
				this.url = baseUrl 
				+ '/products/?io_format=JSON&display=full'
				+ '&filter[id_category_default]='
				+ id
				+ '&ws_key=' 
				+ apiKey;
			}
	    	this.fetch({
	    		success: this.fetchSuccess,
	    		error: this.fetchError
	    	});	    	
	    }

	});

	return ListaProdotti;
});