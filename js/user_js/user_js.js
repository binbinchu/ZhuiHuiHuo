$(function() {
	$(".userChart_Li").live('click', function() {
		var forum_id = $(this).attr("forum-id");
		sessionStorage.setItem("fid", forum_id);
	});
	//登录信息
	var username = sessionStorage.getItem("username");
	var uid = sessionStorage.getItem("uid");
	var userimg = sessionStorage.getItem("userimg");
	var userLevel = sessionStorage.getItem("userLevel");
	if(username) {
		$("#chartUser").html(username);
		$("#userLevel").html(userLevel + "级");
		$(".z-mainPic img").attr("src", "http://admin.zhihuihuo.com.cn/" + userimg);
	} else {
		alert("您还没登录!")
	}
	//我的帖子与回复
	$('.z-card').each(function() {
		$('.z-card').live("click", function() {
			var i = $(this).index();
			$('.z-details').hide();
			$('.z-details').eq(i).show();
			$(this).siblings('.z-card').children().removeClass('selected');
			$(this).children().addClass('selected');
			$('.z-smallBar').css('left', 50 + i * 170);
		});
	});

	//我的成绩
	$(function() {
		$('.z-result .z-cancel').live('click', function() {
			$(this).prevAll().not('.z-sole').hide();
			$(this).css("display", "none");
			$(".z-in").removeClass("z-intro");
		});
		$('.z-in').live('click', function() {
			$(this).prev().children().show();
			$(this).addClass("z-intro");
		})
	});
	
	//编辑资料
	$(".userEditor").click(function(){
		$(".userEditorWra").show("slow");
		$('body').css({ 
             "overflow-x":"hidden",
             "overflow-y":"hidden"       
         });
		return false;
	});
	$("#close").click(function(){
		$(".userEditorWra").hide("slow");
		$('body').css({ 
             "overflow-x":"auto",
             "overflow-y":"auto"        
        });
		return false;
	});
});