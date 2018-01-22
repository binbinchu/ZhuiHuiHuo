define(function(require, exports, module) {
	var $ = require('jquery');
	var cNavUlW = $('.c-head-nav_ul').width();
    var cNavLiw = cNavUlW / 5 - 10;
	var explorer = window.navigator.userAgent;
	if(explorer.indexOf("MSIE") >= 0) {
		$('.c-head-contorl_search').find('input').css("width", "80%");
	}

	$('.c-head-nav_ul li').css("width", cNavLiw);
	//头部点击样式;

	$('.c-head-contorl_t').click(function() {
		$('.c-demo_noticeCard').css("display", "block");
	});
	$('.c-close').click(function() {
		$('.c-demo_noticeCard').css("display", "none");
	});

	$('.z-answer').click(function() {
		$('.z-submit').show();
		cente();
	})
	$(window).resize(function() {
		cente();
	});

	function cente() {
		var _top = ($(window).height() - $(".z-submit").height()) / 2;
		var _left = ($(window).width() - $(".z-submit").width()) / 2;
		$(".z-submit").css({
			top: _top,
			left: _left
		});
	}
	//	用户登录;
	function Login(){
        $("#login_A").click(function() {
            var hiddenV = sessionStorage.getItem("userType");
            console.log(hiddenV);
            if(hiddenV) {
                $(".c-user-contorl").toggle(450);
            } else {
                $("#z-gray").show();
                $(".z-wrap").show();
                center();
            }
        });
	};
    Login();
	$(".c-user-contorl>li").click(function() {
		$(".c-user-contorl").toggle(450);
	});
	//用户登出
	$("#logout").click(function() {
		sessionStorage.removeItem("uid");
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("userimg");
		sessionStorage.removeItem("userType");
		window.location.reload();
	});
	
	$(".z-cancel").click(function() {
		close();
	});
	$(".z-sl,z-tl").click(function(){
		close();
	})
	function close() {
		$("#z-gray").hide();
		$(".z-wrap").hide();
	};
	$(window).resize(function() {
		center();
	});

	function center() {
		var _top = ($(window).height() - $(".z-wrap").height()) / 2;
		var _left = ($(window).width() - $(".z-wrap").width()) / 2;
		$(".z-wrap").css({
			top: _top,
			left: _left
		});
	}
	$('.z-stuLn').click(function() {
		$(".z-pic").hide();
		$(".z-stupic").show();
		$(".z-teaLogin").hide();
		$(".z-stuLogin").show();
		$(".z-stuLn").hide();
		$(".z-teaLn").show();
		$(".z-tl").hide();
		$(".z-sl").show();
        $("#LoginType").val(1);
    });
	$('.z-teaLn').click(function() {
        $(".z-pic").show();
        $(".z-stupic").hide();
        $(".z-teaLogin").show();
        $(".z-stuLogin").hide();
        $(".z-stuLn").show();
        $(".z-teaLn").hide();
        $(".z-tl").show();
        $(".z-sl").hide();
        $("#LoginType").val(2);
    });

    //个人主页TAB
	function userTAB() {
		$('.z-topic-list').live("click", function() {
			var i = $(this).index();
			$('.z-topic-listItem').hide();
			$('.z-topic-listItem').eq(i).show();

			$(this).addClass('hover').siblings().removeClass('hover');
			$('.z-border').css('bottom', 228 + (-i * 60))
		});
	};

	function Title() {

	};

	//
	function headA() {
		$('.c-head-nav_ul li').click(function() {
			$(this).addClass('headA').siblings().removeClass('headA')
		});
		$('.c-demo_logo').click(function(){
            $('.c-head-nav_ul li:first').addClass('headA').siblings().removeClass('headA');
            document.title = "首页";
		});
	};
	exports.headA = headA;
	exports.userTAB = userTAB;
	exports.Title = Title;
});