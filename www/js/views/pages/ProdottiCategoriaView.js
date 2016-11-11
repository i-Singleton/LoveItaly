define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoListaView = require("views/ProdottoListaView");
	var ListaProdotti = require("collections/ListaProdotti");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var Categoria = require("models/Categoria");
	var Prodotto = require("models/Prodotto");

	var ProdottiCategoriaView = Utils.Page.extend({

		constructorName : "ProdottiCategoriaView",

		collection : ListaProdotti,

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottiCategoria;
			document.getElementById("titolo").innerHTML = "Categorie";
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

//			var categoria = new Categoria();
//			categoria.carica();
//			document.getElementById("titolo").innerHTML = categoria.get("nome");
			
			this.spinner = new PreloaderCircolareView();
			this.collection = new ListaProdotti();
			this.collection.getResult("Categorie", options.id_categoria);
			this.listenTo(this.collection, "sync", this.render);
		},

		id : "cerca-view",

		// className : "",

		events : {
			"click .card" : "cacheProdotto"
		},

		render : function() {
			var categoria = new Categoria();
			categoria.carica();
			
			this.el.innerHTML = this.template({
				nome : categoria.get("nome")
			});
			
			this.spinner.render();
			
			if (this.collection.length) {
				this.collection.each(function(item) {
					var prodottoListaView = new ProdottoListaView({
						model : item
					});
					this.$el.append(prodottoListaView.render().$el);
				}, this);
			}else{
				this.$el.append("Nessun prodotto trovato");
			}
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

	return ProdottiCategoriaView;

});