


$(document).ready(function() {
    var movementStrength = 20;
    var height = movementStrength / $(".feature-box").height();
    var width = movementStrength / $(".feature-box").width();

    $(".feature-box").mousemove(function(e){
        var pageX = e.pageX - ($(this).width() / 2);
        var pageY = e.pageY - ($(this).height() / 2);
        var newvalueX = width * pageX * -1;
        var newvalueY = height * pageY * -1;
        $(this).css("background-position", newvalueX + "px " + newvalueY + "px");
    });

//    ---------------------------

    var mouseX = 0
        , mouseY = 0
        , mouseLastX = 0
        , mouseLastY = 0
        , mouseDirectionX = 0
        , mouseDirectionY = 0
        , mouseSpeedX = 0
        , mouseSpeedY = 0;
    function mouseDirection(e) {
        if (mouseX < e.pageX)
            mouseDirectionX = 1;
        else if (mouseX > e.pageX)
            mouseDirectionX = -1;
        else
            mouseDirectionX = 0;
        if (mouseY < e.pageY)
            mouseDirectionY = 1;
        else if (mouseY > e.pageY)
            mouseDirectionY = -1;
        else
            mouseDirectionY = 0;
        mouseX = e.pageX;
        mouseY = e.pageY;
    }

    $(document).on('mousemove',mouseDirection);

    function mouseSpeed() {
        mouseSpeedX = mouseX - mouseLastX;
        mouseSpeedY = mouseY - mouseLastY;
        mouseLastX = mouseX;
        mouseLastY = mouseY;
        setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();

    $(document).mousemove(function(e){
        var per100 = Math.floor(e.pageX / $(window).width() * 100);
        if(per100 < 9 || per100 > 91){
            $('.pagenav').css('visibility','visible');
        }else{
            $('.pagenav').css('visibility','hidden');
        }
    });

    function getCirclePoints(radius,segments){
        var x,y;
        for(var i=0;i<segments;i++){
            x = 200+radius*Math.sin(i*2*Math.PI/segments);
            y = 200+radius*Math.cos(i*2*Math.PI/segments);
            // totalPoints.push({'x':x,'y':y});
            x = x.toFixed(5);
            y = y.toFixed(5);
            $('.vision-circle').find('.segment').eq(i).css({left: x + 'px',top: y + 'px'});
        }

    }

    // getCirclePoints(200,40);

    // //Firefox
    // $(document).bind('DOMMouseScroll', function(e){
    //     if(e.originalEvent.detail > 0) {
    //         //scroll down
    //         console.log('Down');
    //     }else {
    //         //scroll up
    //         console.log('Up');
    //     }
    //
    //     //prevent page fom scrolling
    //     return false;
    // });
    //
    // //IE, Opera, Safari
    // $(document).bind('mousewheel', function(e){
    //     if(e.originalEvent.wheelDelta < 0) {
    //         //scroll down
    //         console.log('Down');
    //     }else {
    //         //scroll up
    //         console.log('Up');
    //     }
    //
    //     //prevent page fom scrolling
    //     return false;
    // });


    var mouseDown = false;

    function visionNavigation(down) {
        var noOfSlices = $('.vision-navigation').find('.li').length;
        var currentIndex = $('.vision-navigation').find('li.active').index() + 1;
        var current = $('.vision-navigation').find('li.active');

        var next,prev;
        next = $('.vision-navigation').find('li').eq(currentIndex);
        prev = $('.vision-navigation').find('li').eq(currentIndex - 2);
        // var nextDash = next.find('.dash');
        // var currentDash = current.find('.dash');
        var navCircle = $('.vision-nav-cont .circleMove');
        if(down == true){
            if(currentIndex == noOfSlices){
                // next = $('.vision-circle').find('.slice').eq(0);
                return;
            }
            TweenMax.to(navCircle,1,{top: '+=74',ease: Circ.easeOut,onComplete:function () {
                current.removeClass('active');
                next.addClass('active');
            }},0.2);

        }else{
            if(currentIndex == 1){
                // prev = $('.vision-circle').find('.slice').eq(noOfSlices - 1);
                return;
            }

            TweenMax.to(navCircle,1,{top: '-=74',ease: Circ.easeOut,onComplete:function () {
                current.removeClass('active');
                prev.addClass('active');
            }},-0.2);

        }
        $(document).on('mousewheel DOMMouseScroll',verticalNav);
    }

    function verticalCircleNav(down) {
        var noOfSlices = $('.vision-circle').find('.slice').length;
        var currentIndex = $('.vision-circle').find('.slice.is-current').index() + 1;
        var current = $('.vision-circle').find('.slice.is-current');

        var next,prev;
        next = $('.vision-circle').find('.slice').eq(currentIndex);
        prev = $('.vision-circle').find('.slice').eq(currentIndex - 2);
        var nextDash = next.find('.dash');
        var currentDash = current.find('.dash');
        if(down == true){
            if(currentIndex == noOfSlices){
                // next = $('.vision-circle').find('.slice').eq(0);
                return;
            }
            TweenMax.staggerTo(nextDash,1,{rotation:"+=180",clearProps:"all",onComplete:function () {
                current.addClass('is-active').removeClass('is-current');
                next.addClass('is-current');
            }},0.2);

        }else{
            if(currentIndex == 1){
                // prev = $('.vision-circle').find('.slice').eq(noOfSlices - 1);
                return;
            }
            TweenMax.staggerTo(currentDash,1,{rotation:"+=180_ccw",clearProps:"all",onComplete:function () {
                current.removeClass('is-current');
                prev.addClass('is-current').removeClass('is-active');
            }},-0.2);

        }
        // $(document).on('mousewheel DOMMouseScroll',verticalNav);
    }

    function mouseUpDownActions(down) {

        if(down == true){
        }else{
        }
    }

    function verticalNav(e) {
        if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
            if(e.originalEvent.detail > 0) {
                mouseDown = true;
            } else if(e.originalEvent.detail < 0){
                mouseDown = false;
            }
        } else if (typeof e.originalEvent.wheelDelta == 'number') {
            if(e.originalEvent.wheelDelta < 0) {
                mouseDown = true;
            } else if(e.originalEvent.wheelDelta > 0) {
                mouseDown = false;
            }
        } else if (e.type == 'keyup') {
            if (e.which == 40)
                mouseDown = true;
            else if (e.which == 38)
                mouseDown = false;
        } else if (e.type == 'arrow') {
            if (e.direction == 'up')
                mouseDown = true;
            else
                mouseDown = false;
        }
        mouseUpDownActions(mouseDown);
        verticalCircleNav(mouseDown);
        visionNavigation(mouseDown);
        // $(document).off('mousewheel DOMMouseScroll',verticalNav);
    }

    $(document).on('mousewheel DOMMouseScroll',verticalNav);
    $(document).on('keyup',verticalNav);


    TweenMax.from(".slice .dot",1,{left:200,top:200,ease: Back.easeOut.config(2),clearProps:"all"});
    // TweenMax.from(".vision-circle",5,{rotation:360,delay:1});
    TweenMax.staggerFrom(".slice .dash",1,{opacity:0,left:200,top:200,rotation:360,delay:1,clearProps:"all"},0.1);


});

