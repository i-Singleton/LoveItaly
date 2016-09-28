define(function(require) {

	var Backbone = require("backbone");

	var Categoria = Backbone.Model.extend({

		constructorName : "Categoria",

		defaults : {
			id : '',
			nome : ''
		}

	});

	return Categoria;
});