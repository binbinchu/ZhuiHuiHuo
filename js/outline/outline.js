var cid = sessionStorage.getItem("cid");
var uid = sessionStorage.getItem("uid");
//获取预载动画
var loadHTMLAjax = loadHTML();
//课程报名
$(".signUp").die().live('click', function() {
    $.ajax({
        type: 'get',
        url: 'http://admin.zhihuihuo.com.cn/api.php/CourseSign',
        async:false,
        data: {
            uid: uid,
            courseid: cid
        },
        dataType: 'JSON',
        success: function(data) {
            console.log(data)
            if(!uid) {
                alert('请先登录!');
            }else{
                alert(data.message);
                $(".signUp").removeAttr('class').attr({
                    "href": "#video",
                    "class": "videoP"
                }).text("开始课程");
            }
        }
    });
});
if(!uid){
    $("#c_outlineSubjectError").tmpl("").appendTo('#c-outline_subject');
    $("#c_VideoLoginError").tmpl("").appendTo(".video_List");
}
else{
    //获取课程信息
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterList",
        data: {
            uid: uid,
            cid: cid
        },
        dataType: 'JSON',
        success: function(data) {
            if(data.state == 0) {
                $("#video_ListError").tmpl(data).appendTo(".video_List");
            } else if(data.state == 1) {
                if(data.data.data == "error"){
                    $("#c_LoginError").tmpl(data).appendTo(".video_List");
                }else if(!data.data.data){
                    for(i in data.data) {
                        if(data.data[i].chapters_pid == 0) {
                            $("#video_Ul").tmpl(data.data[i]).appendTo(".video_List");
                        } else {
                            $("#video_List").tmpl(data.data[i]).appendTo(".video_List");
                            // videoUrl();
                        }
                    }
                }
            };
            //判断课程是否报名
            $.ajax({
                type: "get",
                url: "http://admin.zhihuihuo.com.cn/api.php/hasSingUpCourse",
                dataType: 'JSON',
                data: {
                    uid: uid,
                    cid: cid
                },
                success: function(data) {
                    if(data.data.isSing == true) {
                        $(".signUp").remove();
                        $("<a>开始课程</a>").attr({
                            "href": "#video",
                            "class": "videoP"
                        }).appendTo(".c-outline_enlistBtn");
                        alert("本课程您已报名,可立即开始课程");
                    }
                },
            });
        }
    });
};
//课堂信息
$.ajax({
    type: "get",
    url: "http://admin.zhihuihuo.com.cn/api.php/CourseAbstract",
    dataType: 'JSON',
    data: {
        cid: cid
    },
    beforeSend:function(){
      $("body").append(loadHTMLAjax);
    },
    success: function(data) {
        console.log(data);
        $("#crouseLi").tmpl(data.data).appendTo(".c-outline_tabActive");
        $("#c-outline_introduce").tmpl(data.data).appendTo(".c-outline_introduce");
        $("#DH").tmpl(data.data).appendTo(".DH");
        //考核标准
        var lession = data.data.course_ass_standard,
            lessionStr = lession.replace(/\r/g,"<br/>");
        //课程大纲
        // var Gcrouse = data.data.course_outline,
        //     GcrouseStr = Gcrouse.replace(/\r/g,"<br/>");
        //课程重点
        var crousePoint = data.data.course_hard,
            crousePointStr = crousePoint.replace(/\r/g,"<br/>");
        //课程难点
        var diffPoint = data.data.course_difficulty,
            diffPointStr = diffPoint.replace(/\r/g,"<br/>");
        document.getElementById("lession").innerHTML = lessionStr;
        // document.getElementById("Gcrouse").innerHTML = GcrouseStr;
        document.getElementById("crousePoint").innerHTML = crousePointStr;
        document.getElementById("diffPoint").innerHTML = diffPointStr;
    },
    complete:function(){
        loadHTMLAjax.remove();
    }
});
//章节评论
function outlinePost(){
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterComment",
        dataType: 'JSON',
        data: {
            uid: uid,
            cid: cid
        },
        success: function(data) {
            for(i in data.data) {
                $("#chapter_List").tmpl(data.data[i]).appendTo(".chapter_List");
            }
        }
    });
};
outlinePost();
//章节评论回复
$(".chapter_replaySend").die().live('click', function() {
    var comment = $(this).parent().find(".chapter_replayInp").val();
    var pid = $(this).attr('chapterchat-id');
    $.ajax({
        type: "post",
        url: "http://admin.zhihuihuo.com.cn/api.php/AddComment",
        dataType: 'JSON',
        data: {
            uid: uid,
            cid: cid,
            comment: comment,
            pid: pid
        },
        success: function(data) {
            alert(data.message);
            $(".chapter_ListLi").remove();
            $(".chapter_replayLi").remove();
            outlinePost();
        }
    });
});

//提交章节评论
$("#outline_btn").die().live("click",function() {
    $.ajax({
        type: "post",
        url: "http://admin.zhihuihuo.com.cn/api.php/AddComment",
        dataType: 'JSON',
        data: {
            uid: uid,
            cid: cid,
            comment: $(".z-interFt").text()
        },
        success: function(data) {
            if(!uid) {
                alert("请先登录!");
                return false;
            } else {
                alert("评论成功!");
                $(".chapter_replayLi").remove();
                $(".chapter_ListLi").remove();
                $("#thumb").animate({
                    scrollTop:2000
                },500);
                outlinePost();
            }

        }
    });
});
//章节评论点赞
$(".outline_Like").die().live('click', function() {
    var chapterchat_id = $(this).attr('chapterchat-id');
    console.log(chapterchat_id);
    var that = this
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/ILikeThisChapterCommrnt",
        dataType: 'JSON',
        data: {
            uid: uid,
            cid: chapterchat_id
        },
        success: function(data) {
            // alert(data.message);
            if(data.message == "success"){
                alert("点赞成功!");
                var figure = $(that).find('span').text();
                var newFigure = parseInt(figure) + 1;
                $(that).find('span').text(newFigure);
            }else{
                alert("点赞失败!")
            }
        }
    });
});
//课程相关资料
function cDatas(chapterid,test){
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterMaterial",
        dataType: 'JSON',
        data: {
            cid: chapterid
        },
        success: function(data) {
            var dataUrl = data.data.chapters_relevant_data;
            document.getElementById("c-outline_subject").innerHTML = "<a href='http://admin.zhihuihuo.com.cn/"+dataUrl+"' target='_blank'>"+test+"的参考文献</a>"
        }
    });
};
$("#video_ListLi").die().live("click",function(){
    var crouseId = $(this).find("a").attr("cid");
    var aTest = $(this).find("a").text();
    cDatas(crouseId,aTest);
    $("li[data-type='c-outline_vedio']").removeClass("color");
    $("li[data-type='c-outline_vedio']").find("span").removeClass("c-outline_tabUlAc");
    $("#c-outline_vedio").removeClass("c-outline_tabActive")
    $("li[data-type='c-outline_subject']").addClass("color");
    $("li[data-type='c-outline_subject']").find("span").addClass("c-outline_tabUlAc");
    $("#c-outline_subject").addClass('c-outline_tabActive');
});
(function(){
    if($("#c-outline_subject").children().find("a").length == 0){
        document.getElementById("c-outline_subject").innerHTML = "请先选择您想看的小节"
    }
})();

