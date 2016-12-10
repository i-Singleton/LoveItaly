define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var ProfiloView = Utils.Page.extend({

		constructorName : "ProfiloView",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.profilo;
			document.getElementById("titolo").innerHTML = "Profilo";
			$("#titolo").css("line-height", "unset");
			document.getElementById("sottotitolo").innerHTML = "";
			$("#cerca").css("display", "inline-block");
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color": "white"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
		},

		id : "profilo-view",
		
		// className : "",

		events : {},

		render : function() {
			$(this.el).html(this.template());
			return this;
		}
		
	});

	return ProfiloView;

});
