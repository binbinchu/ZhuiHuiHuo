define(function(require, exports, moudles) {
	var $ = require("jquery");
	require("history")($);
	$(document).ready(function($) {
		function load(num) {
			$('#content').load(num + ".html");
		};
		$.history.init(function(url) {
			load(url == "" ? "index" : url);
		});

		$('.c-head-nav_u li a').die().live('click', function(e) {
			var url = $(this).attr('href');
			url = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
			$.history.load(url);
			return false;
		});
	});
})