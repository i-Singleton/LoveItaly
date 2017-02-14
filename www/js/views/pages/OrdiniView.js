define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var ProdottoListaView = require("views/ProdottoListaView");
	var ListaProdotti = require("collections/ListaProdotti");

	var OrdiniView = Utils.Page.extend({

		constructorName : "OrdiniView",

		collection : ListaProdotti,
		
		id : "ordini-view",
		
		// className : "",

		events : {},
		
		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.ordini;
			
			$("#content").empty();
			document.getElementById("titolo").innerHTML = "Ordini";
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
			this.collection = new ListaProdotti();
			this.collection.add([ {				
				id : 8,
				nome : "Ciliegie",
				azienda : "Masseria Coste di Brenta",
				prezzo : "3.20",
				immagine_default : "http://loveitaly.altervista.org/api/images/products/11/38/?&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H",				
			}, {
				id : 9,
				nome : "Pomodori",
				azienda : "Masseria Coste di Brenta",
				prezzo : "0.50",
				immagine_default : "http://loveitaly.altervista.org/api/images/products/8/24/?&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H",
			}, {
				id : 45,
				nome : "Pizza bianca",
				azienda : "Il Fornetto a legna della Lecceta",
				prezzo : "1.20",
				immagine_default : "http://loveitaly.altervista.org/api/images/products/45/96/?&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H",
			} ]);
		},

		render : function() {
			$(this.el).html(this.template());
			this.spinner.render();
			for (var i = 0; i < this.collection.length; i++) {
				var prodottoListaView = new ProdottoListaView({
					model : this.collection.at(i)
				});
				this.$el.append(prodottoListaView.render().$el);
			}
			this.spinner.rimuovi();
			return this;
		}
		
	});

	return OrdiniView;

});
