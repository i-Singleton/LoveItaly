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
			this.listenTo(this.collection, "change", this.updateResults);
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
				console.log(this.collection)
				this.updateResults();
			}
		},
		
		updateResults : function() {
			// svuoto il div da eventuali risultati precedenti
			$("#ricerca-risultati").empty();
			// aggiorno la lista risultati, se ce ne sono
			if (this.collection.length) {
				this.collection.each(function(item) {
					var prodottoListaView = new ProdottoListaView({
						model : item
					});
					$("#ricerca-risultati").append(prodottoListaView.render().$el);
				}, this);
			}else{
				$("#ricerca-risultati").append("Nessun prodotto trovato");
			}
		}
		
//		search : function(event) {
//			if(event.which == 13) {
//				var baseUrl = BASE_URL_SERVER;
//				var key = LOVEITALY_API_KEY;
//				var stringa = $("#barra-ricerca input").val();
//				$.ajax({
//					url : baseUrl 
//							+ '/search?io_format=JSON&language=1&orderby=position&orderway=desc&query='
//							+ stringa
//							+ '&ws_key=' + key,
//				    async : true,
//				    type : "GET",
//				    dataType : 'json',
//				    success : function (resultJSONString) {
//				    	var array = JSON.parse(resultJSONString);
//				    	var prodotti = array['products'];
//				    },
//				    error : function (XMLHttpRequest, textStatus, errorThrown) {
//				    	console.log('Errore chiamata ajax!' +
//				    			'\nReponseText: ' + XMLHttpRequest.responseText +
//				    			'\nStatus: ' + textStatus +
//				    			'\nError: ' + errorThrown);
//				    }
//				});
//			}
//		}

	});

	return BarraRicercaView;

});