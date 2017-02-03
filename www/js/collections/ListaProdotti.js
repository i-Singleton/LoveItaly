define(function(require) {

	var Backbone = require("backbone");
	var $ = require("jquery");
	var Prodotto = require("models/Prodotto");
	
	var ListaProdotti = Backbone.Collection.extend({

		constructorName : "ListaProdotti",

		model : Prodotto,
		
		limit : 1,
		
		initialize : function() {
			
		},
		
		fetchSuccess: function (collection, response) {
	        //console.log('Collection fetch success', response);
	        var array = response['products'];
	        var res = [];
	        if (response.length == 0) {
	        	collection.reset();
		    	collection.set(res);
	        } else {
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
			    			var url = window.baseUrl
			    			+ '/images/products'
		    				+ '/' + id_prodotto
			    			+ '/' + id_immagine
				    		+ '/?&ws_key=' 
							+ window.apiKey;
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
		    			immagine_default : window.baseUrl
		    				+ '/images/products'
		    				+ '/' + array[i]['id']
			    			+ '/' + array[i]['id_default_image']
				    		+ '/?&ws_key=' 
							+ window.apiKey,
						descrizione : $(array[i]['description']).text(),
						immagini : immagini
		    		});
		    		if(prodotto.get("id") != 64)
		    			res.push(prodotto);
		    	}
		    	collection.reset();
		    	collection.set(res);
	        }
	        //console.log('Collection models: ', collection.models);
	    },

	    fetchError: function (collection, response) {
	    	//console.log('fetch error');
	    },
	    
	    getResult : function(factory, keyword) {
	    	if(factory == "Cerca" && keyword.length){
				this.url = window.baseUrl 
				+ '/search/?io_format=JSON&language=1&display=full&orderby=position&orderway=desc&query='
				+ keyword
				+ '&ws_key=' 
				+ window.apiKey;
			}else
			if(factory == "Home"){
				this.url = window.baseUrl 
				+ '/products/?io_format=JSON&display=full&orderby=position&orderway=desc'
				+ '&limit=';
				if(this.limit > 1){
					this.url = this.url 
					+ (this.limit*10) + ',10';
				}else if(this.limit == 1){
					this.url = this.url 
					+ '10';
				}
				this.limit++;
				this.url = this.url 
				+ '&ws_key=' 
				+ window.apiKey;
			}else
			if(factory == "Categorie" && keyword.length){
				var id = keyword;
				this.url = window.baseUrl 
				+ '/products/?io_format=JSON&display=full'
				+ '&filter[id_category_default]='
				+ id
				+ '&ws_key=' 
				+ window.apiKey;
			}
	    	this.fetch({
	    		success: this.fetchSuccess,
	    		error: this.fetchError
	    	});	    	
	    }

	});

	return ListaProdotti;
});