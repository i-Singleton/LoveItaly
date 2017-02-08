define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");

	var ProfiloView = Utils.Page.extend({

		constructorName : "ProfiloView",

		model : Utente,

		id : "profilo-view",
		
		// className : "",

		events : {
			"change input" : "update",
			"change select" : "update",
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.profilo;
			
			$("#content").empty();
			document.getElementById("titolo").innerHTML = "Profilo";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "white"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
			// inizializzazione select secondo libreria
			$(document).ready(function() {
				$('select').material_select();
			});
			
			this.model = new Utente();
		},

		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
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

	return ProfiloView;

});
