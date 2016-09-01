define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");
	var PreloaderCircolareView = require("views/PreloaderCircolareView");

	var ProfiloView = Utils.Page.extend({

		constructorName : "ProfiloView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.profilo;
			document.getElementById("titolo").innerHTML = "Profilo";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "white"
			});
			$(".drag-target").css("left", "0px");
		},

		id : "profilo-view",
		// className : "i-g page",

		events : {
		// "tap #goToMap" : "goToMap"
		},

		render : function() {
			$(this.el).html(this.template());
			// carico il preloader per il contenuto
			var spinner = new PreloaderCircolareView();
			spinner.render();
			return this;
		},

	// goToMap : function(e) {
	// Backbone.history.navigate("map", {
	// trigger : true
	// });
	// }
	});

	return ProfiloView;

});
