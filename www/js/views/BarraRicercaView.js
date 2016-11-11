define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ListaProdotti = require("collections/ListaProdotti");
	var ProdottoListaView = require("views/ProdottoListaView");

	var BarraRicercaView = Backbone.View.extend({

		constructorName : "BarraRicercaView",

		collection : ListaProdotti,

		id : "barra-ricerca-view",

		events : {
			"click #barra-ricerca" : "focusInput",
			"blur #barra-ricerca" : "blurInput",
			"click #icona-chiudi" : "resetInput",
			"keydown input" : "search"
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.barraRicerca;
			this.collection = new ListaProdotti();	
//			this.caricaUltimaRicerca();
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			return this;
		},

		focusInput : function(event) {
			$("#barra-ricerca input").focus();
			$("#barra-ricerca i").css("color", "white");
			$("#barra-ricerca .input-field").css("border-color", "white");
			$("#barra-ricerca").css("background-color", "#4caf50");
		},

		blurInput : function(event) {
			$("#barra-ricerca i").css("color", "#e9e9e9");
			$("#barra-ricerca .input-field").css("border-color", "#e9e9e9");
			$("#barra-ricerca").css("background-color", "unset");
		},

		resetInput : function(event) {
			$("#barra-ricerca input").val("");
		},
		
		search : function(event) {
			// Disabilitare l'if per effettuare la richiesta ajax ogni carattere che si digita
			// Effettua la richiesta ajax alla pressione del pulsante invio
			if(event.which == 13) {
				var stringa = $("#barra-ricerca input").val();
				this.collection.getResult("Cerca", stringa);
//				this.salvaStringaUltimaRicerca(stringa);				
			}
		},
		
//		salvaStringaUltimaRicerca : function(stringa){
//			localStorage.setItem(this.constructorName, stringa);			
//		},
//		
//		caricaUltimaRicerca : function(){
//			// se contiene qualcosa, allora carica lo stringa
//			var ricercaJSONString = null;
//			var stringa = "";
//			if((ricercaJSONString = localStorage.getItem(this.constructorName)) != null){
//				stringa = JSON.parse(ricercaJSONString);
//				$("#barra-ricerca input").val(stringa);				
//			}
//			this.collection.getResult("Cerca", stringa);
//		}

	});

	return BarraRicercaView;

});