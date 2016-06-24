define(function(require) {

	var $ = require("jquery");
	var Backbone = require("backbone");
	var Utils = require("utils");

	var StructureView = Backbone.View.extend({

		constructorName : "StructureView",

		id : "main",

		events : {
			"click #menu" : "menu",
			"swipeRight #content" : "menu",
			// "swipeRight .drag-target" : "menu",
			"swipeLeft #content" : "chiudiMenu",
			"click #sidenav-overlay" : "chiudiMenu",
			"click #cerca" : "chiudiMenu",
			"click #carrello" : "chiudiMenu",
			"click #mobile-demo a" : "chiudiMenu",
		},

		initialize : function(options) {
			// load the precompiled template
			this.template = Utils.templates.structure;
			// this.on("inTheDOM", this.rendered);
			// bind the back event to the goBack function
			// document.getElementById("back").addEventListener("back",
			// this.goBack(), false);
		},

		render : function() {
			// load the template
			this.el.innerHTML = this.template({});
			// cache a reference to the content element
			this.contentElement = this.$el.find('#content')[0];
			return this;
		},

		// rendered: function(e) {
		// },

		// generic go-back function
		// goBack : function() {
		// // window.history.back();
		// },
		//
		// setActiveTabBarElement : function(elementId) {
		// // here we assume that at any time at least one tab bar element is
		// // active
		// document.getElementsByClassName("active")[0].classList
		// .remove("active");
		// document.getElementById(elementId).classList.add("active");
		// },
		//
		// map : function(event) {
		// Backbone.history.navigate("map", {
		// trigger : true
		// });
		// },
		//
		// cerca : function(event) {
		// Backbone.history.navigate("cerca", {
		// trigger : true
		// });
		// },

		menu : function(event) {
			// // ottengo la coordinata X della matrice di trasformazione
			var str = $('#mobile-demo').css('transform');
			var res = String(str.split("matrix("));
			res = String(res.split(")"));
			res = res.split(",");
			res = res[5];
			// se il menu e' chiuso, aprilo
			if (res == -240) {
//			if ($('#mobile-demo').css('left') == '0px') {
				$('.button-collapse').sideNav('show');
//				$('#mobile-demo').animate({
//					left : '240px'
//				});
//				$('#sidenav-overlay').fadeIn();
			} else if (event.type != 'swipeRight') {
				$('.button-collapse').sideNav('hide');
				// se il menu e' aperto tramite menu, chiudilo
				// serve per prevenire il caso di chiusura tramite swipe a
				// destra
//				$('#mobile-demo').animate({
//					left : '0px'
//				});
//				$('#sidenav-overlay').fadeOut();
			}
		},

		chiudiMenu : function(event) {
			$('.button-collapse').sideNav('hide');
//			if ($('#mobile-demo').css('left') != '0px') {
//				$('#mobile-demo').animate({
//					left : '0px'
//				});
//				$('#sidenav-overlay').fadeOut();
//			}
		}

	});

	return StructureView;

});