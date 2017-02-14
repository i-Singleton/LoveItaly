define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");
	var Categoria = require("models/Categoria");

	var CategoriaElementoListaView = Backbone.View.extend({

		constructorName : "CategoriaElementoListaView",
		
		model : Categoria,
		
		tagName : "li",
		
		// id : "",
		
		className : "collection-item waves-effect",

		events : {},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.categoriaElementoLista;
			this.$el.attr("data-id", this.model.get("id"));
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}

	});

	return CategoriaElementoListaView;

});