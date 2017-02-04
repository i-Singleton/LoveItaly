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

			this.model = new Utente();
		},

		render : function() {
			var carrello = new Carrello();
			$(this.el).html(this.template({
				nome : this.model.get("nome"),
				cognome : this.model.get("cognome"),
				email : this.model.get("email"),
				indirizzo : this.model.get("indirizzo"),
				lista_citta : this.model.get("lista_citta"),
				totale : carrello.getTotale()
			}));
			// imposto graficamente il valore corrispondente
			var index = this.model.get("citta");
			this.$("#citta").val(index);
			return this;
		},
		
		update : function() {
			this.model.set({
				indirizzo : $("#indirizzo").val(),
				citta : $("#citta option:selected").val(),
				pagamento : $("#pagamento option:selected").text()
			});
			this.model.update();
		}
		
	});

	return RiepilogoView;

});
