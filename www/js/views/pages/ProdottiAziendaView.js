define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCardView = require("views/ProdottoCardView");
	var ListaProdotti = require("collections/ListaProdotti");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var Azienda = require("models/Azienda");
	var Prodotto = require("models/Prodotto");
	var ErroreView = require("views/ErroreView");

	var ProdottiAziendaView = Utils.Page.extend({

		constructorName : "ProdottiAziendaView",

		collection : ListaProdotti,

		id : "cerca-view",
		
		className : "row",
		
		events : {
			"click .card" : "cacheProdotto"
		},
		
		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottiCategoria;
			
			$("#content").empty();
			$("#titolo").css("line-height", "40px");
			document.getElementById("titolo").innerHTML = "Aziende";
			
			var azienda = new Azienda();
			azienda.carica();
			document.getElementById("sottotitolo").innerHTML = azienda.get("nome");
			
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
			this.$el.css("margin-top", "0");
			
			this.spinner = new PreloaderCircolareView();
			this.error = new ErroreView();
			this.collection = new ListaProdotti();
			this.collection.getResult("Aziende", options.id_azienda);
			this.listenTo(this.collection, "sync", this.render);
		},

		render : function() {
			this.el.innerHTML = this.template({});
			
			this.spinner.render();
			
			if (this.collection.length) {
				var sx = true;
				for (var i = 0; i < this.collection.length; i++) {
					var prodottoCardView = new ProdottoCardView({
						model : this.collection.at(i)
					});
					if (sx) {
						this.$("#col-sx").append(prodottoCardView.render().$el);
						sx = false;
					} else {
						this.$("#col-dx").append(prodottoCardView.render().$el);
						sx = true;
					}
				}
			}else{
				var error = this.error.render("risultato").$el;
				this.$el.append(error);
			}
			
			this.spinner.rimuovi();
			
			return this;
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

	return ProdottiAziendaView;

});