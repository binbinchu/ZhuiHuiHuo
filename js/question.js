$(".beginA").live('click',function(){
	var exampaper_id = $(this).attr("sid");
	var exampaper_courseid = $(this).attr("courseid");
	var sid = sessionStorage.setItem("sid",exampaper_id);
	var courseid = sessionStorage.setItem("courseid",exampaper_courseid);
});
