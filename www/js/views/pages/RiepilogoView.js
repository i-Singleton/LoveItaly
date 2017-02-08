define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Carrello = require("collections/Carrello");
	var Utente = require("models/Utente");

	var RiepilogoView = Utils.Page.extend({

		constructorName : "RiepilogoView",

		model : Utente,
		
		form : {
			nome : null,
			cognome : null,
			email : {
				usata : null,
				valida : null,
			}
		},

		id : "riepilogo-view",

		// className : "",

		events : {
			"change input" : "update",
			"change select" : "update",
			"click #conferma-ordine" : "confermaOrdine",
			"change #first_name" : "validaNome",
			"change #last_name" : "validaCognome",
			"change #email" : "validaEmail"
		},

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.riepilogo;

			$("#content").empty();
			document.getElementById("titolo").innerHTML = "Riepilogo";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 134px)",
				"background-color" : "white"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
			// inizializzazione select secondo libreria
			$(document).ready(function() {
				$('select').material_select();
			});

			this.model = new Utente();
			this.carrello = new Carrello();
			this.listenTo(this.model, "change:email", this.emailUsata);
		},

		render : function() {
			$(this.el).html(this.template({
				nome : this.model.get("nome"),
				cognome : this.model.get("cognome"),
				email : this.model.get("email"),
				indirizzo : this.model.get("indirizzo"),
				lista_citta : this.model.get("lista_citta"),
				totale : this.carrello.getTotale()
			}));
			// rimuovo disabled se si tratta di un guest
			if (!this.model.isLogged())
				this.$("input").removeAttr("disabled");
			else
				this.$("#conferma-ordine").removeClass("disabled");
			// imposto graficamente il valore corrispondente
			var index = this.model.get("citta");
			this.$("#citta").val(index);
			return this;
		},

		update : function() {
			// imposto anche gli altri valori se si tratta di un guest
			if (!this.model.isLogged())
				this.model.set({
					nome : $("#first_name").val(),
					cognome : $("#last_name").val(),
					email : $("#email").val()
				});
			this.model.set({
				indirizzo : $("#indirizzo").val(),
				citta : $("#citta option:selected").val(),
				pagamento : $("#pagamento option:selected").text()
			});
			this.model.update();
		},

		confermaOrdine : function() {
			if (this.formIsValid()) {
				this.update();
				// confermo l'ordine
				// ordine.qualcosa();
				var toastContent = 'Ordine effettuato';
				Materialize.toast(toastContent, 5000);
				// rimuovo il guest (se esiste) e svuoto il carrello
				this.model.removeGuest();
				this.carrello.svuota();
				Backbone.history.navigate("ordini", {
					trigger : true
				});
			}
		},
		
		formIsValid : function() {
			if(!this.model.isLogged()){
				if (	this.form.nome == true 
						&& this.form.cognome == true
						&& this.form.email.usata == false
						&& this.form.email.valida == true){
					var nome = this.$("#first_name").val();
					var cognome = this.$("#last_name").val();
					var email = this.$("#email").val();
					
					this.model.set({
						nome : nome,
						cognome : cognome,
						email : email
					});
					
					this.$("#conferma-ordine").removeClass("disabled");
					
					return true;
				}else
					return false;
			}
		},

		validaNome : function() {
			var nome = this.$("#first_name").val();			
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(nome);
			if (correct)
				this.$("#nome-error").css("display", "none");
			else
				this.$("#nome-error").css("display", "block");
			
			this.formIsValid();
			return this.form.nome = correct;
		},

		validaCognome : function() {
			var cognome = this.$("#last_name").val();
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(cognome);
			if (correct)
				this.$("#cognome-error").css("display", "none");
			else
				this.$("#cognome-error").css("display", "block");
			
			this.formIsValid();
			return this.form.cognome = correct;
		},

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
			this.formIsValid();
			return this.form.email.usata = usata;
		},
		
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
			this.formIsValid();
			return this.form.email.valida = correct;
		},

	});

	return RiepilogoView;

});
