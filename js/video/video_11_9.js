var uid = sessionStorage.getItem("uid");
var video = document.getElementById("video");
var playProgress = document.getElementById("playProgress");
var progressWrap = document.getElementById("progressWrap");
var playBtn = document.getElementById("play");
var currentTimer = 0;
var timer;
var ProgressTimer;
var BtnType;
function startScoket(uid,chaptersId,times,startType,BtnType){
    // console.log(vScoket);
    // debugger
    var vSocket = new WebSocket("ws://120.77.153.138:9555");
    if(BtnType == "List"){
        vSocket.onopen = function(event){
            vSocket.send('{"type":"open","data":{"uid":"'+uid+'","cid":"'+chaptersId+'"}}');
            vSocket.onmessage = function(event){
                console.log(event.data);
                var vData = event.data;
                var jsonStr = eval('['+vData+']');
                for(i in jsonStr){
                    currentTimer = jsonStr[i].data;
                    console.log(currentTimer)
                }
            };
            vSocket.onclose = function(){
                vSocket.close();
            }
        };
    }else if(BtnType == "Video"){
        vSocket.onopen = function(event){
            // debugger;
            timer = setInterval(function(){vSocket.send(vTime(uid,chaptersId,Math.round(video.currentTime)))},1000);
        };
    }
};
function vTime(uid,chaptersId,times){
    var jsonStr = '{"type":"isplay","data":{"uid":"'+uid+'","cid":"'+chaptersId+'","playtime":"'+times+'"}}'
    return jsonStr
};
//进度
function getProgress(){
    var percent = video.currentTime / video.duration;
    playProgress.style.width = percent * (progressWrap.offsetWidth) + "px";
};
//捕获点击进度条位置
function videoSeek(e){
    if(video.paused || video.ended){
        video.play();
        enhanceVideoSeek(e);
    }
    else{
        enhanceVideoSeek(e);
    }

};
function enhanceVideoSeek(e){
    clearInterval(ProgressTimer);
    var length = e.pageX - 300;
    var percent = length / progressWrap.offsetWidth;
    playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
    video.currentTime = percent * video.duration;
    currentTimer = video.currentTime;
    ProgressTimer = setInterval(getProgress, 60);
};
//课程相关资料
function cDatas(chapters_id,test){
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterMaterial",
        dataType: 'JSON',
        data: {
            cid: chapters_id
        },
        success: function(data) {
            var dataUrl = data.data.chapters_relevant_data;
            document.getElementById("c-outline_dataP").innerHTML = "<a href='http://admin.zhihuihuo.com.cn/"+dataUrl+"' target='_blank'>"+test+"的参考文献</a>"
        }
    });
};
//小节习题
function getQues(crouseId){
    $.ajax({
        type: "get",
        url: "http://admin.zhihuihuo.com.cn/api.php/GetChapterThink",
        dataType: 'JSON',
        data: {
            cid: crouseId
        },
        success: function(data) {
            if(data.state == 0) {
                $("#c_outlineSubjectError").tmpl(data).appendTo('#c-outline_subject');
            } else {
                var think = data.data.chapters_think;
                var thinkArr = think.replace(/\r/g,"<br/>");
                document.getElementById("c-outline_subject").innerHTML = thinkArr;
            }
        }
    });
}
$("#videoCid").die().live("click",function(){
    var chaptersId = $(this).attr("chapters-id");
    BtnType = "List";
    var startType = $(this).attr("link-type");
    var aTest = $(this).find(".KCname").text();
    var urlStr = $(this).find("input").val();
    var times;
    if(startType == 2){
        progressWrap.addEventListener("mousedown",function(e){
            videoSeek(e);
        });
        $(this).addClass("colorHover").siblings().removeClass("colorHover")
        $(this).attr("click-type","true").siblings().attr("click-type","false");
        getQues(chaptersId);
        cDatas(chaptersId,aTest);
        // startScoket(uid,chaptersId,times,startType,BtnType);
        $("#video").attr({
            "src":"http://"+urlStr,
            "link-type":startType,
            "chapters-id":chaptersId
        });
        $("#video").currentTime = 0;
    }else if(startType == 1){
        var unStart =  $(this).prev().attr("link-type");
        if(unStart == 2 || $(this).index() == 3){
            $(this).addClass("colorHover").siblings().removeClass("colorHover");
            progressWrap.removeEventListener("mousedown",function(e){
                videoSeek(e)
            });
            $(this).attr("click-type","true").siblings().attr("click-type","false");
            getQues(chaptersId);
            cDatas(chaptersId,aTest);
            startScoket(uid,chaptersId,times,startType,BtnType);
            $("#video").attr({
                "src":"http://"+urlStr,
                "link-type":startType,
                "chapters-id":chaptersId
            });
        }else{
            alert("你还未完成上一小节的观看!")
        }
    };

});
video.onclick = playBtn.onclick = function(){
    video.volume = 0.5;
    playBtn.className = (playBtn.className == "icon iconfont icon-shipinbofang"?"icon iconfont icon-shipinzanting":"icon iconfont icon-shipinbofang");
    BtnType = "Video";
    if(video.attributes["play"].nodeValue == "false"){
        video.setAttribute("play","true");
        video.play();
        video.currentTime = currentTimer;
        var times = video.currentTime;
        var chaptersId = $(this).attr("chapters-id");
        var startType = $(this).attr("link-type");
        ProgressTimer = setInterval(getProgress,1000);
        startScoket(uid,chaptersId,times,startType,BtnType);
    }else if(video.attributes["play"].nodeValue == "true"){
        video.pause();
        currentTimer = video.currentTime;
        // console.log(currentTimer);
        video.setAttribute("play","false");
        clearInterval(timer);
        clearInterval(getProgress);
    };
};
video.onended = function(){
    var cid = $(this).attr("chapters-id");
    // console.log(cid);
    $.ajax({
        type: "GET",
        url: "http://admin.zhihuihuo.com.cn/api.php/CourseFinish",
        dataType: 'JSON',
        data: {
            chaptersid: cid,
            studentid:uid
        },
        success: function(data) {
            // console.log(data);
            alert("视频结束!点击确定可观看下一小节!");
        }
    });
    $("#videoCid[click-type='true']").css({
        "color":"white"
    })
    clearInterval(timer);
    clearInterval(getProgress);
    var lastT = $("#videoCid[click-type='true']");
    lastT.next().attr("link-type","2");
};