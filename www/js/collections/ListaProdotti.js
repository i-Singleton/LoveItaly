define(function(require) {

	var Backbone = require("backbone");
	var Prodotto = require("models/Prodotto");

	var ListaProdotti = Backbone.Collection.extend({

		constructorName : "ListaProdotti",

		model : Prodotto,
		
		initialize : function() {
			
		},
		
		getResult : function(factory, keyword) {
			var baseUrl = "http://192.168.56.101/loveitaly/api";
//			var baseUrl = "http://loveitaly.altervista.org/api";
			
			var apiKey = "IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";
			
			var urlRequest = "";
			if(factory == "Cerca" && keyword.length){
				urlRequest = baseUrl 
				+ '/search/?io_format=JSON&language=1&display=full&orderby=position&orderway=desc&query='
				+ keyword
				+ '&ws_key=' 
				+ apiKey;
			}else
			if(factory == "Home"){
				urlRequest = baseUrl 
				+ '/products/?io_format=JSON&display=full&orderby=position&orderway=desc'
				+ '&limit='
				+ '8'
				+ '&ws_key=' 
				+ apiKey;
			}else
			if(factory == "Categorie"){
				urlRequest = baseUrl 
				+ '/categories/?io_format=JSON&display=full'
				+ '&ws_key=' 
				+ apiKey;
			}
			
			// chiamata ajax
			var t = this;
			$.ajax({
			    url: urlRequest,
			    async: true,
			    type: "GET",
			    dataType: 'json',
			    //beforeSend: autenticazione,

			    success: function (result) {
			    	t.reset();
			    	var array = result['products'];
			    	for(var i = 0; i < array.length; i++){
			    		var prodotto = new Prodotto();
			    		prodotto.set({
			    			id : array[i]['id'],
			    			nome : array[i]['name'],
			    			azienda : array[i]['manufacturer_name'],
			    			prezzo : array[i]['price'],
			    			disponibilita : array[i]['quantity']
			    		});
			    		t.push(prodotto);
			    	}
			    },
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
			    	console.log('Errore chiamata ajax!' +
			    				'\nReponseText: ' + XMLHttpRequest.responseText +
			    				'\nStatus: ' + textStatus +
			    				'\nError: ' + errorThrown);
			    	t = false;
			    }
			});			
		}

	});

	return ListaProdotti;
});