// here we put the paths to all the libraries and framework we will use
require.config({
	paths : {
		jquery : '../lib/jquery/jquery', // ../lib/zepto/zepto',
		underscore : '../lib/underscore/underscore',
		backbone : "../lib/backbone/backbone",
		text : '../lib/require/text',
		async : '../lib/require/async',
		handlebars : '../lib/handlebars/handlebars',
		templates : '../templates',
		leaflet : '../lib/leaflet/leaflet',
		spin : '../lib/spin/spin.min',
		preloader : '../lib/preloader/pre-loader',
		utils : '../lib/utils/utils',
		hammerjs : '../lib/hammer/hammer.min',
		materialize : '../lib/materialize/js/materialize',
//		'jquery.easing': '../lib/materialize/js/jquery.easing.1.3',
		'velocity': '../lib/materialize/js/velocity.min',
//		'picker': '../lib/materialize/date_picker/picker',
//		'picker': '../lib/materialize/date_picker/picker.date',
//		'picker.date': '../lib/materialize/js/date_picker/picker.date',
		'waves' : '../lib/materialize/js/waves',
//		'global': '../lib/materialize/js/global',
//		'animation' : '../lib/materialize/js/animation',
//		'collapsible': '../lib/materialize/js/collapsible',
//		'dropdown': '../lib/materialize/js/dropdown',
//		'leanModal': '../lib/materialize/js/leanModal',
//		'materialbox': '../lib/materialize/js/materialbox',
//		'tabs': '../lib/materialize/js/tabs',
//		'sideNav': '../lib/materialize/js/sideNav',
//		'parallax': '../lib/materialize/js/parallax',
//		'scrollspy': '../lib/materialize/js/scrollspy',
//		'tooltip': '../lib/materialize/js/tooltip',
//		'slider': '../lib/materialize/js/slider',
//		'cards': '../lib/materialize/js/cards',
//		'buttons': '../lib/materialize/js/buttons',
//		'pushpin': '../lib/materialize/js/pushpin',
//		'character_counter': '../lib/materialize/js/character_counter',
//		'toasts': '../lib/materialize/js/toasts',
//		'forms': '../lib/materialize/js/forms',
//		'scrollFire': '../lib/materialize/js/scrollFire',
//		'transitions' : '../lib/materialize/js/transitions',
		'jquery.hammer' : '../lib/materialize/js/jquery.hammer',
//		'jquery.timeago': '../lib/materialize/js/jquery.timeago.min',
//		'carousel': '../lib/materialize/js/carousel',
//		'chips': '../lib/materialize/js/chips',
//		'init': '../lib/materialize/js/init',
//		'initial': '../lib/materialize/js/initial',
//		'prism': '../lib/materialize/js/prism',
	},
	shim : {
		'jquery' : {
			exports : '$'
		},
		'underscore' : {
			exports : '_'
		},
		'handlebars' : {
			exports : 'Handlebars'
		},
		'leaflet' : {
			exports : 'L'
		},
		'materialize' : {
			deps : [ 'jquery', 'jquery.hammer', 'hammerjs', 'waves', 'velocity' ]
		}
	}
});

// We launch the App
require([ 'backbone', 'utils' ], function(Backbone, Utils) {
	require([ 'preloader', 'router' ], function(PreLoader, AppRouter) {

		require([ 'materialize' ], function(){
			$('.button-collapse').sideNav({
				menuWidth : 300,
				edge: 'left',
				closeOnClick: false
			});
			Waves.displayEffect();
			$('select').material_select();
		});

		document.addEventListener("deviceready", run, false);

		function run() {

			// Here we precompile ALL the templates so that the app will be
			// quickier when switching views
			// see utils.js
			Utils.loadTemplates().once("templatesLoaded", function() {

				var images = []; // here the developer can add the paths
				// to
				// the images that he would like to be
				// preloaded

				if (images.length) {
					new PreLoader(images, {
						onComplete : startRouter
					});
				} else {
					// start the router directly if there are no images to
					// be
					// preloaded
					startRouter();
				}

				function startRouter() {
					// launch the router
					var router = new AppRouter();
					Backbone.history.start();
				}
			});
		}

	});
});