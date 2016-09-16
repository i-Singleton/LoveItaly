define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

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
				"background-color": "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
		},

		id : "categorie-view",

		// className : "",

		events : {},

		render : function() {
			$(this.el).html(this.template());
			return this;
		}

	});

	return CategorieView;

});
