define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");

	var StructureView = Backbone.View.extend({

		constructorName : "StructureView",

		model : Utente,

		id : "main",

		events : {
			"click #menu-list a" : "waitAndHideMenu",
			"click #menu-accedi a" : "hideAndDisableMenu",
			"click #disconnetti" : "logout"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.structure;
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");

			this.model = new Utente();
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			this.checkLogged();
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		},

		/**
		 * 
		 * Metodo esclusivamente per questioni di performance: si elimina del
		 * tutto il lag, grazie a un'attesa totalmente impercettibile
		 * all'utente, nonche' migliora il comfort visivo.
		 * 
		 * Ritrazione menu di un decimo di secondo
		 * 
		 */
		waitAndHideMenu : function() {
			var t = this;
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
				var attr1 = $("#profilo").attr("href");
				var attr2 = $("#ordini").attr("href");
				if(attr1 == "#accedi" || attr2 == "#accedi")
					t.disableMenu();
			}, 100);
		},

		/**
		 * Ritrae e disabilita il menu
		 */
		hideAndDisableMenu : function() {
			var t = this;
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
				t.disableMenu();
			}, 100);
		},
		
		/**
		 * Disabilita il menu (non permette di draggarlo)
		 */
		disableMenu : function() {			
			$(".drag-target").css("left", "-10px");
		},

		/**
		 * Viene richiamato alla pressione del corrispondente pulsante nel menu
		 */
		logout : function() {
			this.model.logout();
			var toastContent = 'Disconnessione effettuata';
			Materialize.toast(toastContent, 3000);
			Backbone.history.navigate("home", {
				trigger : true
			});
			setTimeout(function() {
				this.$("#profilo").attr("href", "#accedi");
				this.$("#ordini").attr("href", "#accedi");
				this.$("#disconnetti").css("display", "none");
				this.$("#accedi").css("display", "block");
			}, 100);
		},

		/**
		 * Viene richiamato internamente a questa classe ed imposta gli elementi grafici
		 * in base se risulta essere loggato o meno
		 */
		checkLogged : function() {
			if (this.model.isLogged()) {
				this.$("#accedi").css("display", "none");
				this.$("#disconnetti").css("display", "block");
				this.$("#profilo").attr("href", "#profilo");
				this.$("#ordini").attr("href", "#ordini");
			} else {
				this.$("#accedi").css("display", "block");
				this.$("#disconnetti").css("display", "none");
				this.$("#profilo").attr("href", "#accedi");
				this.$("#ordini").attr("href", "#accedi");
			}
		}
		
	});

	return StructureView;

});