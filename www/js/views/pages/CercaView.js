define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var BarraRicercaView = require("views/BarraRicercaView");
	var ProdottoCardView = require("views/ProdottoCardView");
	var ListaProdotti = require("collections/ListaProdotti");
	var Prodotto = require("models/Prodotto");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var CercaView = Utils.Page.extend({

		constructorName : "CercaView",

		collection : ListaProdotti,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.cerca;
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
			this.barraRicerca = new BarraRicercaView();
			this.collection = new ListaProdotti();

			this.listenTo(this.barraRicerca.collection, "sync", this.updateResults);
		},

		id : "cerca-view",

		className : "row",

		events : {
			"click .card" : "cacheProdotto"
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
			this.spinner.render();
			// svuoto il div da eventuali risultati precedenti
			this.$("#col-sx").empty();
			this.$("#col-dx").empty();
			// aggiorno la lista risultati, se ce ne sono
			this.collection = this.barraRicerca.collection;
			if (this.collection.length) {
				for (i = 0; i < this.collection.length; i++) {
					var prodottoCardView = new ProdottoCardView({
						model : this.collection.at(i)
					});
					if(i % 2 == 0)
						this.$("#col-sx").append(prodottoCardView.render().$el);
					else
						this.$("#col-dx").append(prodottoCardView.render().$el);
				}
			}else{
				this.$el.append("Nessun prodotto trovato");
			}
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
		}

	});

	return CercaView;

});
