define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCardView = require("views/ProdottoCardView");
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
			
			$("#titolo").css("line-height", "40px");
			document.getElementById("titolo").innerHTML = "Categorie";
			
			var categoria = new Categoria();
			categoria.carica();
			document.getElementById("sottotitolo").innerHTML = categoria.get("nome");
			
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

		className : "row",

		events : {
			"click .card" : "cacheProdotto"
		},

		render : function() {
//			var categoria = new Categoria();
//			categoria.carica();
			
			this.el.innerHTML = this.template({
//				nome : categoria.get("nome")
			});
			
			this.spinner.render();
			
			if (this.collection.length) {
				for (var i = 0; i < this.collection.length; i++) {
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