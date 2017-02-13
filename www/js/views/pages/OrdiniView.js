define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var OrdiniView = Utils.Page.extend({

		constructorName : "OrdiniView",

		// model : MyModel,
		
		// id : "",
		
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
		},

		render : function() {
			$(this.el).html(this.template());
			return this;
		}
		
	});

	return OrdiniView;

});
