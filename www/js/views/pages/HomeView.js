define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var ProdottoCardView = require("views/ProdottoCardView");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");
	var ListaProdotti = require("collections/ListaProdotti");
	var Prodotto = require("models/Prodotto");

	var HomeView = Utils.Page.extend({

		constructorName : "HomeView",

		collection : ListaProdotti,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.home;
			$("#titolo").html("Home");
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);

			this.spinner = new PreloaderCircolareView();
			this.collection = new ListaProdotti();
			this.collection.getResult("Home");
			this.listenTo(this.collection, "sync", this.append);
			var t = this;
			$("#content").scroll(function(){
				if($("#content").height() + $("#content").scrollTop() == $("#home-view").height() + 20){
					t.collection.getResult("Home");
				}
			});
		},

		id : "home-view",

		// className : "",

		events : {
			"click .card" : "cacheProdotto"
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			
			this.spinner.render();

			return this;
		},
		
		append : function() {
			for (var i = 0; i < this.collection.length; i++) {
				var prodottoCardView = new ProdottoCardView({
					model : this.collection.at(i)
				});
				if(i % 2 == 0)
					this.$("#home-col-sx").append(prodottoCardView.render().$el);
				else
					this.$("#home-col-dx").append(prodottoCardView.render().$el);
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

	return HomeView;

});
