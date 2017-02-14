define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Prodotto = require("models/Prodotto");

	var ProdottoListaView = Backbone.View.extend({

		constructorName : "ProdottoListaView",

		model : Prodotto,
		
		tagName: "a",

		// id : "prodottoLista",

		// className : "",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.prodottoLista;
			//this.$el.attr("href", "#schedaProdotto");
			
			//this.model = new Prodotto();
		},

		/**
		 * Se non e' disponibile l'immagine o si verifica un errore,
		 * mostra un'immagine di errore da locale
		 */
		render : function() {
			this.model.set({
				data : this.data()
			});
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			this.$("img").on('error', function(e){
				$(e.currentTarget).attr("src", "img/prodotto-errore.png");
			});
			return this;
		},
		
		data : function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			today = dd+'/'+mm+'/'+yyyy;
			return today;
		}

	});

	return ProdottoListaView;

});