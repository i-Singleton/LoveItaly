define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var AccediView = Utils.Page.extend({

		constructorName : "AccediView",

		titolo : "Accedi",

		// model : MyModel,

		initialize : function() {
			// load the precompiled template
			this.template = Utils.templates.accedi;
		},

		id : "accedi-view",

		// className : "",

		events : {
			"click #chiudi-accedi-view" : "chiudi",
			"focus input" : "focus",
			"blur input" : "blur"
		},

		render : function() {
			$(this.el).html(this.template());
			$("#statusbar").css("display", "none");
			$("#headbar").css("display", "none");
			$("#content").css({
				"height" : "100%",
				"background-color" : "#4caf50"
			});
			return this;
		},

		chiudi : function() {
			$("#statusbar").css("display", "block");
			$("#headbar").css("display", "block");
			$("#content").css({
				"height" : "calc(100% - 80px)",
				"background-color" : "#eeeeee"
			});
			$(".drag-target").css("left", "0px");
			$("#content").scrollTop(0);
		},

		focus : function(e) {
			this.$("#logo").css("display", "none");
			var offset = $(e.currentTarget).offset().top;
			var error = 10;
			var spostamento = offset - error;
			$("#content").scrollTop(spostamento);
		},

		blur : function() {
			this.$("#logo").css("display", "block");
			$("#content").scrollTop(0);
		}

	});

	return AccediView;

});
