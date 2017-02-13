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
		'velocity': '../lib/materialize/js/velocity.min',
		'waves' : '../lib/materialize/js/waves',
		'jquery.hammer' : '../lib/materialize/js/jquery.hammer',
		'xml2json' : '../lib/xml2json/xml2json',
		'md5' : '../lib/md5/md5',
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

		// Inizializzazione dei componenti grafici di Materialize
		require([ 'materialize' ], function(){
			$('.button-collapse').sideNav({
				menuWidth : 300,
				edge: 'left',
				closeOnClick: false
			});
			Waves.displayEffect();
			$('select').material_select();
		});
		
		// Costanti
		window.baseUrl = "http://loveitaly.altervista.org/api";
//		window.baseUrl = "http://192.168.56.101/loveitaly/api";
		window.apiKey = "IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";
		window.encryptionKey = "7j3EQiXxwscCNaOIORd8YqmvkjfEmDVxs4EcihNJNVNyCG4bHA3ThTnk";
		
		document.addEventListener("offline", function(e) { 
			var toastContent = 'Connessione dati assente';
			Materialize.toast(toastContent, 5000);
		}, false);

		document.addEventListener("online", function(e) {
			$("#content").empty();
			Backbone.history.loadUrl(Backbone.history.fragment);
		}, false);
		
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