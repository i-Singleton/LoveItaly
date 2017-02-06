define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Carrello = require("collections/Carrello");
	var Utente = require("models/Utente");

	var RiepilogoView = Utils.Page.extend({

		constructorName : "RiepilogoView",

		model : Utente,

		id : "riepilogo-view",

		// className : "",

		events : {
			"blur input" : "update",
			"blur select" : "update",
			"click #conferma-ordine" : "confermaOrdine"
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
			// rimuovo disabled se si tratta di un guest
			if (!this.model.isLogged())
				this.$("input").removeAttr("disabled");
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

	});

	return RiepilogoView;

});
