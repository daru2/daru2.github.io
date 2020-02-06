$(document).ready(function(){

    /* 1page scroll */

    $(".page").each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
            var moveTop = $(window).scrollTop();
            var elmSelecter = $(".page").eq(index);
            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(elmSelecter).next() != undefined) {
                    try{
                        moveTop = $(elmSelecter).next().offset().top;
                    }catch(e){}
                }
            // 마우스휠을 아래에서 위로
            } else {
                if ($(elmSelecter).prev() != undefined) {
                    try{
                        moveTop = $(elmSelecter).prev().offset().top;
                    }catch(e){}
                }
            }
             
            // 화면 이동 0.5초(500)
            $("html,body").stop().animate({
                scrollTop: moveTop + 'px'
            }, {
                duration: 500, complete: function () {
                }
            });
        });
    });

    /* /1page scroll */


    /* 메뉴클릭시 위치로 스크롤 */

    $("#gnb .menu li, .menu_mo li").on("click", function(e){
        e.preventDefault();
        $(this).addClass("on").siblings().removeClass("on");
        var idx = $(this).index();
        var p_idx = $(".page").eq(idx);
        var p_distance = p_idx.offset().top;
        $("html, body").stop().animate({scrollTop : p_distance}, 500);
    });

    // $("#gnb .home_btn, .menu_mo").on("click", function(e){
    //     e.preventDefault();
    //     $(this).addClass("on");
    //     $("#gnb .menu li").removeClass("on");
    //     $("html, body").stop().animate({scrollTop : 0}, 500);

    // })

    /* /메뉴클릭시 위치로 스크롤 */


    /* 스크롤 시 page별 on클래스 부여 */

    var winH = parseInt($(window).height());
    $(window).scroll(function(){
        var cnt = parseInt($(this).scrollTop() / winH);
        if( cnt >= 0 ){
            $("#gnb .menu li").removeClass("on");
            $("#gnb .menu li").eq(cnt).addClass("on");
            $(".menu_mo li").removeClass("on");
            $(".menu_mo li").eq(cnt).addClass("on");
        } else {
            $("#gnb .menu li").removeClass("on");
            $(".menu_mo li").removeClass("on");
        }

        if( cnt == 3 ){
            $(".slider").fadeIn(500);
            setTimeout(function(){
                $(".btn_box").fadeIn(500);
            }, 500);
        }
    });

    /* /스크롤 시 page별 on클래스 부여 */

    /* page2 more 클릭 */
    $(".page2 .more_btn, .more_cls_btn").on("click", function(){
        $(this).toggleClass("on");
        $(".p2_left, .p2_right").toggleClass("on");
    });

    /* /page2 more 클릭 */

    /* page3 part 클릭 */
    $(".page3 .part").on("click", function(){
        $(this).addClass("on").siblings(".part").css("display","none");
        $(this).find("i").css("font-size","32px");
        $(".p3_cls_btn").addClass("on");
        $("p3_con").fadeIn(800);
    });

    $(".page3 .p3_cls_btn").on("click", function(){
        $(".part").removeClass("on").fadeIn(300);
        $(".part").find("i").css("font-size","120px");
        $(".p3_cls_btn").removeClass("on");
    });

    /* /page3 part 클릭 */

    /* page4 슬라이더 */

    // .sl Class = left: 100vw;
    // .sl.on Class = left: 0;
    // .sl.out Class = left: -100vw;

    var len = $(".sl").length - 1;

    function nextAni(){
        $(".sl").eq(1).addClass("on").css("transition", "0.5s");
        
        setTimeout(function(){
            $(".sl").eq(0).removeClass("on");
            $(".sl").eq(0).appendTo(".slider");
            $(".sl").eq(0).siblings().css("transition", "none");
            $(".sl").eq(len).addClass("out");
            $(".sl").eq(len).siblings().removeClass("out");
        }, 500);
    }
    function prevAni(){
        setTimeout(function(){
            $(".sl").eq(len).removeClass("out");
            $(".sl").eq(len).addClass("on").css("transition", "0.5s");
        }, 1);
        setTimeout(function(){
            $(".sl").eq(0).removeClass("on");
            $(".sl").eq(len).prependTo(".slider");
            $(".sl").eq(0).siblings().css("transition", "none");
            $(".sl").eq(len).addClass("out");
            $(".sl").eq(len).siblings().removeClass("out");
        }, 500);
        
    }
    // 버튼 연속 클릭 막고 동작
    $(".next_btn").on("click", function(){
        nextAni();
        var btn = $(".next_btn, .prev_btn");
        btn.attr("disabled", true);
        setTimeout( function() {
            btn.removeAttr("disabled");
        }, 700);
    });


    $(".prev_btn").on("click", function(){
        prevAni();
        var btn = $(".next_btn, .prev_btn");
        btn.attr("disabled", true);
        setTimeout( function() {
            btn.removeAttr("disabled");
        }, 700);
    });

    /* /page4 슬라이더 */


    /* 모바일 */
    
    $(".gnb_btn_mo, .gnb_cls_btn_mo").on("click", function(){
        $("#gnb_mo").fadeToggle(200);
    });

    if(parseInt($(window).width()) < 1280){
        $(".part i").css("font-size", "80px");
        $(".sl_link i").css("font-size", "30px");
        $(".menu_icon").on("click", function(){
            $("#hd").toggleClass("on");
        });
    }
    /* /모바일 */
});