var username = sessionStorage.getItem("username");
var uid = sessionStorage.getItem("uid");
if(username) {
	$("#login_A").html(username);
}

//学生登录
function StudentLogin(admin, password) {
	$.ajax({
		type: 'post', //提交的方式
		url: 'http://admin.zhihuihuo.com.cn/api.php/SLogin', //请求地址
		data: {
            username: admin,
            password: password
		},
		dataType: 'JSON',
        beforeSend:loadingImg(),
		success: function(data) {
			if(data.state == 0) {
				alert("用户不存在");
			} else if(data.state == 1) {
                //本地记录登录状态
				sessionStorage.setItem("uid", data.data.user.user_id);
				sessionStorage.setItem("username", data.data.user.user_name);
				sessionStorage.setItem("userimg", data.data.user.user_avatar);
				sessionStorage.setItem("userType", data.data.user.user_type);
                sessionStorage.setItem("userLevel", data.data.user.level);
				var username = sessionStorage.getItem("username");
				$("#login_A").html(username);
                window.location.reload();
			}
		}
    });
};

//老师登录
function TeacherLogin(admin, password) {
    $.ajax({
        type: 'post', //提交的方式
        url: 'http://admin.zhihuihuo.com.cn/api.php/TLogin', //请求地址
        data: {
            username: admin,
            password: password
        },
        dataType: 'JSON',
        success: function (data) {
            if (data.state == 0) {
                alert("用户不存在");
            } else if (data.state == 1) {
                //本地记录登录状态
                sessionStorage.setItem("uid", data.data.user.user_id);
                sessionStorage.setItem("username", data.data.user.user_name);
                sessionStorage.setItem("userimg", data.data.user.user_avatar);
                sessionStorage.setItem("userType", data.data.user.user_type);
                sessionStorage.setItem("userLevel", data.data.user.level);
                //老师基本信息
                sessionStorage.setItem("teacher_jobs", data.data.teacher.teacher_jobs); //职位
                sessionStorage.setItem("teacher_description", data.data.teacher.teacher_description); //简介
                sessionStorage.setItem("teacher_phone", data.data.teacher.teacher_phone); //电话
                sessionStorage.setItem("teacher_collegeid", data.data.teacher.teacher_collegeid);
                sessionStorage.setItem("teacher_avatar", data.data.teacher.teacher_avatar);
                var username = sessionStorage.getItem("username");
                $("#login_A").html(username);
                window.location.reload();
            }
        }
    });
};
//点击事件-->学生登录
$('.z-sl').live('click', function () {
    var admin = $(".username").val();
    var password = $(".password").val();
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("admin", admin);
    StudentLogin(admin, password);
});
//老师登录
$(".z-tl").live('click', function () {
    var admin = $('.username').val();
    var password = $('.password').val();
    sessionStorage.setItem("admin", admin);
    sessionStorage.setItem("password", password);
    TeacherLogin(admin, password);
});
//键盘事件
$("#login_A").live('click', function () {
    $(document).keydown(function (event) {
        var LoginType = $("#LoginType").val();
        var admin = $('.username').val();
        var password = $('.password').val();
        if (event.keyCode == 13 && LoginType == 2) {
            //老师登录处理
            TeacherLogin(admin, password);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("admin", admin);
        } else if (event.keyCode == 13 && LoginType == 1) {
            //学生登录处理
            StudentLogin(admin, password);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("admin", admin);
        }
    });
});

//页面头部
$(".c-head-nav_ul li").click(function() {
	var title = $(this).attr("link-name");
	document.title = "智慧火—"+title;
});
//个人中心的连接处理
var userType = sessionStorage.getItem("userType");
if (userType == 1) {
    $(".c-user-contorl li a:first").attr("href", "#user");
} else if (userType == 2) {
    $(".c-user-contorl li a:first").attr("href", "#teacherpage");
};

//搜索接口
function Search(val) {
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/Search",
        dataType: 'JSON',
        data: {
            text: val
        },
        success: function (data) {
            console.log(data.data);
            $('.search_CrouseLi').remove();
            $(".search_ChartLi").remove();
            $(".search_QuesLi").remove();
            if (data.data.course.length >= 1) {
                for (i in data.data.course) {
                    $("#search_CrouseUl").tmpl(data.data.course[i]).appendTo('.search_CrouseUl');
                }
            }
            ;
            if (data.data.forum.length >= 1) {
                for (i in data.data.forum) {
                    $("#search_ChartUl").tmpl(data.data.forum[i]).appendTo('.search_ChartUl');
                }
            }
            ;
            if (data.data.question.length >= 1) {
                for (i in data.data.question) {
                    $("#search_QuesUl").tmpl(data.data.question[i]).appendTo(".search_QuesUl");
                }
            }
            ;
        }
    });
};
//绑定键盘事件
$("#c-search").focus(function () {
    $(this).keydown(function (event) {
        var val = $("#c-search").val();
        if (event.keyCode == 13) {
            $("#c-search").hide("slow");
            window.location.hash = "#search";
            Search(val);
        }
    });
    return false;
});

//我的提醒
$.ajax({
    type: 'post',
    url: 'http://admin.zhihuihuo.com.cn/api.php/Myremind',
    dataType: 'JSON',
    data: {
        uid: uid
    },
    success: function (data) {
        if (data.state == 0) {
            $("#demo_noticeNaN").tmpl(data).appendTo(".demo_notice");
        } else {
            $("#demo_notice").tmpl(data).appendTo(".demo_notice");
        }
    }
});


//底部事件处理
$(".footer_A").click(function () {
    var footerUrl = $(this).attr('link-id');
    sessionStorage.setItem('footerUrl', footerUrl)
});

