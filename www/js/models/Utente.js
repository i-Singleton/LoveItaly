define(function(require) {

	var Backbone = require("backbone");
	var X2JS = require("xml2json");
	var md5 = require("md5");

	var Utente = Backbone.Model.extend({

		constructorName : "Utente",
		
		// Lato server e' "customer"
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
			password_oscurata : '',
			lista_citta : [
				'Scegli una città',
				'Castel Frentano (CH)',
				'Fossacesia (CH)',
				'Frisa (CH)',
				'Lanciano (CH)',
				'Mozzagrogna (CH)',
				'Ortona (CH)',
				'Rocca San Giovanni (CH)',
				'Santa Maria Imbaro (CH)',
				'San Vito Chietino (CH)',
				'Treglio (CH)',
			],
			citta : 0,
			indirizzo : '',
			pagamento : 'Pagamento in contrassegno',
			registrato : '',
			loggato : ''
		},

		initialize : function() {
			// rimuove l'eventuale guest residuo
			this.removeGuest();
			this.load();
		},
		
		/**
		 * Metodo per effettuare l'accesso.
		 * Ritorna true se e' stato autenticato, altrimenti false
		 * 
		 * @return boolean
		 */
		login : function(email, password) {			
			this.url = window.baseUrl
			+ '/customers/?io_format=JSON&filter[email]='
			+ '[' + email + ']&display=full'
			+ '&ws_key=' 
			+ window.apiKey;
			
			var encrypted_password = md5(window.encryptionKey + password);
			
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
						t.clear();
						t.set({
							id : response['customers'][0]['id'],
							nome : response['customers'][0]['firstname'],
							cognome : response['customers'][0]['lastname'],
							email : response['customers'][0]['email'],
							password : response['customers'][0]['passwd']
						});
						t.setPasswordOscurata(password.length);
						localStorage.setItem(t.constructorName, JSON.stringify(t));
						t.set("loggato", logged);
					}
				}
				return logged;
			});
		},
		
		loginAfterRegistration : function() {
			var password = this.get("password");
			var encrypted_password = md5(window.encryptionKey + password);
			this.set("password", encrypted_password);
			this.setPasswordOscurata(password.length);
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
			}else{
				var JSONString = sessionStorage.getItem("Guest");
				this.set(JSON.parse(JSONString));
			}
		},
		
		/**
		 * Aggiorna i dati dell'Utente dopo modifiche in Profilo o Riepilogo
		 */
		update : function() {
			if(this.isLogged())
				localStorage.setItem(this.constructorName, JSON.stringify(this));
			else
				sessionStorage.setItem("Guest", JSON.stringify(this));
		},
		
		/**
		 * Rimuove l'utente Guest
		 */
		removeGuest : function() {
			sessionStorage.removeItem("Guest");
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
				this.url = window.baseUrl 
				+ '/customers/?io_format=JSON&filter'
				+ '[' + factory + ']='
				+ '[' + keyword + ']' 
				+ '&ws_key=' 
				+ window.apiKey;
			}
			// non si andra' a usarla, fondamentalmente
			// serve solo la factory tramite email
			if (factory == "id" && keyword.length) {
				this.url = window.baseUrl 
				+ '/customers/?io_format=JSON&filter'
				+ '[' + factory + ']='
				+ '[' + keyword + ']' 
				+ '&ws_key=' 
				+ window.apiKey;
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
				return available;
			});
		},

		/**
		 * Salva sul server il customer, dopo averlo convertito in xml
		 * 
		 * @return boolean
		 */
		saveCustomer : function() {
			this.setCustomerInfo();
			
			// uso il convertitore json xml
			// perche' accetta solo xml
			var x2js = new X2JS();
			var xml_customer = x2js.json2xml_str( this.customer );
			xml_customer = '<prestashop>' + xml_customer + '</prestashop>';
			
			this.url = window.baseUrl 
	    	+ '/customers/?xml=content' 
	    	+ '&ws_key='
	    	+ window.apiKey;
	    	
	    	this.set("registrato", "");
	    	var t = this;
	    	var salvato;
	    	$.post(this.url, xml_customer)
	    	.done(function() {
	    		salvato = true;
	    		t.set("registrato", salvato);
	    		return salvato;
			})
			.fail(function() {
				salvato = false;
				t.set("registrato", salvato);
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
		},
		
		setPasswordOscurata : function(length) {
			var stringa_oscurata = "";
			for(var i = 0; i < length; i++)
				stringa_oscurata = stringa_oscurata + "*"; 
			this.set("password_oscurata", stringa_oscurata);
		}

	});

	return Utente;
});