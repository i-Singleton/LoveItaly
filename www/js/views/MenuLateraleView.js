define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");

	var MenuLateraleView = Backbone.View.extend({

		constructorName : "MenuLateraleView",
		
		model : Utente,
		
		tagName: "div",

		id : "mobile-demo",
		
		className : "side-nav",

		events : {
			"click #menu-list a" : "waitAndHideMenu",
			"click #menu-accedi a" : "hideAndDisableMenu",
			"click #disconnetti" : "logout"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.menuLaterale;
			
			this.model = new Utente();
			//this.listenTo(this.model, "change", this.render);
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			this.loadIfLogged();
			return this;
		},

		/**
		 * 
		 * Metodo esclusivamente per questioni di performance: si elimina del
		 * tutto il lag, grazie a un'attesa totalmente impercettibile
		 * all'utente, nonche' migliora il comfort visivo.
		 * 
		 * un decimo di secondo
		 * 
		 */
		waitAndHideMenu : function() {
			setTimeout(function() {
				this.$('.button-collapse').sideNav('hide');
			}, 100);
		},

		hideAndDisableMenu : function() {
			setTimeout(function() {
				this.$('.button-collapse').sideNav('hide');
				$(".drag-target").css("left", "-10px");
			}, 100);
		},

		logout : function() {
			this.model.logout();
			var toastContent = 'Disconnessione effettuata';
			Materialize.toast(toastContent, 3000);
			Backbone.history.navigate("home", {
				trigger : true
			});
			setTimeout(function() {
				this.$("#profilo").css("display", "none");
				this.$("#disconnetti").css("display", "none");
				this.$("#accedi").css("display", "block");
			}, 100);
		},
		
		loadIfLogged : function() {
			if (this.model.isLogged()) {
				this.$("#accedi").css("display", "none");
				this.$("#disconnetti").css("display", "block");
				this.$("#profilo").css("display", "block");
			}			
		}

	});

	return MenuLateraleView;

});