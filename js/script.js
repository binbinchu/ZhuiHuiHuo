seajs.config({
	base: './js/src/', //配置use的基础路径
	alias: {
		'jquery': 'jquery.1.8.0.js',
		'swiper': 'swiper.js',
		'history': 'jquery.history.js',
		'tmpl': 'jquery.tmpl.js',
		'ajax': 'ajax.js',
		'mvc': 'mvc.js',
	}
});
//jq
seajs.use("ajax");
//seajs.use("tmpl");
seajs.use("swiper");
seajs.use("main.js", function(main) {
	main.headA();
	main.userTAB();
	main.Title();
});