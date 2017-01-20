define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");

	var AccediView = Utils.Page.extend({

		constructorName : "AccediView",

		titolo : "Accedi",

		model : Utente,

		id : "accedi-view",
		
		// className : "",
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.accedi;
			//this.model = utenteSingletonInstance;
			this.model = new Utente();
			this.listenTo(this.model, "change:loggato", this.conferma);
		},

		events : {
			"click #chiudi-accedi-view" : "chiudi",
			"focus input" : "focus",
			"blur input" : "blur",
			"blur #email" : "validaEmail",
			"click #accedi" : "login"
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

		focus : function(e) {
			this.$("#logo").css("display", "none");
			var offset = $(e.currentTarget).offset().top;
			var error = 10;
			var spostamento = offset - error;
			$("#content").scrollTop(spostamento);
		},

		blur : function() {
			this.$("#logo").css("display", "block");
			$("#content").scrollTop(0);
		},
		
		conferma : function() {
			if (this.model.get("loggato") == true) {
				var toastContent = 'Accesso effettuato';
				Materialize.toast(toastContent, 3000);
				Backbone.history.navigate("home", {
					trigger : true
				});
				$("#accedi").css("display", "none");
				$("#disconnetti").css("display", "block");
				$("#profilo").attr("href", "#profilo");
				$("#ordini").attr("href", "#ordini");
				//$("#utente-info").html(this.model.get("nome"));
			} else if (this.model.get("loggato") == false)
				this.$("#accedi-error").css("display", "block");
			
		},

		login : function() {
			this.$("#accedi-error").css("display", "none");
			var email = this.$("#email").val();
			var password = this.$("#password").val();
			if (email.length > 0 && password.length > 0 && this.validaEmail())
				this.model.login(email, password);
		},
		
		validaEmail : function() {
			var email = this.$("#email").val();
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var correct = regex.test(email);
			if (correct)
				this.$("#email-error").css("display", "none");
			else
				this.$("#email-error").css("display", "block");
			return correct;
		},

	});

	return AccediView;

});
