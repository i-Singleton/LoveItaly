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
			email : null,
			indirizzo : null,
			citta : null,
			pagamento : true
		},

		id : "riepilogo-view",

		// className : "",

		events : {
			"click #conferma-ordine" : "confermaOrdine",
			"change #first_name" : "validaNome",
			"change #last_name" : "validaCognome",
			"change #email" : "validaEmail",
			"change #indirizzo" : "validaIndirizzo",
			"change #citta" : "validaCitta",
			"change #pagamento" : "validaPagamento",
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
			// abilito gli input per il guest
			if (!this.model.isLogged())
				this.$("input").removeAttr("disabled");
			// imposto graficamente il valore corrispondente
			var index = this.model.get("citta");
			this.$("#citta").val(index);
			// controllo se la form e' valida e abilito il pulsante
			this.validaForm();
			return this;
		},

		confermaOrdine : function() {
			if (!this.$("#conferma-ordine").hasClass("disabled")) {
				// qui va l'inoltro dell'ordine, ma non e' da implementare in quanto 
				// non presente nelle features del documento di progetto...
				// ordine.qualcosa();
				var toastContent = 'Ordine effettuato';
				Materialize.toast(toastContent, 5000);
				// rimuovo l'eventuale guest, svuoto il carrello e resetto la form
				this.model.removeGuest();
				this.carrello.svuota();
				this.resetForm();
				Backbone.history.navigate("ordini", {
					trigger : true
				});
			}else
				this.validaForm();				
		},

		validaNome : function() {
			var nome = this.$("#first_name").val();			
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(nome);
			if (correct){
				this.model.set("nome", nome);
				this.model.update();
				this.$("#nome-error").css("display", "none");
			}else
				this.$("#nome-error").css("display", "block");
			
			this.form.nome = correct;
			//this.update();
			this.checkConfermaButton();
			//return correct;
		},

		validaCognome : function() {
			var cognome = this.$("#last_name").val();
			var regex = /^[a-zA-Z]+$/;
			var correct = regex.test(cognome);
			if (correct){
				this.model.set("cognome", cognome);
				this.model.update();
				this.$("#cognome-error").css("display", "none");
			}else
				this.$("#cognome-error").css("display", "block");
			
			this.form.cognome = correct;
			//this.update();
			this.checkConfermaButton();
			//return correct;
		},

		validaEmail : function() {
			var email = this.$("#email").val();
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var correct = regex.test(email);
			if (correct) {
				this.model.set("email", email);
				this.model.update();
				this.$("#email-error").css("display", "none");
			}else
				this.$("#email-error").css("display", "block");
			this.$("#email-usata").css("display", "none");
			this.form.email = correct;
			//this.update();
			this.checkConfermaButton();
			//return correct;
		},
		
		validaIndirizzo : function() {
			var indirizzo = this.$("#indirizzo").val();			
			var regex1 = /^[a-zA-Z0-9 ]+$/;
			var regex2 = /^[ ]+$/;
			var correct1 = regex1.test(indirizzo);
			var correct2 = !regex2.test(indirizzo);
			if (correct1 && correct2){
				this.model.set("indirizzo", indirizzo);
				this.model.update();
				this.$("#indirizzo-error").css("display", "none");
			}else
				this.$("#indirizzo-error").css("display", "block");
			this.form.indirizzo = correct1 && correct2;
			//this.update();
			this.checkConfermaButton();
			//return correct1 && correct2;
		},
		
		validaCitta : function() {
			var citta = $("#citta option:selected").val() || this.model.get("citta");
			var correct = false;
			if(citta > 0){
				this.model.set("citta", citta);
				this.model.update();
				correct = true;
			}
			else
				correct = false;
			this.form.citta = correct;
			console.log("citta "+citta+": ", this.form.citta)
			this.checkConfermaButton();
			//this.update();
			//return correct;
		},
		
		validaPagamento : function() {
			// Non c'e necessita', la modalita' richiesta e' solo il
			// pagamento in contrassegno, che e' impostato di default.
			// Quindi assegno true.
			var correct = true;
			var pagamento = $("#pagamento option:selected").text();
			this.model.set("pagamento", pagamento);
			this.model.update();
			this.form.pagamento = correct;
			//this.update();
			this.checkConfermaButton();
			//return correct;
		},
		
		resetForm : function() {
			this.form.nome = null; 
			this.form.cognome = null;
			this.form.email = null;
			this.form.indirizzo = null;
			this.form.citta = null;
			this.form.pagamento = true;
		},
		
		validaForm : function() {
			this.validaNome(); 
			this.validaCognome();
			this.validaEmail();
			this.validaIndirizzo();
			this.validaCitta();
			this.validaPagamento();
			
			this.checkConfermaButton();
		},
		
		checkConfermaButton : function() {
			if(	this.form.nome == true
					&& this.form.cognome == true
					&& this.form.email == true
					&& this.form.indirizzo == true
					&& this.form.citta == true
					&& this.form.pagamento == true){				
				this.$("#conferma-ordine").removeClass("disabled");
			}else{
				this.$("#conferma-ordine").addClass("disabled");
			}			
		}

	});

	return RiepilogoView;

});
