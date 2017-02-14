define(function(require) {

	var Backbone = require("backbone");
	/**
	 * Structure View
	 */
	var StructureView = require("views/StructureView");
	/**
	 * Errore View
	 * 
	 */
	var ErroreView = require("views/ErroreView");
	/**
	 * Tutte le pagine di LoveItaly
	 */
	var AccediView = require("views/pages/AccediView");
	var AziendeView = require("views/pages/AziendeView");
	var CarrelloView = require("views/pages/CarrelloView");
	var CategorieView = require("views/pages/CategorieView");
	var CercaView = require("views/pages/CercaView");
	var CopertinaView = require("views/pages/CopertinaView");
	var HomeView = require("views/pages/HomeView");
	var OrdiniView = require("views/pages/OrdiniView");
	var ProdottiAziendaView = require("views/pages/ProdottiAziendaView");
	var ProdottiCategoriaView = require("views/pages/ProdottiCategoriaView");
	var ProfiloView = require("views/pages/ProfiloView");
	var RegistrazioneView = require("views/pages/RegistrazioneView");
	var RiepilogoView = require("views/pages/RiepilogoView");
	var SchedaProdottoView = require("views/pages/SchedaProdottoView");

	var AppRouter = Backbone.Router.extend({

		constructorName : "AppRouter",

		routes : {
			// the default is the structure view
			"" : "showStructure",
			"accedi" : "accedi",
			"aziende" : "aziende",
			"carrello" : "carrello",
			"categorie" : "categorie",
			"cerca" : "cerca",
			"copertina" : "copertina",
			"home" : "home",
			"ordini" : "ordini",
			"prodottiAzienda/:id_azienda" : "prodottiAzienda",
			"prodottiCategoria/:id_categoria" : "prodottiCategoria",
			"profilo" : "profilo",
			"registrazione" : "registrazione",
			"riepilogo" : "riepilogo",
			"schedaProdotto" : "schedaProdotto"
		},

		firstView : "home",

		initialize : function(options) {
			this.currentView = undefined;
		},

		// load the structure view
		showStructure : function() {
			if (!this.structureView) {
				this.structureView = new StructureView();
				// put the el element of the structure view into the DOM
				document.body.appendChild(this.structureView.render().el);
				this.structureView.trigger("inTheDOM");
			}
			// go to first view
			this.navigate(this.firstView, {
				trigger : true
			});
		},

		accedi : function() {
			// create the view and show it
			var page = new AccediView();
			this.changePage(page);
		},

		aziende : function() {
			// create the view and show it
			var page = new AziendeView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		carrello : function() {
			// create the view and show it
			var page = new CarrelloView();
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.clear();					
			}
			this.changePage(page);
		},

		categorie : function() {
			// create the view and show it
			var page = new CategorieView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		cerca : function() {
			// create the view and show it
			var page = new CercaView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		copertina : function() {
			// create the view and show it
			var page = new CopertinaView();
			this.changePage(page);
		},

		home : function() {
			// create the view and show it
			var page = new HomeView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		ordini : function() {
			// create the view and show it
			var page = new OrdiniView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},
		
		prodottiAzienda : function(id_azienda) {
			// create the view and show it
			var page = new ProdottiAziendaView({id_azienda:id_azienda});
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},
		
		prodottiCategoria : function(id_categoria) {
			// create the view and show it
			var page = new ProdottiCategoriaView({id_categoria:id_categoria});
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		profilo : function() {
			// create the view and show it
			var page = new ProfiloView();
			this.changePage(page);
		},

		registrazione : function() {
			// create the view and show it
			var page = new RegistrazioneView();
			this.changePage(page);
		},

		riepilogo : function() {
			// create the view and show it
			var page = new RiepilogoView();
			this.changePage(page);
			if (navigator.connection.type == Connection.NONE){
				var errorView = new ErroreView();
				errorView.render("connessione");					
			}
		},

		schedaProdotto : function() {
			// create the view and show it
			var page = new SchedaProdottoView();
			this.changePage(page);
		}

	});

	return AppRouter;

});