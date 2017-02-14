define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var ListaAziende = require("collections/ListaAziende");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var AziendaElementoView = require("views/AziendaElementoView");
	var Azienda = require("models/Azienda");

	var AziendeView = Utils.Page.extend({

		constructorName : "AziendeView",

		collection : ListaAziende,

		id : "aziende-view",
		
		// className : "",

		events : {
			"click a" : "cacheAzienda"
		},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.aziende;
			
			$("#content").empty();
			document.getElementById("titolo").innerHTML = "Aziende";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
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
			this.collection = new ListaAziende();
			this.collection.getResult();
			this.listenTo(this.collection, "sync", this.render);
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			
			this.spinner.render();
			
			var sx = true;
			for (var i = 0; i < this.collection.length; i++) {
				var aziendaElementoView = new AziendaElementoView({
					model : this.collection.at(i)
				});
				if (sx) {
					this.$("#sx").append(aziendaElementoView.render().$el);
					sx = false;
				} else {
					this.$("#dx").append(aziendaElementoView.render().$el);
					sx = true;
				}
			}
			
			this.spinner.rimuovi();

			return this;
		},
		
		/**
		 * Salva nel db locale l'Azienda per evitare una seconda richiesta
		 * superflua verso il server; e' gia' in nostro possesso la Categoria
		 */
		cacheAzienda : function(e) {
			var id = $(e.currentTarget).data("id");
			var azienda = new Azienda();
			azienda = this.collection.get(id);
			azienda.salva();
		}
		
	});

	return AziendeView;

});
