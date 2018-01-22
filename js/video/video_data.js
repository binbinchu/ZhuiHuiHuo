//获取预载动画
var loadHTMLAjax = loadHTML();

function MenuAnimate() {
    $(".c-video_H h3 span:first").click(function () {
        $(".c-vedio_menu").toggleClass("c-vedio_menu_active");
        $(this).find("i").toggleClass("hiddenBox")
    });
};
MenuAnimate();
var urlStr = sessionStorage.getItem("urlStr");
var cid = sessionStorage.getItem("cid");
var uid = sessionStorage.getItem("uid");
var cicourse_name = sessionStorage.getItem("cicourse_name");
$("#cicourse_name").text(cicourse_name);
$(".video").attr("src", "http://" + urlStr);
$.ajax({
    type: "get",
    url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterList",
    dataType: 'JSON',
    data: {
        uid: uid,
        cid: cid
    },
    beforeSend:function(){
      $("body").append(loadHTMLAjax);
    },
    success: function (data) {
        console.log(data)
        if (data.data == null) {
            if (confirm("暂无视频,确认返回上一页")) {
                history.go(-1);
            };
        }
        for (i in data.data) {
            if (data.data[i].chapters_pid == 0) {
                $("#videoMZ").tmpl(data.data[i]).appendTo(".videoM");
            } else {
                $("#videoM").tmpl(data.data[i]).appendTo(".videoM");
            }
        }
    },
    complete:function(){
        loadHTMLAjax.remove();
    }
});



