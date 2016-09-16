define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var BarraRicercaView = require("views/BarraRicercaView");
	var ProdottoListaView = require("views/ProdottoListaView");
	var ListaProdotti = require("collections/ListaProdotti");

	var CercaView = Utils.Page.extend({

		constructorName : "CercaView",

		collection : ListaProdotti,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.cerca;
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			this.barraRicerca = new BarraRicercaView();
			this.collection = new ListaProdotti();

			//this.listenTo(this.barraRicerca.collection, "change add remove", this.updateResults);
		},

		id : "cerca-view",

		// className : "",

		events : {},

		render : function() {
			this.el.innerHTML = this.template({});
			// Caricamento della Barra di Ricerca
			// nascondo l'icona cerca
			$("#cerca").css("display", "none");
			// carico il template della barra di ricerca
			$("#titolo").html(this.barraRicerca.render().$el);
			// metto il focus sull'input
			$("#barra-ricerca input").focus();
			$("#barra-ricerca").css("background-color", "#4caf50");

			return this;
		},
		
		updateResults : function() {
			// svuoto il div da eventuali risultati precedenti
			this.$("#ricerca-risultati").empty();
			// aggiorno la lista risultati, se ce ne sono
			this.collection = this.barraRicerca.collection;
			alert("updateResults")
			if (this.collection.length) {
				this.collection.each(function(item) {
					var prodottoListaView = new ProdottoListaView({
						model : item
					});
					this.$("#ricerca-risultati").append(prodottoListaView.render().$el);
				}, this);
			}else{
				this.$("#ricerca-risultati").append("Nessun prodotto trovato");
			}
		}

	});

	return CercaView;

});
