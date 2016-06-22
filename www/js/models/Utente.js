define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({

		constructorName : "Utente",

		defaults : {
			id : '',
			nome : '',
			cognome : '',
			codice_carta : '',
			paypal_email : '',
			paypal_password : '',
			zona : '',
			recapito : ''
		},

		initialize : function() {
			// 
		},

	});

	return Utente;
});