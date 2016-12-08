/**
 * 弹窗 ui-pop
 */

//关闭
$(".ui-pop .btn-closepop").click(function(){
    $(this).closest(".ui-pop").hide();
    $(".layout-mod").removeClass("layout-mod-pop");
})

//打开，由指定元素触发
function popOpen(ele){
    $("#"+ele).show();
    $(".layout-mod").addClass("layout-mod-pop");
}
    
