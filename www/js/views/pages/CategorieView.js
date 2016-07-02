define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var CategorieView = Utils.Page.extend({

		constructorName : "CategorieView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.categorie;
			document.getElementById('titolo').innerHTML = "Categorie";
			$("#cerca").css("display", "inline-block");
		},

		// id : "",
		// className : "",

		events : {},

		render : function() {
			$(this.el).html(this.template());

			// carico il preloader per il contenuto
			var spinner = new PreloaderCircolareView();
			spinner.render();

			return this;
		}

	});

	return CategorieView;

});
