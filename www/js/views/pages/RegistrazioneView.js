define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var RegistrazioneView = Utils.Page.extend({

		constructorName : "RegistrazioneView",

		model : Utente,
		
		form : {
			nome : null,
			cognome : null,
			email : {
				usata : null,
				valida : null,
			},
			password : null
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.registrazione;
			
			$("#content").empty();
			this.spinner = new PreloaderCircolareView();
			
			this.model = new Utente();
			this.listenTo(this.model, "change:email", this.emailUsata);
			this.listenTo(this.model, "change:registrato", this.conferma);
		},

		id : "registrazione-view",

		// className : "",

		events : {
			"click #chiudi-registrazione-view" : "chiudi",
			"focus input" : "focus",
			"click #registrati" : "registra",
			"blur #first_name" : "validaNome",
			"blur #last_name" : "validaCognome",
			"blur #email" : "validaEmail",
			"blur #password" : "validaPassword",
		},

		render : function() {
			$(this.el).html(this.template());
			$("#statusbar").css("display", "none");
			$("#headbar").css("display", "none");
			$("#content").css({
				"height" : "100%",
				"background-color" : "#4caf50"
			});
			return this;
		},

		chiudi : function() {
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
		},

		/**
		 * Quando un input e' focus, imposta lo stesso
		 * in modo tale da essere al di sopra della tastiera
		 */
		focus : function(e) {
			this.$("#logo").css("display", "none");
			var offset = $(e.currentTarget).offset().top;
			var error = 10;
			var spostamento = offset - error;
			$("#content").scrollTop(spostamento);
		},

		/**
		 * Ripristina dal metodo focus
		 */
		blur : function() {
			this.$("#logo").css("display", "block");
			$("#content").scrollTop(0);
		},		
		
		/**
		 * Controlla se la form e' valida, e poi e inoltra la registrazione
		 */
		registra : function() {
			this.blur();
			if (this.formIsValid()) {
				this.spinner.trasparente().render();				
				this.model.registra();
			}
		},
		
		/**
		 * Controlla se la registrazione e' andata a buon fine o meno
		 */
		conferma : function() {
			if (this.model.get("registrato") == true) {
				var toastContent = 'Registrazione effettuata';
				Materialize.toast(toastContent, 5000);
				Backbone.history.navigate("home", {
					trigger : true
				});
				this.model.loginAfterRegistration();
				$("#accedi").css("display", "none");
				$("#disconnetti").css("display", "block");
				$("#profilo").attr("href", "#profilo");
				$("#ordini").attr("href", "#ordini");
			} else if(this.model.get("registrato") == false) {
				var toastContent = 'Registrazione non effettuata, riprovare';
				Materialize.toast(toastContent, 5000);
			}
			this.spinner.rimuovi();
		},
		
		/**
		 * Controlla la validita' dei dati inseriti nella form
		 * 
		 * @return bool
		 */
		formIsValid : function() {
			if (	this.form.nome == true 
					&& this.form.cognome == true
					&& this.form.email.usata == false
					&& this.form.email.valida == true
					&& this.form.password == true){
				var nome = this.$("#first_name").val();
				var cognome = this.$("#last_name").val();
				var email = this.$("#email").val();
				var password = this.$("#password").val();
				
				this.model.set({
					nome : nome,
					cognome : cognome,
					email : email,
					password : password
				});
				
				return true;
			}else
				return false;
		},

		/**
		 * Controlla la validita' sintattica del dato inserito nell'input
		 * 
		 * @return bool
		 */
		validaNome : function() {
			var nome = this.$("#first_name").val();			
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(nome);
			if (correct)
				this.$("#nome-error").css("display", "none");
			else
				this.$("#nome-error").css("display", "block");
			
			return this.form.nome = correct;
		},

		/**
		 * Controlla la validita' sintattica del dato inserito nell'input
		 * 
		 * @return bool
		 */
		validaCognome : function() {
			var cognome = this.$("#last_name").val();
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(cognome);
			if (correct)
				this.$("#cognome-error").css("display", "none");
			else
				this.$("#cognome-error").css("display", "block");
			
			return this.form.cognome = correct;
		},

		/**
		 * Controlla la disponibilita' sul server della mail
		 * 
		 * @return bool
		 */
		emailUsata : function() {
			var usata;
			if(this.model.get("email") == false){
				this.$("#email-error").css("display", "none");
				this.$("#email-usata").css("display", "block");
				usata = true;
			}else{
				this.$("#email-error").css("display", "none");
				this.$("#email-usata").css("display", "none");
				usata = false;
			}
			
			return this.form.email.usata = usata;
		},
		
		/**
		 * Controlla la validita' sintattica del dato inserito nell'input
		 * 
		 * @return bool
		 */
		validaEmail : function() {
			var email = this.$("#email").val();
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var correct = regex.test(email);
			if (correct) {
				this.$("#email-error").css("display", "none");
				this.model.emailAvailable(email);
			}else {
				this.$("#email-error").css("display", "block");
			}
			this.$("#email-usata").css("display", "none");
			
			return this.form.email.valida = correct;
		},

		/**
		 * Controlla la validita' sintattica del dato inserito nell'input
		 * 
		 * @return bool
		 */
		validaPassword : function() {
			var password = this.$("#password").val();
			var correct = (password.length >= 6);
			if (correct)
				this.$("#password-error").css("display", "none");
			else
				this.$("#password-error").css("display", "block");
			
			return this.form.password = correct;
		},

	});

	return RegistrazioneView;

});
