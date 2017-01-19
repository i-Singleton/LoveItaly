define(function(require) {

	var Backbone = require("backbone");
	var X2JS = require("xml2json");
	var md5 = require("md5");

	// url e api key
	var baseUrl = "http://192.168.56.101/loveitaly/api";
	// var baseUrl = "http://loveitaly.altervista.org/api";
	var apiKey = "IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";

	var Utente = Backbone.Model.extend({

		constructorName : "Utente",
		
		// lato server e' "customer"
		customer : {
			"customer" : {
				"id" : "",
				"id_default_group" : "3",
				"id_lang" : "1",
				"newsletter_date_add" : "",
				"ip_registration_newsletter" : "",
				"last_passwd_gen" : "",
				"secure_key" : "",
				"deleted" : "",
				"passwd" : "",
				"lastname" : "",
				"firstname" : "",
				"email" : "",
				"id_gender" : "",
				"birthday" : "",
				"newsletter" : "",
				"optin" : "0",
				"website" : "",
				"company" : "",
				"siret" : "",
				"ape" : "",
				"outstanding_allow_amount" : "0",
				"show_public_prices" : "0",
				"id_risk" : "0",
				"max_payment_days" : "0",
				"active" : "1",
				"note" : "",
				"is_guest" : "0",
				"id_shop" : "1",
				"id_shop_group" : "1",
				"date_add" : "",
				"date_upd" : "",
				"associations" : {
					"groups" : {
						"groups" : [ {
							"id" : "3"
						} ]
					}
				}
			}
	    },
		
		defaults : {
			id : '',
			nome : '',
			cognome : '',
			email : '',
			password : '',
			zona : '',
			recapito : '',
			registrato : '',
			loggato : ''
		},

		initialize : function() {
			this.load();
		},
		
		/**
		 * Metodo per effettuare l'accesso.
		 * Ritorna true se e' stato autenticato, altrimenti false
		 * 
		 * @return boolean
		 */
		login : function(email, password) {
			this.url = baseUrl
			+ '/customers/?io_format=JSON&filter[email]='
			+ '[' + email + ']&display=full'
			+ '&ws_key=' 
			+ apiKey;
			
			var encrypted_password = md5('7j3EQiXxwscCNaOIORd8YqmvkjfEmDVxs4EcihNJNVNyCG4bHA3ThTnk'
					+ password);
			
			var t = this;
			var logged;
			$.get(this.url)
			.done(function(response) {
				if (response.length == 0) {
					// loggato false
					logged = false;
					t.set("loggato", logged);
				} else {
					// loggato true
					if(encrypted_password == response['customers'][0]['passwd']){
						logged = true;
						t.set({
							id : response['customers'][0]['id'],
							nome : response['customers'][0]['firstname'],
							cognome : response['customers'][0]['lastname'],
							email : response['customers'][0]['email'],
							password : response['customers'][0]['passwd']
						});
						localStorage.setItem(t.constructorName, JSON.stringify(t));
						t.set("loggato", logged);
					}
				}
				return logged;
			});
		},
		
		loginAfterRegistration : function() {
			localStorage.setItem(this.constructorName, JSON.stringify(this));
		},
		
		/**
		 * Metodo per effettuare la disconnessione
		 */
		logout : function() {
			localStorage.removeItem(this.constructorName);
			this.clear();
		},
		
		/**
		 * Ritorna true se l'Utente e' loggato, altrimenti false
		 * 
		 * @return boolean
		 */
		isLogged : function() {
			if(localStorage.getItem(this.constructorName) != null)
				return true;
			return false;
		},
		
		/**
		 * Carica l'Utente
		 */
		load : function() {
			if(this.isLogged()){
				var JSONString = localStorage.getItem(this.constructorName);
				this.set(JSON.parse(JSONString));
			}
		},
		
		update : function(key, value) {
			
		},
		
		/**
		 * Effettua la registrazione di un Utente.
		 * Ritorna true se la registrazione e' avvenuta correttamente,
		 * altrimenti false
		 * 
		 * @return boolean
		 */
		registra : function() {
			return this.saveCustomer();
		},
		
		/**
		 * Ritorna true se l'indirizzo email e' disponibile (quindi non e' presente sul server),
		 * altrimenti false
		 * 
		 * @return boolean
		 */
		emailAvailable : function(email) {
			return this.customerAvailable("email", email);
		},
		
		/**
		 * Controlla se il customer esiste nel server.
		 * Ritorna true se non esiste, false se gia' esiste
		 * 
		 * @param string factory (solo email o id)
		 * @param string keyword (valore email o id)
		 * 
		 * @return boolean
		 */
		customerAvailable : function(factory, keyword) {
			if (factory == "email" && keyword.length) {
				this.url = baseUrl 
				+ '/customers/?io_format=JSON&filter'
				+ '[' + factory + ']='
				+ '[' + keyword + ']' 
				+ '&ws_key=' 
				+ apiKey;
			}
			// non si andra' a usarla, fondamentalmente
			// serve solo la factory tramite email
			if (factory == "id" && keyword.length) {
				this.url = baseUrl 
				+ '/customers/?io_format=JSON&filter'
				+ '[' + factory + ']='
				+ '[' + keyword + ']' 
				+ '&ws_key=' 
				+ apiKey;
			}
			
			this.set("email", "");
			var t = this;
			var available;
			$.get(this.url)
			.done(function(response) {
				if (response.length == 0) {
					t.set(factory, keyword);
					available = true;
				} else {
					t.set(factory, false);
					available = false;
				}
				//console.log("(ajax) email disponibile: ", t.get("email"));
				return available;
			});
		},		
		
//		getLastCustomerId : function() {
//			this.url = baseUrl
//			+ '/customers/?io_format=JSON&limit=1&sort=[id_DESC]'
//			+ '&ws_key=' 
//			+ apiKey;
//			
//			var id = null;
//			var t = this;
//			$.get(this.url, function(data_returned){
//				console.log("last id: " + JSON.stringify(data_returned));
//				t.customer = data_returned["customers"];
//				last_id = t.customer[0]["id"];
//				id = last_id + 1;
//				console.log("updated id: " + id);
//			})
//			.done(function() {
//				if(id != null && id.toString().length > 0){
//					console.log("current id: " + id);
//				    
//				    t.saveCustomer();
//				}
//			})
//			.fail(function() {
//			    //alert( "error" );
//			})
//			.always(function() {
//				//alert( "finished" );
//			});			
//		},

		/**
		 * Salva sul server il customer, dopo averlo convertito in xml
		 * 
		 * @return boolean
		 */
		saveCustomer : function() {
			this.setCustomerInfo();
			
			//console.log('customer model: ' + JSON.stringify(this.customer));
			//console.log('customer email: ' + this.customer["customer"]["email"]);			
			
			// uso il convertitore json xml
			// perche' accetta solo xml
			var x2js = new X2JS();
			var xml_customer = x2js.json2xml_str( this.customer );
			xml_customer = '<prestashop>' + xml_customer + '</prestashop>';
			
			//console.log('customer xml: ' + xml_customer);			
			
	    	this.url = baseUrl 
	    	+ '/customers/?xml=content' 
	    	+ '&ws_key='
	    	+ apiKey;
	    	
	    	this.set("registrato", "");
	    	var t = this;
	    	var salvato;
	    	$.post(this.url, xml_customer)
	    	.done(function() {
	    		salvato = true;
	    		t.set("registrato", salvato);
	    		//console.log("salvato: ", salvato);
	    		return salvato;
			})
			.fail(function() {
				salvato = false;
				t.set("registrato", salvato);
				//console.log("salvato: ", salvato);
				return salvato;
			});
		},
		
		/**
		 * Imposta le info necessarie per la registrazione
		 */
		setCustomerInfo : function() {
			this.customer["customer"]["passwd"] = this.get("password");
			this.customer["customer"]["lastname"] = this.get("cognome");
			this.customer["customer"]["firstname"] = this.get("nome");
			this.customer["customer"]["email"] = this.get("email");			
		}

	});

	return Utente;
});