define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var AziendeView = Utils.Page.extend({

		constructorName : "AziendeView",

		// model : MyModel,

		// id : "",
		
		// className : "",

		events : {},
		
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
		},

		render : function() {
			$(this.el).html(this.template());
			return this;
		}
		
	});

	return AziendeView;

});
