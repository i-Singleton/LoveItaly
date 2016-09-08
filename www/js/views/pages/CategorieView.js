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
			document.getElementById("titolo").innerHTML = "Categorie";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "#f5f5f5"
			});
			$(".drag-target").css("left", "0px");
		},

		id : "categorie-view",

		// className : "",

		events : {},

		render : function() {
			$(this.el).html(this.template());

			// carico il preloader per il contenuto
			//var spinner = new PreloaderCircolareView();
			//spinner.render();

			return this;
		}

	});

	return CategorieView;

});
