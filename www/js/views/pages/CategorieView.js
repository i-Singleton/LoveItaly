define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var ListaCategorie = require("collections/ListaCategorie");
	var CategoriaElementoListaView = require("views/CategoriaElementoListaView");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var Categoria = require("models/Categoria");

	var CategorieView = Utils.Page.extend({

		constructorName : "CategorieView",
		
		tagName : "ul",

		id : "categorie-view",
		
		className : "collection",
		
		collection : ListaCategorie,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.categorie;
			document.getElementById("titolo").innerHTML = "Categorie";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
			
			this.spinner = new PreloaderCircolareView();
			this.collection = new ListaCategorie();
			this.collection.getResult();
			this.listenTo(this.collection, "sync", this.render);
		},

		events : {
			"click li" : "cacheCategoria"
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			
			this.spinner.render();

			for (i = 0; i < this.collection.length; i++) {
				var categoriaElementoListaView = new CategoriaElementoListaView({
					model : this.collection.at(i)
				});
				this.$el.append(categoriaElementoListaView.render().$el);
			}

			return this;
		},
		
		/**
		 * Salva nel db locale la Categoria per evitare una seconda richiesta
		 * superflua verso il server; e' gia' in nostro possesso la Categoria
		 */
		cacheCategoria : function(e) {
			var id = $(e.currentTarget).data("id");
			var categoria = new Categoria();
			categoria = this.collection.get(id);
			categoria.salva();
		}

	});

	return CategorieView;

});
