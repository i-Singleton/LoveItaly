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
//			"blur #nome" : "updateNome",
//			"blur #cognome" : "updateCognome",
//			"blur #email" : "updateEmail",
//			"blur #password" : "updatePassword",
			"blur input" : "update",
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.profilo;
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
			
			this.model = new Utente();
		},

		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		update : function(e) {
			var id = e.currentTarget;
			console.log("id: ", id);
			var value = $(id).val();
			console.log("value: ", value);
			this.model.update(id, value);
		},

//		updateNome : function() {
//			var nome = this.$("#nome").val();
//			if(nome != this.model.get("nome"))
//				this.model.set("nome", nome);
//		},
//		
//
//		updateCognome : function() {
//			var cognome = this.$("#cognome").val();
//			if(cognome != this.model.get("cognome"))
//				this.model.set("cognome", cognome);
//		},
//		
//
//		updateEmail : function() {
//			var email = this.$("#email").val();
//			if(email != this.model.get("email"))
//				this.model.set("email", email);
//		},
//		
//
//		updatePassword : function() {
//			var password = this.$("#password").val();
//			if(password != this.model.get("password"))
//				this.model.set("password", password);
//		},

	});

	return ProfiloView;

});
