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
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			$("#titolo").html(this.el);
			this.focusInput();
			this.caricaUltimaRicerca();
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
			sessionStorage.removeItem("ultimaRicerca");
		},
		
		search : function(event) {
			var stringa = this.$("#barra-ricerca input").val();
			if(event.which == 13 && stringa.length) {
				this.collection.getResult("Cerca", stringa);
				this.salvaUltimaRicerca(stringa);				
			}
		},
		
		salvaUltimaRicerca : function(stringa){
			sessionStorage.setItem("ultimaRicerca", stringa);
		},
		
		caricaUltimaRicerca : function(){
			var stringa;
			if((stringa = sessionStorage.getItem("ultimaRicerca")) != null){
				$("#barra-ricerca input").val(stringa);				
				this.collection.getResult("Cerca", stringa);
			}
		}

	});

	return BarraRicercaView;

});