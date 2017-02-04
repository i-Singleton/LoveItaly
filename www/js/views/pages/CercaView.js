define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var BarraRicercaView = require("views/BarraRicercaView");
	var ProdottoCardView = require("views/ProdottoCardView");
	var ListaProdotti = require("collections/ListaProdotti");
	var Prodotto = require("models/Prodotto");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var ErroreView = require("views/ErroreView");

	var CercaView = Utils.Page.extend({

		constructorName : "CercaView",

		collection : ListaProdotti,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.cerca;
			
			$("#content").empty();
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			this.spinner = new PreloaderCircolareView();
			this.error = new ErroreView();
			this.barraRicerca = new BarraRicercaView();
			this.collection = new ListaProdotti();

			this.listenTo(this.barraRicerca.collection, "sync", this.updateResults);
		},

		id : "cerca-view",

		className : "row",

		events : {
			"click .card" : "cacheProdotto",
			"click #prezzo-crescente" : "filtra",
			"click #prezzo-decrescente" : "filtraDesc",
		},

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
			// jquery remove, rimuove l'eventuale ErroreView residua
			this.error.remove();
			this.spinner.render();
			// svuoto il div da eventuali risultati precedenti
			this.$("#col-sx").empty();
			this.$("#col-dx").empty();
			// aggiorno la lista risultati, se ce ne sono
			this.collection = this.barraRicerca.collection;
			this.el.innerHTML = this.template({
				quantita_risultati : this.collection.length
			});
			if (this.collection.length) {
				this.$("#barra-filtraggio").css("display", "block");
				var sx = true;
				for (var i = 0; i < this.collection.length; i++) {
					var prodottoCardView = new ProdottoCardView({
						model : this.collection.at(i)
					});
					if(sx){
						this.$("#col-sx").append(prodottoCardView.render().$el);
						sx = false;
					}else{
						this.$("#col-dx").append(prodottoCardView.render().$el);
						sx = true;
					}
				}
			}else{
				this.$("#barra-filtraggio").css("display", "none");
				var error = this.error.render("risultato").$el;
				this.$el.append(error);
			}
			// inclusione secondo la libreria
			$(document).ready(function() {
				$('.dropdown-button').dropdown();
			});
		},
		
		/**
		 * Salva nel db locale il prodotto per evitare una seconda richiesta
		 * superflua verso il server; e' gia' in nostro possesso il prodotto
		 */
		cacheProdotto : function(e) {
			var id = $(e.currentTarget).data("id");
			var prodotto = new Prodotto();
			prodotto = this.collection.get(id);
			prodotto.salva();
		},
		
		filtra : function() {
			this.collection.sortByPriceAsc();
			this.updateAfterFilter();
		},
		
		filtraDesc : function() {
			this.filtra();
			this.updateAfterFilter(true);
		},
		
		updateAfterFilter : function(desc) {
			this.$("#col-sx").empty();
			this.$("#col-dx").empty();
			// aggiorno la lista risultati, se ce ne sono
			this.collection = this.barraRicerca.collection;
			this.el.innerHTML = this.template({
				quantita_risultati : this.collection.length
			});
			this.$("#barra-filtraggio").css("display", "block");
			var sx = true;
			if(desc)
				for (var i = this.collection.length - 1; i >= 0; i--) {
					var prodottoCardView = new ProdottoCardView({
						model : this.collection.at(i)
					});
					if(sx){
						this.$("#col-sx").append(prodottoCardView.render().$el);
						sx = false;
					}else{
						this.$("#col-dx").append(prodottoCardView.render().$el);
						sx = true;
					}
				}
			else
				for (var i = 0; i < this.collection.length; i++) {
					var prodottoCardView = new ProdottoCardView({
						model : this.collection.at(i)
					});
					if(sx){
						this.$("#col-sx").append(prodottoCardView.render().$el);
						sx = false;
					}else{
						this.$("#col-dx").append(prodottoCardView.render().$el);
						sx = true;
					}
				}
			// inclusione secondo la libreria
			$(document).ready(function() {
				$('.dropdown-button').dropdown();
			});
		}

	});

	return CercaView;

});
