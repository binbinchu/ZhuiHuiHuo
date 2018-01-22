var cid = sessionStorage.getItem("cid");
var uid = sessionStorage.getItem("uid");
var chapters_id = sessionStorage.getItem("chapters_id");
//课堂信息
$.ajax({
    type: "get",
    url: "http://admin.zhihuihuo.com.cn/api.php/CourseAbstract",
    dataType: 'JSON',
    data: {
        cid: cid
    },
    success: function(data) {
        $("#crouseLi").tmpl(data.data).appendTo(".c-outline_tabActive");
        //考核标准
        var lession = data.data.course_ass_standard,
            lessionStr = lession.replace(/\r/g,"<br/>");
        //课程重点
        var crousePoint = data.data.course_hard,
            crousePointStr = crousePoint.replace(/\r/g,"<br/>");
        //课程难点
        var diffPoint = data.data.course_difficulty,
            diffPointStr = diffPoint.replace(/\r/g,"<br/>");
        document.getElementById("lession").innerHTML = lessionStr;
        document.getElementById("crousePoint").innerHTML = crousePointStr;
        document.getElementById("diffPoint").innerHTML = diffPointStr;
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
            console.log(data)
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
    var that = this;
    // console.log(uid);
    // console.log(chapterchat_id);
    // return false;
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/ILikeThisChapterCommrnt",
        dataType: 'JSON',
        data: {
            uid: uid,
            cid: chapterchat_id
        },
        success: function(data) {
            console.log(data)
            if(data.message == "success"){
                alert("点赞成功!");
                var figure = $(that).find('span').text();
                var newFigure = parseInt(figure) + 1;
                $(that).find('span').text(newFigure);
            }else{
                alert("点赞失败!");
            }
        }
    });
});