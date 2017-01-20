define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Utente = require("models/Utente");
	// var MenuLateraleView = require("views/MenuLateraleView");

	var StructureView = Backbone.View.extend({

		constructorName : "StructureView",

		model : Utente,

		id : "main",

		events : {
			"click #menu-list a" : "waitAndHideMenu",
			"click #menu-accedi a" : "hideAndDisableMenu",
			"click #disconnetti" : "logout",
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.structure;
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");

			this.model = new Utente();
			// this.menu = new MenuLateraleView();
			// this.listenTo(this.model, "change", this.render);
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			this.checkLogged();
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		},

		// render : function() {
		// // load the template
		// $("#headbar").after(this.menu.render().$el);
		// this.el.innerHTML = this.template();
		// // cache a reference to the content element
		// this.contentElement = this.$el.find('#content')[0];
		// return this;
		// },

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
			var t = this;
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
				var attr1 = $("#profilo").attr("href");
				var attr2 = $("#ordini").attr("href");
				if(attr1 == "#accedi" || attr2 == "#accedi")
					t.disableMenu();
			}, 100);
		},

		hideAndDisableMenu : function() {
			var t = this;
			setTimeout(function() {
				$('.button-collapse').sideNav('hide');
				t.disableMenu();
			}, 100);
		},
		
		disableMenu : function() {			
			$(".drag-target").css("left", "-10px");
		},

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
				//this.$("#utente-info").html("");
			}, 100);
		},

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