$(".chartCon_Img img").die().live("click",function(){
    var imgURL = $(this).attr("src");
    $("<div class='imgAmp'><i></i><img id='imgID' style='cursor: move;' src='"+imgURL+"' onmousewheel=\"return bigimg(this)\" /></div>").appendTo('body');
    $(".imgAmp").css({
        "overflow":"auto",
    });
    $('body').css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
    });
});
$(".imgAmp").die().live("click",function(){
    $(this).remove();
    $('body').css({
        "overflow-x":"auto",
        "overflow-y":"auto"
    });
});
function bigimg(i)
{
    var zoom = parseInt(i.style.zoom,10)||100;
    zoom += event.wheelDelta / 12;
    if(zoom > 0 )
        i.style.zoom=zoom+'%';
    return false;
};
window.onload = function(){
    var imgID = document.getElementById("imgID");
    imgID.onmousedown = function(ev){
        var oevent = ev || event;
        var distanceX = oevent.clientX - element.offsetLeft;
        var distanceY = oevent.clientY  - element.offsetTop;

        document.onmousemove = function(ev){
            var oevent = ev || event;
            element.style.left = oevent.clientX - distanceX + 'px';
            element.style.top = oevent.clientY - distanceY + 'px';
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };
};



