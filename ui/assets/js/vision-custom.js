


;(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
jQuery.fn.reverse = [].reverse;
String.prototype.toCamel = function() {
    var string = this.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase().replace('-', '');
    });
    string = string.replace(/(\/.*)/g, '');
    string = string.replace(/(^.){1}/g, function($1) {
        return $1.toUpperCase();
    });
    return string;
}
;
String.prototype.toLowerCamel = function() {
    var string = this.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase().replace('-', '');
    });
    string = string.replace(/(\/.*)/g, '');
    string = string.replace(/(^.){1}/g, function($1) {
        return $1.toLowerCase();
    });
    return string;
}
;
String.prototype.getHash = function() {
    var string = this.replace(WRK.host, '').replace(/^\//g, '').replace(/\/$/g, '');
    if (string == '')
        string = 'home';
    return string;
}
String.prototype.getSlug = function() {
    var string = this.replace(WRK.host, '').replace(/^\//g, '').replace(/\/$/g, '');
    if (string == '')
        string = 'home';
    return string;
}
function isImageOk(img) {
    _img = img.data('img');
    if (typeof _img == 'undefined') {
        var _img = new Image();
        _img.src = img.attr('src');
        img.data('img', _img);
    }
    if (!_img.complete) {
        return false;
    }
    if (typeof _img.naturalWidth != "undefined" && _img.naturalWidth == 0) {
        return false;
    }
    return true;
}
var imagesToLoad = null ;
(function($) {
    $.fn.queueLoading = function() {
        var maxLoading = 2;
        var images = $(this);
        if (imagesToLoad == null || imagesToLoad.length == 0)
            imagesToLoad = images;
        else
            imagesToLoad = imagesToLoad.add(images);
        var imagesLoading = null ;
        function checkImages() {
            imagesLoading = imagesToLoad.filter('.is-loading');
            imagesLoading.each(function() {
                var image = $(this);
                if (isImageOk(image)) {
                    image.addClass('is-loaded').removeClass('is-loading');
                    image.trigger('loaded');
                }
            });
            imagesToLoad = images.not('.is-loaded');
            loadNextImages();
        }
        function loadNextImages() {
            imagesLoading = imagesToLoad.filter('.is-loading');
            var nextImages = imagesToLoad.slice(0, maxLoading - imagesLoading.length);
            nextImages.each(function() {
                var image = $(this);
                if (image.hasClass('is-loading'))
                    return;
                image.attr('src', image.attr('data-src'));
                image.addClass('is-loading');
            });
            if (imagesToLoad.length != 0)
                setTimeout(checkImages, 25);
        }
        checkImages();
    }
    ;
}(jQuery));
function popupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 3) - (h / 3)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus)
        newWindow.focus();
}
(function() {
    var baseEasings = {};
    $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
        baseEasings[name] = function(p) {
            return Math.pow(p, i + 2);
        }
        ;
    });
    $.extend(baseEasings, {
        Sine: function(p) {
            return 1 - Math.cos(p * Math.PI / 2);
        },
        Circ: function(p) {
            return 1 - Math.sqrt(1 - p * p);
        },
        Elastic: function(p) {
            return p === 0 || p === 1 ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
        },
        Back: function(p) {
            return p * p * (3 * p - 2);
        },
        Bounce: function(p) {
            var pow2, bounce = 4;
            while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
            return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
        }
    });
    $.each(baseEasings, function(name, easeIn) {
        $.easing["easeIn" + name] = easeIn;
        $.easing["easeOut" + name] = function(p) {
            return 1 - easeIn(1 - p);
        }
        ;
        $.easing["easeInOut" + name] = function(p) {
            return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
        }
        ;
    });
})();


(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
        ;
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
        ;
}());
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem, null ).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
};
var pageIsLoading = true
var previousUrl = null ;
var pageInitWait = false;
var pageOpeningWait = false;
var siteOpeningWait = true;
var isDev = false;
$(function() {
    if (Modernizr.history)
        var ajaxNav = true;
    else
        var ajaxNav = false;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    function checkWindowSize(args) {
        var e = window
            , a = 'inner';
        if (!('innerWidth'in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        windowWidth = $(window).width();
        windowHeight = e[a + 'Height'];
    }
    var isHandheld = null ;
    var isTablet = null ;
    var isSmartphone = null ;
    var isDesktop = null ;
    function checkDeviceType() {
        if (windowWidth >= 992) {
            isHandheld = isSmartphone = isTablet = false;
            isDesktop = true;
        } else if (windowWidth >= 768) {
            isHandheld = isTablet = true;
            isDesktop = isSmartphone = false;
        } else {
            isHandheld = isSmartphone = true;
            isDesktop = isTablet = false;
        }
    }
    checkDeviceType();
    function globalResize() {
        var fullscreen = $('.fullscreen');
        if (isSmartphone)
            var fullscreen = fullscreen.add($('.fullscreen-sm'));
        $('.fullscreen, .fullscreen-sm').css({
            width: '',
            height: ''
        });
        fullscreen.each(function() {
            var container = $(this);
            if (container.height() < windowHeight)
                container.css({
                    height: windowHeight
                });
            if (container.width() < windowWidth)
                container.css({
                    width: windowWidth
                });
        });
    }
    function scrollViewportResize() {
        var container = $('.page-container').first();
        var viewportCurrent = $('.is-viewport-current');
        if (viewportCurrent.length == 0)
            return;
        var scroll = -viewportCurrent.position().top;
        var parent = viewportCurrent.parents('.page-section');
        if (parent.length == 1)
            scroll -= parent.position().top;
        container.css({
            top: scroll
        });
    }
    $(window).on('resize orientationchange', function(e) {
        checkWindowSize();
        checkDeviceType();
        globalResize();
        scrollViewportResize();
        if (!simplifiedVersion())
            navResizeCanvas();
        $(window).trigger('scroll');
    });

    (function(a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = false;
    function checkSafari() {
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            isSafari = true;
            $('html').addClass('is-safari');
        }
    }
    checkSafari();
    var isIE = false;
    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null )
                rv = parseFloat(RegExp.$1);
        } else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null )
                rv = parseFloat(RegExp.$1);
        }
        if (rv != -1)
            isIE = true;
        return rv;
    }
    var IEVersion = getInternetExplorerVersion();
    function simplifiedVersion() {
        if (!isDesktop || jQuery.browser.mobile || (isIE && IEVersion < 10))
            return true;
        else
            return false;
    }
    if (simplifiedVersion())
        $('html').addClass('no-canvas');
    $('body').on('mousedown', 'img', function() {
        return false;
    });
    $('body').on('click', '.share-popup', function(e) {
        var link = $(this);
        popupCenter(link.attr('href'), link.attr('title'), 580, 470);
        e.preventDefault();
    });
    $('body').on('click', '.link-scrollto', function(e) {
        e.preventDefault();
    });
    function scrollTo(target) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, {
            duration: 800,
            easing: 'easeInOutCubic'
        });
    }
   
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
    $(document).on('mousemove', mouseDirection);
    function mouseSpeed() {
        mouseSpeedX = mouseX - mouseLastX;
        mouseSpeedY = mouseY - mouseLastY;
        mouseLastX = mouseX;
        mouseLastY = mouseY;
        setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();

    function navMainInit() {
        var nav = $('.nav-main');
        var animationContainer = nav.find('.animation-container');
        var bmAnims = nav.data('bmAnims');
        if (typeof (bmAnims) != 'object') {
            bmAnims = {}
            var bmOpenLeft = bodymovin.loadAnimation({
                container: animationContainer.find('.column-left').get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: WRK.tpl_dir + '/anim/nav-open-left.json'
            });
            var bmOpenRight = bodymovin.loadAnimation({
                container: animationContainer.find('.column-right').get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: WRK.tpl_dir + '/anim/nav-open-right.json'
            });
            bmAnims.openLeft = bmOpenLeft;
            bmAnims.openRight = bmOpenRight;
            nav.data('bmAnims', bmAnims);
        }
    }
    navMainInit();
    function navResizeCanvas() {
        var nav = $('.nav-main');
        var canvas = nav.find('.wave-canvas canvas');
        if (!nav.hasClass('is-opened') || canvas.length != 1)
            return;
        navCanvasStop();
        navCanvasPlay();
    }
    function navInitCanvas() {
        var canvas = $('.nav-main .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var vTotalPoints = 5;
        canvas.get(0).width = windowWidth;
        canvas.get(0).height = windowHeight;
        var c = canvas.get(0).getContext('2d');
        canvas.data('c', c);
        var vPoints = [];
        var vGap = (canvas.height()) / (vTotalPoints - 1);
        for (var i = 0; i <= vTotalPoints - 1; i++)
            vPoints.push(new Point(canvas.get(0).width / 2,i * vGap,'v',false,canvas));
        canvas.data('vPoints', vPoints);
        canvas.data('vGap', vGap);
    }
    function navCanvasPlay() {
        var canvas = $('.nav-main .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var isPlaying = canvas.data('isPlaying');
        if (isPlaying)
            return
        canvas.data('isPlaying', true);
        navInitCanvas();
        navCanvasRender();
    }
    function navCanvasStop() {
        var canvas = $('.nav-main .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var rafID = canvas.data('rafID');
        cancelAnimationFrame(rafID);
        canvas.data('isPlaying', false);
    }
    function navCanvasRender() {
        var canvas = $('.nav-main .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var rafID = requestAnimationFrame(navCanvasRender);
        canvas.data('rafID', rafID);
        var c = canvas.data('c');
        var vPoints = canvas.data('vPoints');
        var vTotalPoints = vPoints.length;
        c.clearRect(0, 0, canvas.width(), canvas.height());
        c.fillStyle = '#f99797';
        c.fillRect(0, 0, canvas.width(), canvas.height());
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            vPoints[i].move();
        }
        c.fillStyle = '#faabab';
        c.strokeStyle = '#faabab';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(vPoints[0].x, 0);
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            var p = vPoints[i];
            if (i == 0) {
                p.y = 0;
            } else if (i == vTotalPoints - 1) {
                p.y += 1;
                p.cy += 1;
            }
            if (i == vTotalPoints - 1) {
                p.cx = p.x;
                p.cy = p.y;
            } else {
                p.cx = (p.x + vPoints[i + 1].x) / 2;
                p.cy = (p.y + vPoints[i + 1].y) / 2;
            }
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        c.lineTo(canvas.width(), canvas.height());
        c.lineTo(canvas.width(), 0);
        c.closePath();
        c.fill();
    }
    $('.nav-main .nav-toggle').on('click', function() {
        var toggle = $(this);
        var nav = $('.nav-main');
        var navContainer = nav.find('.nav-container');
        var animationContainer = nav.find('.animation-container');
        var title = nav.find('.site-title');
        var wave = nav.find('.wave-canvas');
        var canvas = wave.find('canvas');
        var columns = nav.find('.nav-columns .column');
        var language = nav.find('.language-selector');
        var open = toggle.find('.open');
        var openLines = open.find('.line');
        var close = toggle.find('.close');
        var closeLines = close.find('.line');
        var bmAnims = nav.data('bmAnims');
        if (typeof (bmAnims) != 'object') {
            navMainInit();
        }
        if (nav.hasClass('is-opened')) {
            columns.css({
                backgroundColor: 'transparent'
            });
            wave.css({
                opacity: 0
            });
            navContainer.css({
                left: 0
            });
            nav.removeClass('is-opened');
            var startIntro = 0;
            var endIntro = 1.2;
            var startColumn = 0;
            var tl = new TimelineLite();
            tl.pause();
            tl.set(title, {
                alpha: 0
            }, 0.5);
            tl.call(function() {
                bmAnims.openLeft.setDirection(-1);
                bmAnims.openRight.setDirection(-1);
                bmAnims.openLeft.goToAndStop(35, true);
                bmAnims.openRight.goToAndStop(35, true);
                bmAnims.openLeft.play();
                bmAnims.openRight.play();
            }, null , null , startIntro);
            tl.to(columns, 0.5, {
                alpha: 0
            }, startColumn);
            tl.to(language, 0.3, {
                alpha: 0
            }, startIntro);
            tl.call(function() {
                columns.css({
                    opacity: '',
                    backgroundColor: ''
                });
                wave.css({
                    opacity: ''
                });
                language.css({
                    opacity: ''
                });
                navContainer.css({
                    left: ''
                });
                title.css({
                    opacity: ''
                });
                bmAnims.openLeft.stop();
                bmAnims.openRight.stop();
                if (!simplifiedVersion()) {
                    navCanvasStop();
                    homeCanvasPlay();
                    contactCanvasPlay(true);
                }
            }, null , null , endIntro);
            tl.play();
        } else {
            columns.css({
                backgroundColor: 'transparent'
            });
            language.css({
                opacity: 0
            });
            wave.css({
                opacity: 0
            });
            title.css({
                opacity: 0
            });
            nav.addClass('is-opened');
            if (!simplifiedVersion()) {
                homeCanvasStop();
                contactCanvasStop();
                navCanvasPlay();
            }
            var startIntro = 0;
            var endIntro = 1.2;
            var startContact = 0.6;
            var startNav = 0.9;
            var tl = new TimelineLite();
            tl.pause();
            tl.set(title, {
                alpha: 1
            }, 0.7);
            tl.call(function() {
                animationContainer.find('svg').each(function() {
                    this.setAttribute('preserveAspectRatio', 'none');
                });
                bmAnims.openLeft.setDirection(1);
                bmAnims.openRight.setDirection(1);
                bmAnims.openLeft.goToAndStop(0, true);
                bmAnims.openRight.goToAndStop(0, true);
                bmAnims.openLeft.play();
                bmAnims.openRight.play();
            }, null , null , startIntro);
            tl.to(language, 0.3, {
                alpha: 1
            }, startNav);
            tl.call(function() {
                columns.css({
                    backgroundColor: ''
                });
                wave.css({
                    opacity: ''
                });
                language.css({
                    opacity: ''
                });
                title.css({
                    opacity: ''
                });
                bmAnims.openLeft.pause();
                bmAnims.openRight.pause();
            }, null , null , endIntro);
            nav.find('.column-contact').each(function() {
                var column = $(this);
                var title = column.find('.column-title');
                var link = column.find('.link-contact');
                var links = column.find('.link');
                tl.from(title, 0.5, {
                    alpha: 0
                }, startContact);
                tl.from(link, 0.5, {
                    alpha: 0,
                    y: 50,
                    ease: Back.easeOut
                }, startContact + 0.1);
                tl.staggerFrom(links, 0.5, {
                    alpha: 0,
                    y: 20,
                    ease: Back.easeOut
                }, 0.05, startContact + 0.3);
                tl.call(function() {
                    title.css({
                        opacity: ''
                    });
                    link.css({
                        opacity: '',
                        transform: ''
                    });
                    links.css({
                        opacity: '',
                        transform: ''
                    });
                });
            });
            nav.find('.column-nav').each(function() {
                var column = $(this);
                var title = column.find('.column-title');
                var links = column.find('.menu-item');
                tl.from(title, 0.5, {
                    alpha: 0
                }, startNav);
                tl.staggerFrom(links, 0.5, {
                    alpha: 0,
                    y: 50,
                    ease: Back.easeOut
                }, 0.1, startNav + 0.1);
                tl.call(function() {
                    title.css({
                        opacity: ''
                    });
                    links.css({
                        opacity: '',
                        transform: ''
                    });
                });
            });
            tl.play();
        }
    });
    $('body').on('click', '.link-section', function(e) {
        var link = $(this);
        var target = $(link.attr('href'));
        if (target.length == 0)
            return;
        if (!isSmartphone)
            switchPageSections(target);
        else
            scrollTo(target);
        e.preventDefault();
    });
    var switchPageSectionsWait = true;
    function switchPageSections(section) {
        if (switchPageSectionsWait)
            return;
        var sections = $('.page-section');
        var activeSection = sections.filter('.is-active');
        activeSection.trigger('outro', section);
        section.trigger('intro');
        activeSection.removeClass('is-active').css({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2
        });
        section.addClass('is-active');
        checkPageSectionsNav();
    }
    function nextPageSection(next) {
        var container = $('.page-container').first();
        var sections = $('.page-section');
        var activeSection = sections.filter('.is-active');
        if (next)
            var nextSection = activeSection.next('.page-section');
        else
            var nextSection = activeSection.prev('.page-section');
        if (nextSection.length == 1)
            switchPageSections(nextSection);
    }
    function checkPageSectionsNav() {
        var activeSection = $('.page-section.is-active');
        var nav = $('.nav-page');
        var links = nav.find('.page');
        var activeLink = links.filter('.is-active');
        var activeSubnav = activeLink.find('.subnav');
        var newLink = nav.find('a[href="#' + activeSection.attr('id') + '"]').parent();
        var newSubnav = newLink.find('.subnav');
        var tabletButtons = $('.nav-tablet .button');
        if (activeSubnav.length == 1) {
            var fromHeight = activeLink.outerHeight();
            activeSubnav.css({
                display: 'none'
            });
            var toHeight = activeLink.outerHeight();
            activeSubnav.css({
                display: 'block'
            });
            activeLink.css({
                height: fromHeight
            });
            var tl = new TimelineLite();
            tl.pause();
            tl.to(activeLink, 0.5, {
                height: toHeight,
                ease: Power3.easeInOut
            }, 0.1);
            tl.staggerFromTo(activeSubnav.find('.item').reverse(), 0.3, {
                scaleX: 1
            }, {
                scaleX: 0,
                ease: Power3.easeIn
            }, 0.05, 0);
            tl.call(function() {
                activeLink.css({
                    height: ''
                });
                activeSubnav.css({
                    display: ''
                });
                activeSubnav.find('.item').css({
                    transform: ''
                });
            })
            tl.play();
        }
        if (newSubnav.length == 1) {
            var fromHeight = newLink.outerHeight();
            newSubnav.css({
                display: 'block'
            });
            var toHeight = newLink.outerHeight();
            newLink.css({
                height: fromHeight
            });
            var tl = new TimelineLite();
            tl.pause();
            tl.to(newLink, 0.5, {
                height: toHeight,
                ease: Power3.easeInOut
            }, 0);
            tl.staggerFromTo(newSubnav.find('.item'), 0.3, {
                scaleX: 0
            }, {
                scaleX: 1,
                ease: Power3.easeOut
            }, 0.05, 0.1);
            tl.call(function() {
                newLink.css({
                    height: ''
                });
                newSubnav.css({
                    display: ''
                });
                newSubnav.find('.item').css({
                    transform: ''
                });
            })
            tl.play();
        }
        activeLink.removeClass('is-active');
        newLink.addClass('is-active');
        tabletButtons.addClass('is-active');
        if (newLink.is(':first-child'))
            tabletButtons.filter('.prev').removeClass('is-active');
        if (newLink.is(':last-child'))
            tabletButtons.filter('.next').removeClass('is-active');
    }
    function introNavButton() {
        var toggle = $('.nav-toggle')
        var button = toggle.find('.button-container');
        var shape = button.find('.shape');
        var shapeTop = button.find('.shape-top');
        var lines = button.find('.open .line');
        var navPage = $('.nav-page');
        var navPages = navPage.find('.page a');
        shape.removeClass('has-hover');
        TweenLite.set(lines, {
            animation: 'none'
        });
        TweenLite.set(shape, {
            y: -(shape.offset().top + 86),
            scaleX: 0.7,
            scaleY: 1.2
        });
        TweenLite.set(navPages, {
            y: -18
        });
        navPage.css({
            opacity: ''
        });
        toggle.css({
            opacity: ''
        });
        var startLines = 0.6;
        var startPages = 0.8;
        var tl = new TimelineLite();
        tl.pause();
        tl.to(shapeTop, 0.5, {
            scaleY: 0.9
        }, 0.1);
        tl.to(shapeTop, 0.3, {
            scaleY: 0
        }, 0.5);
        tl.to(shape, 1, {
            y: 3,
            ease: Power2.easeInOut
        }, 0);
        tl.to(shape, 0.4, {
            scaleX: 1.05,
            scaleY: 0.95,
            ease: Power2.easeInOut
        }, 0.55);
        tl.to(shape, 0.3, {
            scaleX: 1,
            scaleY: 1,
            ease: Power2.easeOut
        }, 0.9);
        tl.to(shape, 0.3, {
            y: 0,
            ease: Power2.easeOut
        }, 0.9);
        tl.set(lines, {
            animation: ''
        }, startLines);
        if (navPages.length > 0) {
            tl.staggerTo(navPages, 0.5, {
                y: 0,
                ease: Power3.easeOut
            }, 0.15, startPages);
        }
        tl.call(function() {
            shape.css({
                transform: ''
            });
            shapeTop.css({
                transform: ''
            });
            lines.css({
                transform: '',
                animation: ''
            });
            shape.addClass('has-hover');
        });
        tl.timeScale(1.2);
        tl.play();
    }
    $('.site-title').on('mouseenter', function() {
        if (!isDesktop)
            return;
        var title = $('.site-title');
        var animLogo = title.find('.animation-container').data('bmAnim');
        animLogo.playSegments([50, 90], true);
    });
    function homeInitWorksAnim() {
        var layout = $('.layout-home').first();
        var container = layout.find('.animation-global');
        var anims = jQuery.parseJSON(container.attr('data-anims'));
        var anim = anims[Math.floor(Math.random() * anims.length)];
        var animKey = 'homeWorks' + anim.toCamel();
        var animIntro = bodymovin.loadAnimation({
            container: container.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: bmHomeAnimationsData[animKey + 'Intro']
        });
        container.data('bmAnim', animIntro);
        animIntro.addEventListener('complete', function() {
            animIntro.destroy();
            var animLoop = bodymovin.loadAnimation({
                container: container.get(0),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: bmHomeAnimationsData[animKey + 'Loop']
            });
            container.data('bmAnim', animLoop);
        });
    }
    function callController(controllerName, hash, data) {
        var functionName = controllerName + hash;
        $(document).trigger(functionName);
    }
    $('body').on('click', 'a', function(e) {
        if (!ajaxNav || $(this).hasClass('link-direct'))
            return;
        var url = $(this).attr('href');
        if (url.indexOf(WRK.host) === 0) {
            e.preventDefault();
            if (!pageIsLoading) {
                if (window.location.href == url)
                    return;
                pageLoading(url);
                if (isSmartphone) {
                    $('html,body').animate({
                        scrollTop: 0
                    }, {
                        duration: 600,
                        easing: 'easeInOutQuint'
                    });
                }
            }
        }
    });
    function siteInit() {
        $(window).bind('popstate', function() {
            historyStateHasChange = true;
            historyStateChanged();
        });
        var url = window.location.href;
        $(document).data(url, $('html')[0].outerHTML);
        var animLogo = bodymovin.loadAnimation({
            container: $('.site-title .animation-container').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: bmAnimationsData.logo
        });
        $('.site-title .animation-container').data('bmAnim', animLogo);
        pageInit(url, false);
        $(window).trigger('resize');
    }
    function siteWaitLoader() {
        if (pageIsLoading || siteOpeningWait) {
            setTimeout(siteWaitLoader, 100);
            return;
        }
        siteOpeningWait = false;
        siteInit();
    }
    siteWaitLoader();
    setTimeout(function() {
        siteOpeningWait = false;
    }, ($('body').hasClass('error404') ? 0 : 1500));
    $('.global-loader').addClass('is-visible');
    function pageLoading(url) {
        pageLoader(true);
        if (typeof ($(document).data(url)) == 'undefined') {
            $.get(url, function(data) {
                $(document).data(url, data);
                pageInit(url, data);
            }).error(function() {
                window.location = '/404';
            });
        } else {
            pageInit(url, $(document).data(url));
        }
    }
    function pagePreloading(url) {
        if (typeof ($(document).data(url)) == 'undefined') {
            $.get(url, function(data) {
                $(document).data(url, data);
            });
        }
    }
    function pageLoader(show) {
        var containers = $('.site-title .loader-container');
        if (show) {
            containers.each(function() {
                var container = $(this);
                var animation = container.siblings('.animation-container');
                var animIntro = container.data('bmAnim');
                if (animIntro != undefined)
                    animIntro.destroy();
                animIntro = bodymovin.loadAnimation({
                    container: container.get(0),
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: bmAnimationsData['logoLoaderIntro']
                });
                container.data('bmAnim', animIntro);
                setTimeout(function() {
                    animIntro.destroy();
                    var animLoop = bodymovin.loadAnimation({
                        container: container.get(0),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: bmAnimationsData['logoLoaderLoop']
                    });
                    container.data('bmAnim', animLoop);
                }, 800);
                animation.css({
                    display: 'none'
                });
                container.css({
                    display: 'block'
                });
            })
            pageIsLoading = true;
        } else {
            $('.global-container').removeClass('is-limited');
            pageIsLoading = false;
        }
    }
    function pageInit(url, data) {
        var container = $('.page-container').first();
        if (!simplifiedVersion()) {
            contactCanvasStop();
        }
        if (data !== false) {
            if (pageInitWait) {
                setTimeout(function() {
                    pageInit(url, data);
                }, 100);
                return;
            }
            var html = $('<div/>').html(data);
            var newContainer = html.find('.page-container')
            newContainer.insertAfter('.site-head');
            container = newContainer;
            $('.site-head').attr('class', html.find('.site-head').attr('class'));
            var navIsOpened = $('.nav-main').hasClass('is-opened');
            $('.nav-main').attr('class', html.find('.nav-main').attr('class'));
            if (navIsOpened)
                $('.nav-main').addClass('is-opened');
            $('.global-container').attr('class', html.find('.global-container').attr('class'));
            $('head meta').filter('[name="description"], [name="keywords"], [property="og:image"]').remove();
            html.find('meta').filter('[name="description"], [name="keywords"], [property="og:image"]').insertAfter('head meta[name="viewport"]');
            if (!historyStateHasChange) {
                previousUrl = window.location.href;
                history.pushState(null , null , url);
            }
            historyStateHasChange = false;
            $('head title').text(html.find('title').text());
        }
        callController('pageInit', container.attr('data-page').toCamel(), data);
        pageContentLoading(url)
    }
    function pageContentLoading(url) {
        var container = $('.page-container');
        var pageLoaded = true;
        var bmAnims = container.data('bmAnims');
        for (var anim in bmAnims) {
            var bmAnim = bmAnims[anim];
            if (!bmAnim.isLoaded)
                pageLoaded = false;
        }
        if (pageLoaded && !pageOpeningWait) {
            $(window).trigger('resize');
            pageLoader(false);
            setTimeout(function() {
                pageOpening(url);
            }, 50);
        } else {
            setTimeout(function() {
                pageContentLoading(url);
            }, 100);
        }
    }
    var pagesOpened = [];
    function pageOpening(url) {
        var container = $('.page-container').first();
        if (!simplifiedVersion()) {
            navCanvasStop();
        }
        setTimeout(function() {
            $('.nav-main .menu-item').removeClass('current-menu-item').find('a[href="' + url + '"]').parent().addClass('current-menu-item');
        }, 1000);
        callController('pageOpening', container.attr('data-page').toCamel(), null );
    }
    function pageKill() {
        var containers = null ;
        if ($('.page-container').length > 1)
            containers = $('.page-container').slice(1);
        else
            return;
        containers.each(function() {
            var bmAnims = $(this).data('bmAnims');
            for (var property in bmAnims)
                if (bmAnims.hasOwnProperty(property))
                    bmAnims[property].destroy();
            callController('pageKill', $(this).attr('data-page').toCamel(), null );
            $(this).remove();
        });
        pageInitWait = false;
    }
    var historyStateHasChange = false;
    function historyStateChanged() {
        if (pageIsLoading) {
            setTimeout(function() {
                historyStateChanged();
            }, 100);
        }
        var url = window.location.href;
        pageInitWait = true;
        pageLoading(url);
        var pageScroll = true;
        $('html,body').animate({
            scrollTop: 0
        }, {
            duration: 600,
            easing: 'easeInOutQuint',
            complete: function() {
                if (pageScroll) {
                    $('.global-container').addClass('is-limited');
                    pageKill();
                }
                pageScroll = false;
            }
        });
    }
    var waveViscosity = 20
        , waveMouseDist = 80
        , waveDamping = 0.15;
    function Point(x, y, axis, fixed, canvas) {
        this.x = x;
        this.ix = x;
        this.vx = 0;
        this.y = y;
        this.iy = y;
        this.vy = 0;
        this.cx = 0;
        this.cy = 0;
        this.axis = axis;
        this.fixed = fixed;
        this.canvas = canvas;
    }
    Point.prototype.move = function() {
        if (this.fixed)
            return;
        this.vx += (this.ix - this.x) / waveViscosity;
        this.vy += (this.iy - this.y) / waveViscosity;
        var dx = this.ix - mouseX
            , dy = this.iy - mouseY;
        var vGap = this.canvas.data('vGap');
        var hGap = this.canvas.data('hGap');
        if ((this.axis == 'v' && (mouseDirectionX > 0 && mouseX > this.x) || (mouseDirectionX < 0 && mouseX < this.x)) || (this.axis == 'h' && (mouseDirectionY > 0 && mouseY > this.y) || (mouseDirectionY < 0 && mouseY < this.y))) {
            if ((this.axis == 'v' && Math.sqrt(dx * dx) < waveMouseDist && Math.sqrt(dy * dy) < vGap) || (this.axis == 'h' && Math.sqrt(dy * dy) < waveMouseDist && Math.sqrt(dx * dx) < hGap)) {
                if (this.axis == 'v')
                    this.vx = mouseSpeedX / 8;
                else
                    this.vx = 0
                if (this.axis == 'h')
                    this.vy = mouseSpeedY / 10;
                else
                    this.vy = 0;
            }
        }
        if (this.axis == 'v') {
            this.vx *= (1 - waveDamping);
            this.x += this.vx;
            this.y = this.iy;
        } else if (this.axis == 'h') {
            this.vy *= (1 - waveDamping);
            this.x = this.ix;
            this.y += this.vy;
        }
    }
    ;
    $(document).on('pageInitHome', function() {
        var layout = $('.layout-home').first();
        if (isDev)
            return;
        layout.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0
        });
        if (!simplifiedVersion()) {
            $(window).on('resize', homeResizeCanvas);
            homeCanvasPlay();
        }
        var bmAnims = {}
        var bmTransition = bodymovin.loadAnimation({
            container: $('.global-animation').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/home-transition' + (windowHeight > windowWidth ? '-mobile' : '') + '.json'
        });
        bmAnims.transition = bmTransition;
        var bmProcessBg = bodymovin.loadAnimation({
            container: layout.find('.section-process .animation-background').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/home-process-background.json'
        });
        bmAnims.processBg = bmProcessBg;
        var bmAboutBg = bodymovin.loadAnimation({
            container: layout.find('.section-about .animation-background').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/home-about-background.json'
        });
        bmAnims.aboutBg = bmAboutBg;
        layout.data('bmAnims', bmAnims);
        layout.find('.home-section, .wave-canvas').css({
            opacity: 0
        });
        $('body').css({
            background: '#a8d0e6'
        });
        layout.css({
            background: 'none'
        });
        $('.global-animation').css({
            display: 'block'
        });
    });
    $(document).on('pageOpeningHome', function() {
        if (isDev)
            return;
        var layout = $('.layout-home').first();
        var otherLayout = $('.page-container').not(layout);
        var animationContainer = $('.global-animation');
        var bmAnims = layout.data('bmAnims');
        var sectionWorks = layout.find('.section-works');
        var sectionProcess = layout.find('.section-process');
        var sectionAbout = layout.find('.section-about');
        var animLogo = $('.site-title .animation-container').data('bmAnim');
        sectionProcess.css({
            backgroundColor: 'transparent'
        });
        sectionAbout.css({
            backgroundColor: 'transparent'
        });
        var startIntro = 0;
        var endIntro = startIntro + 1.1;
        var startHead = 3.2;
        var startWorks = 1.1;
        var startProcess = 2;
        var startAbout = 2;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.transition.play();
        }, null , null , startIntro);
        tl.call(function() {
            $('.nav-toggle, .nav-page').css({
                opacity: 0
            });
            $('.nav-main').removeClass('is-opened');
            $('.nav-main .open .line').css({
                backgroundColor: ''
            });
            layout.css({
                position: '',
                top: '',
                left: '',
                width: '',
                height: '',
                opacity: ''
            });
            otherLayout.hide();
            animationContainer.css({
                backgroundColor: '',
                display: 'none',
                zIndex: ''
            });
            animLogo.stop();
            $('.site-title').find('.animation-container, .loader-container').css({
                display: ''
            });
            $('.global-loader').remove();
            bmAnims.transition.destroy();
        }, null , null , endIntro);
        tl.call(function() {
            animLogo.playSegments([0, 45], true);
            introNavButton();
        }, null , null , startHead);
        tl.call(function() {
            sectionWorks.css({
                opacity: ''
            });
            homeInitWorksAnim();
        }, null , null , startWorks);
        tl.staggerFrom(sectionWorks.find('.section-title, .section-catcher'), 0.5, {
            alpha: 0,
            y: 50,
            ease: Back.easeOut,
            delay: 0.5
        }, 0.1, startWorks);
        tl.call(function() {
            sectionAbout.css({
                opacity: ''
            });
            sectionAbout.find('.animation-background svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.aboutBg.play();
        }, null , null , startAbout);
        tl.staggerFrom(sectionAbout.find('.section-title, .section-catcher, .section-background'), 0.5, {
            alpha: 0,
            y: 50,
            ease: Back.easeOut,
            delay: 0.5
        }, 0.1, startAbout + 0.7);
        tl.call(function() {
            sectionProcess.css({
                opacity: ''
            });
            sectionProcess.find('.animation-background svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.processBg.play();
        }, null , null , startProcess);
        tl.staggerFrom(sectionProcess.find('.section-title, .section-catcher, .section-background'), 0.5, {
            alpha: 0,
            y: 50,
            ease: Back.easeOut,
            delay: 0.5
        }, 0.1, startProcess + 0.4);
        tl.call(function() {
            $('body').css({
                background: ''
            });
            layout.css({
                background: ''
            });
            sectionProcess.css({
                backgroundColor: ''
            });
            sectionAbout.css({
                backgroundColor: ''
            });
            bmAnims.aboutBg.destroy();
            bmAnims.processBg.destroy();
            layout.find('.animation-background').remove();
            layout.find('.wave-canvas').css({
                opacity: ''
            });
        }, null , null , startProcess + 1.9);
        tl.call(function() {
            pageKill();
            pageOpeningWait = false;
        });
        tl.play();
    });
    $(document).on('pageKillHome', function() {
        var layout = $('.layout-home').first();
        var container = layout.find('.animation-global');
        var bmAnim = container.data('bmAnim');
        bmAnim.destroy();
        layout.find('.home-section .section-background').each(function() {
            var bmAnim = container.data('bmAnim');
            bmAnim.destroy();
        })
        if (!simplifiedVersion()) {
            homeCanvasStop();
            $(window).off('resize', homeResizeCanvas);
        }
    });
    function homeResizeCanvas() {
        var layout = $('.layout-home').first();
        var canvas = layout.find('.wave-canvas canvas');
        if (layout.length != 1 || canvas.length != 1)
            return;
        homeCanvasStop();
        homeCanvasPlay();
    }
    function homeInitCanvas() {
        var layout = $('.layout-home').first();
        var canvas = layout.find('.wave-canvas canvas');
        if (layout.length != 1 || canvas.length != 1)
            return;
        var vTotalPoints = 6;
        var hTotalPoints = 3;
        var waveBlockX = windowWidth * 0.6667;
        var waveBlockWidth = windowWidth - waveBlockX;
        canvas.get(0).width = layout.width();
        canvas.get(0).height = layout.height();
        waveBlockX = layout.width() * 0.6667;
        waveBlockWidth = layout.width() - waveBlockX;
        var c = canvas.get(0).getContext('2d');
        canvas.data('c', c);
        var vPoints = [];
        var vGap = (canvas.height()) / (vTotalPoints - 1);
        for (var i = 0; i <= vTotalPoints - 1; i++)
            vPoints.push(new Point(waveBlockX,i * vGap,'v',false,canvas));
        var hPoints = [];
        var hGap = (waveBlockWidth) / (hTotalPoints - 1);
        for (var i = 0; i <= hTotalPoints - 1; i++)
            hPoints.push(new Point(waveBlockX + i * hGap,canvas.height() / 2,'h',(i == 0 || i == hTotalPoints - 1),canvas));
        canvas.data('vPoints', vPoints);
        canvas.data('vGap', vGap);
        canvas.data('hPoints', hPoints);
        canvas.data('hGap', hGap);
    }
    function homeCanvasPlay() {
        var layout = $('.layout-home').first();
        var canvas = layout.find('.wave-canvas canvas');
        if (layout.length != 1 || canvas.length != 1)
            return;
        var isPlaying = canvas.data('isPlaying');
        if (isPlaying)
            return
        canvas.data('isPlaying', true);
        homeInitCanvas();
        homeCanvasRender();
    }
    function homeCanvasStop() {
        var layout = $('.layout-home').first();
        var canvas = layout.find('.wave-canvas canvas');
        if (layout.length != 1 || canvas.length != 1)
            return;
        var rafID = canvas.data('rafID');
        cancelAnimationFrame(rafID);
        canvas.data('isPlaying', false);
    }
    function homeCanvasRender() {
        var layout = $('.layout-home').first();
        var canvas = layout.find('.wave-canvas canvas');
        if (layout.length != 1 || canvas.length != 1)
            return;
        var rafID = requestAnimationFrame(homeCanvasRender);
        canvas.data('rafID', rafID);
        var c = canvas.data('c');
        var vPoints = canvas.data('vPoints');
        var vTotalPoints = vPoints.length;
        var vMiddlePoint = Math.floor((vTotalPoints - 1) / 2);
        var hPoints = canvas.data('hPoints');
        var hTotalPoints = hPoints.length;
        c.clearRect(0, 0, canvas.width(), canvas.height());
        c.fillStyle = '#a8d0e6';
        c.fillRect(0, 0, canvas.width(), canvas.height());
        for (var i = 0; i <= vTotalPoints - 1; i++)
            vPoints[i].move();
        for (var i = 0; i <= hTotalPoints - 1; i++)
            hPoints[i].move();
        c.fillStyle = '#f76c6c';
        c.strokeStyle = '#f76c6c';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(vPoints[0].x, 0);
        for (var i = 0; i <= vMiddlePoint; i++) {
            var p = vPoints[i];
            if (i == 0) {
                p.y = 0;
            } else if (i == vMiddlePoint) {
                p.y += 1;
                p.cy += 1;
            }
            p.cx = (p.x + vPoints[i + 1].x) / 2;
            p.cy = (p.y + vPoints[i + 1].y) / 2;
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        for (var i = 0; i < hTotalPoints; i++) {
            var p = hPoints[i];
            if (i == 0) {
                p.y = canvas.height() / 2;
                p.x = vPoints[vMiddlePoint].cx;
                p.cx = (p.x + hPoints[i + 1].x) / 2;
                p.cy = (p.y + hPoints[i + 1].y) / 2;
            } else if (i == hTotalPoints - 1) {
                p.x = p.cx = canvas.width();
                p.y = p.cy = canvas.height() / 2;
            } else {
                p.cx = (p.x + hPoints[i + 1].x) / 2;
                p.cy = (p.y + hPoints[i + 1].y) / 2;
            }
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        c.lineTo(canvas.width(), 0);
        c.closePath();
        c.fill();
        c.fillStyle = '#24305e';
        c.strokeStyle = '#24305e';
        c.beginPath();
        c.moveTo(vPoints[vTotalPoints - 1].x, canvas.height());
        for (var i = vTotalPoints - 1; i > vMiddlePoint; i--) {
            var p = vPoints[i];
            if (i == 5)
                p.y = canvas.height();
            p.cx = (p.x + vPoints[i - 1].x) / 2;
            p.cy = (p.y + vPoints[i - 1].y) / 2;
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        for (var i = 0; i < hTotalPoints; i++) {
            var p = hPoints[i];
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        c.lineTo(canvas.width(), canvas.height());
        c.closePath();
        c.fill();
    }
    function homeInitWorksAnim() {
        var layout = $('.layout-home').first();
        var container = layout.find('.animation-global');
        var anims = jQuery.parseJSON(container.attr('data-anims'));
        var anim = anims[Math.floor(Math.random() * anims.length)];
        var animKey = 'homeWorks' + anim.toCamel();
        var animIntro = bodymovin.loadAnimation({
            container: container.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: bmHomeAnimationsData[animKey + 'Intro']
        });
        container.data('bmAnim', animIntro);
        animIntro.addEventListener('complete', function() {
            animIntro.destroy();
            var animLoop = bodymovin.loadAnimation({
                container: container.get(0),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: bmHomeAnimationsData[animKey + 'Loop']
            });
            container.data('bmAnim', animLoop);
        });
    }
    function homeInitProcessAnim() {
        var layout = $('.layout-home').first();
        var container = layout.find('.section-process .section-background');
        var animKey = 'homeProcess';
        var animIntro = bodymovin.loadAnimation({
            container: container.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: bmHomeAnimationsData[animKey + 'Intro']
        });
        container.data('bmAnim', animIntro);
        animIntro.addEventListener('complete', function() {
            animIntro.destroy();
            var animLoop = bodymovin.loadAnimation({
                container: container.get(0),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: bmHomeAnimationsData[animKey + 'Loop']
            });
            container.data('bmAnim', animLoop);
        });
    }
    function homeInitAboutAnim() {
        var layout = $('.layout-home').first();
        var container = layout.find('.section-about .section-background');
        var animKey = 'homeAbout';
        var animIntro = bodymovin.loadAnimation({
            container: container.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: bmHomeAnimationsData[animKey + 'Intro']
        });
        container.data('bmAnim', animIntro);
        animIntro.addEventListener('complete', function() {
            animIntro.destroy();
            var animLoop = bodymovin.loadAnimation({
                container: container.get(0),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: bmHomeAnimationsData[animKey + 'Loop']
            });
            container.data('bmAnim', animLoop);
        });
    }
    $(document).on('pageInitWorks', function() {
        var layout = $('.layout-works');
        var sectionIntro = layout.find('.section-intro');
        $(document).on('mousewheel', worksVerticalNav);
        $(document).on('keyup', worksVerticalNav);
        $(window).on('resize', worksResize);
        $('body').on('click', '.link-work', worksSubnavLink);
        $('body').on('click', '.link-work-prev, .link-work-next', worksArrowLink);
        $('body').on('click', '.layout-works .nav-tablet .button', function() {
            worksVerticalNav({
                type: 'arrow',
                direction: ($(this).hasClass('prev') ? 'down' : 'up')
            });
        });
        if (!isSmartphone) {
            $(document).swipe({
                swipe: function(event, direction) {
                    worksVerticalNav({
                        type: 'swipe',
                        direction: direction
                    });
                },
                fallbackToMouseEvents: false,
                excludedElements: '.noSwipe'
            });
        }
        if (!isSmartphone) {
            layout.find('.video-placeholder').each(function() {
                var placeholder = $(this);
                var video = $('<video width="' + placeholder.attr('data-width') + '" height="' + placeholder.attr('data-height') + '" loop muted class="video-player"></video>');
                video.html('<source src="' + placeholder.attr('data-mp4') + '" type="video/mp4" />');
                video.replaceAll(placeholder);
                $(video).on('play', function() {
                    video.fadeTo(300, 1);
                    $(this).next('.play').css({
                        opacity: 0
                    });
                });
                if (isIOS) {
                    $(video).next('.play').css({
                        display: 'block'
                    });
                    $(video).next('.play').on('click', function() {
                        $(this).prev(video).get(0).play();
                    });
                }
            });
        }
        if (isDev)
            return;
        layout.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0
        });
        var bmAnims = {}
        var bmTransition = bodymovin.loadAnimation({
            container: $('.global-animation').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/works-transition' + (windowHeight > windowWidth ? '-mobile' : '') + '.json'
        });
        bmAnims.transition = bmTransition;
        var bmIntro = bodymovin.loadAnimation({
            container: sectionIntro.find('.animation-container').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/works-intro-' + sectionIntro.find('.animation-container').attr('data-letter') + '.json'
        });
        bmAnims.intro = bmIntro;
        layout.data('bmAnims', bmAnims);
        sectionIntro.find('> div').css({
            opacity: 0
        });
    });
    $(document).on('pageOpeningWorks', function() {
        if (isDev)
            return;
        var layout = $('.layout-works').first();
        var sectionIntro = layout.find('.section-intro');
        var otherLayout = $('.page-container').not(layout);
        var animationContainer = $('.global-animation');
        var bmAnims = layout.data('bmAnims');
        var animLogo = $('.site-title .animation-container').data('bmAnim');
        animationContainer.css({
            display: 'block'
        });
        var startTransition = 0;
        var endTransition = startTransition + 1.1;
        var startHead = 1.9;
        var startIntro = 1.1;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.transition.play();
        }, null , null , startTransition);
        tl.call(function() {
            $('.nav-toggle, .nav-page').css({
                opacity: 0
            });
            $('.nav-main').removeClass('is-opened');
            $('.nav-main .open .line').css({
                backgroundColor: ''
            });
            layout.css({
                position: '',
                top: '',
                left: '',
                width: '',
                height: '',
                opacity: ''
            });
            otherLayout.hide();
            animationContainer.css({
                backgroundColor: '',
                display: 'none'
            });
            animLogo.stop();
            $('.site-title').find('.animation-container, .loader-container').css({
                display: ''
            });
            $('.global-loader').remove();
            bmAnims.transition.destroy();
        }, null , null , endTransition);
        tl.call(function() {
            animLogo.playSegments([0, 45], true);
            introNavButton();
        }, null , null , startHead);
        tl.call(function() {
            sectionIntro.trigger('intro');
        }, null , null , startIntro)
        tl.call(function() {
            pageKill();
            pageOpeningWait = false;
        });
        tl.play();
    });
    $(document).on('pageKillWorks', function() {
        var layout = $('.layout-works');
        $(document).off('mousewheel', worksVerticalNav);
        $(document).off('keyup', worksVerticalNav);
        $(window).off('resize', worksResize);
        $('body').off('click', '.layout-works .link-work', worksSubnavLink);
        $('body').off('click', '.link-work-prev, .link-work-next', worksArrowLink);
        $('body').off('click', '.layout-works .nav-tablet .button');
        if (!isSmartphone)
            $(document).swipe('destroy');
    });
    function worksResize() {
        var layout = $('.layout-works').first();
        var works = layout.find('.works .work');
        if (isSmartphone) {
            works.each(function() {
                $(this).css({
                    backgroundColor: $(this).attr('data-color')
                });
            });
        } else {
            works.css({
                backgroundColor: ''
            });
        }
    }
    function worksVerticalNav(e) {
        if (isSmartphone)
            return;
        var layout = $('.layout-works').first();
        var sections = layout.find('.page-section');
        var activeSection = sections.filter('.is-active');
        var activeWork = layout.find('.section-works .work.is-active');
        var down = null ;
        if (e.type == 'mousewheel') {
            down = (e.deltaY != 1);
        } else if (e.type == 'keyup') {
            if (e.which == 40)
                down = true;
            else if (e.which == 38)
                down = false;
        } else if (e.type == 'swipe') {
            if (e.direction == 'up')
                down = true;
            else if (e.direction == 'down')
                down = false;
        } else if (e.type == 'arrow') {
            if (e.direction == 'up')
                down = true;
            else
                down = false;
        }
        if (down == null )
            return;
        if (down) {
            if (activeSection.is('.section-intro') || (activeSection.is('.section-works') && activeWork.is(':last-child'))) {
                nextPageSection(true);
            } else if (activeSection.is('.section-works')) {
                worksNextWork(true);
            }
        } else {
            if (activeSection.is('.section-contact') || (activeSection.is('.section-works') && activeWork.is(':first-child'))) {
                nextPageSection(false);
            } else if (activeSection.is('.section-works')) {
                worksNextWork(false);
            }
        }
    }
    var worksWorksWait = false;
    function worksSwitchWorks(work) {
        if (worksWorksWait)
            return;
        worksWorksWait = true;
        switchPageSectionsWait = true;
        var layout = $('.layout-works').first();
        var section = layout.find('.section-works');
        var works = section.find('.work');
        var activeWork = works.filter('.is-active');
        var counterText = section.find('.works-counter .text .count');
        var navToggleLines = $('.nav-main .open .line');
        var fromBlackBackground = ColorMix.mix([new ColorMix.Color(0,0,0), new ColorMix.Color().fromHex(activeWork.attr('data-color'))], [20, 80]).toString('hex');
        var toBlackBackground = ColorMix.mix([new ColorMix.Color(0,0,0), new ColorMix.Color(work.attr('data-color'))], [20, 80]).toString('hex');
        work.css({
            opacity: 0
        });
        var startOut = 0;
        var startIn = 0.8;
        var tl = new TimelineLite();
        tl.pause();
        activeWork.each(function() {
            var image = activeWork.find('.work-image');
            var imageAnimationContainer = image.find('.animation-container');
            var content = activeWork.find('.work-content');
            var contentBorder = content.find('.border');
            var contentAnimationContainer = content.find('.animation-container');
            var animImage = bodymovin.loadAnimation({
                container: imageAnimationContainer.get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: bmWorksAnimationsData['worksBackgroundOut'],
            });
            imageAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            var splitText = new SplitText(content.find('.work-description p'),{
                type: 'lines',
                linesClass: 'line'
            });
            var contentElements = content.find('.work-title, .work-category, .line, .work-link, .work-credits li');
            imageAnimationContainer.find('path:first').css({
                fill: fromBlackBackground
            });
            imageAnimationContainer.find('path:last').css({
                fill: fromBlackBackground
            });
            if (work.index() > activeWork.index()) {
                var toY = -30;
            } else {
                var toY = 30;
                contentElements.reverse();
            }
            if (work.index() > activeWork.index()) {
                imageAnimationContainer.css({
                    transform: 'rotateZ(180deg)'
                });
            }
            tl.staggerTo(contentElements, 0.3, {
                alpha: 0,
                y: toY,
                ease: Power3.easeIn
            }, 0.05, startOut);
            tl.call(function() {
                animImage.play();
            }, null , null , startOut);
            tl.to(contentBorder, 1, {
                backgroundColor: work.attr('data-color')
            }, startOut);
            tl.to(imageAnimationContainer.find('svg path:last'), 1, {
                fill: toBlackBackground
            }, startOut);
            tl.to(imageAnimationContainer.find('svg path:first'), 1, {
                fill: toBlackBackground
            }, startOut);
            tl.call(function() {
                contentBorder.css({
                    backgroundColor: activeWork.attr('data-color')
                });
            });
            tl.call(function() {
                animImage.destroy();
                contentElements.css({
                    opacity: '',
                    transform: ''
                });
                splitText.revert();
                imageAnimationContainer.css({
                    transform: ''
                });
                activeWork.removeClass('is-active');
                work.addClass('is-active');
                var count = work.index() + 1;
                var countStr = ('0' + String(count)).slice(-2);
                var countArr = countStr.split('');
                counterText.text(countStr);
                worksSubnavCheck();
                if (image.find('video').length == 1) {
                    image.find('video').get(0).pause();
                    image.find('video').get(0).currentTime = 0;
                }
            }, null , null , startIn);
        });
        tl.to(section, 1, {
            backgroundColor: work.attr('data-color')
        }, startOut);
        tl.to(navToggleLines, 1, {
            backgroundColor: work.attr('data-color')
        }, startOut);
        work.each(function() {
            var image = work.find('.work-image .image-container');
            var imageAnimationContainer = image.find('.animation-container');
            var content = work.find('.work-content');
            var contentInner = content.find('.inner');
            var contentBorder = content.find('.border');
            var contentAnimationContainer = content.find('.animation-container');
            var animImage = bodymovin.loadAnimation({
                container: imageAnimationContainer.get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: bmWorksAnimationsData['worksBackgroundIn'],
            });
            imageAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            var splitText = new SplitText(content.find('.work-description p'),{
                type: 'lines',
                linesClass: 'line'
            });
            var contentElements = content.find('.work-title, .work-category, .line, .work-link, .work-credits li');
            imageAnimationContainer.find('path:last').css({
                fill: toBlackBackground
            });
            if (work.index() > activeWork.index()) {
                var fromY = 30;
            } else {
                var fromY = -30;
                contentElements.reverse();
            }
            if (work.index() > activeWork.index()) {
                image.css({
                    transformOrigin: '0 0'
                });
                imageAnimationContainer.css({
                    transform: 'rotateZ(180deg)'
                });
            }
            TweenLite.set(contentElements, {
                opacity: 0,
                y: fromY
            });
            tl.set(work, {
                alpha: 1
            }, startIn);
            tl.call(function() {
                animImage.play();
            }, null , null , startIn);
            tl.staggerTo(contentElements, 0.5, {
                alpha: 1,
                y: 0,
                ease: Power3.easeOut
            }, 0.05, startIn);
            tl.call(function() {
                contentElements.css({
                    opacity: '',
                    transform: ''
                });
                splitText.revert();
                image.css({
                    transform: '',
                    transformOrigin: ''
                });
                work.css({
                    opacity: ''
                });
                imageAnimationContainer.css({
                    transform: ''
                });
                animImage.destroy();
                worksWorksWait = false;
                switchPageSectionsWait = false;
                if (image.find('video').length == 1) {
                    image.find('video').get(0).play();
                }
            }, null , null , startIn + 1.7);
        });
        tl.play();
    }
    function worksNextWork(next) {
        var layout = $('.layout-works').first();
        var activeWork = layout.find('.section-works .work.is-active');
        if (next)
            var nextWork = activeWork.next('.work');
        else
            var nextWork = activeWork.prev('.work');
        if (nextWork.length == 1)
            worksSwitchWorks(nextWork);
    }
    function worksSubnavLink() {
        var link = $(this);
        var work = $('.layout-works').first().find('.section-works .work').eq(link.index());
        worksSwitchWorks(work);
    }
    function worksSubnavCheck() {
        var layout = $('.layout-works');
        var links = layout.find('.nav-page .subnav .item');
        var activeWork = layout.find('.section-works .work.is-active');
        links.removeClass('is-active');
        links.eq(activeWork.index()).addClass('is-active');
    }
    function worksArrowLink() {
        var link = $(this);
        var layout = $('.layout-works').first();
        var activeWork = layout.find('.section-works .work.is-active');
        if (link.hasClass('link-work-next')) {
            if (!activeWork.is(':last-child')) {
                worksNextWork(true);
            } else {
                nextPageSection(true);
            }
        } else if (link.hasClass('link-work-prev')) {
            if (!activeWork.is(':first-child')) {
                worksNextWork(false);
            } else {
                nextPageSection(false);
            }
        }
    }
    var processStepsWait = false;
    $(document).on('pageInitProcess', function() {
        var layout = $('.layout-process').first();
        var sectionIntro = layout.find('.section-intro');
        $(document).on('mousewheel', processVerticalNav);
        $(document).on('keyup', processVerticalNav);
        $(window).on('resize', processResize);
        $('body').on('click', '.link-step', processSubnavLink);
        $('body').on('click', '.link-step-prev, .link-step-next', processArrowLink);
        $('body').on('click', '.layout-process .nav-tablet .button', function() {
            processVerticalNav({
                type: 'arrow',
                direction: ($(this).hasClass('prev') ? 'down' : 'up')
            });
        });
        if (!isSmartphone) {
            $(document).swipe({
                swipe: function(event, direction) {
                    processVerticalNav({
                        type: 'swipe',
                        direction: direction
                    });
                },
                fallbackToMouseEvents: false,
                excludedElements: ''
            });
        }
        if (!isSmartphone) {
            processInitStepAnim(layout.find('.section-process .step.is-active'));
        } else {
            layout.find('.section-process .step').each(function() {
                processInitStepAnim($(this));
            });
        }
        if (isDev)
            return;
        layout.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0
        });
        var bmAnims = {}
        var bmTransition = bodymovin.loadAnimation({
            container: $('.global-animation').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/process-transition' + (windowHeight > windowWidth ? '-mobile' : '') + '.json'
        });
        bmAnims.transition = bmTransition;
        var bmIntro = bodymovin.loadAnimation({
            container: sectionIntro.find('.animation-container').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/process-intro.json'
        });
        bmAnims.intro = bmIntro;
        layout.data('bmAnims', bmAnims);
        sectionIntro.find('> div').css({
            opacity: 0
        });
    });
    $(document).on('pageOpeningProcess', function() {
        if (isDev)
            return;
        var layout = $('.layout-process').first();
        var sectionIntro = layout.find('.section-intro');
        var otherLayout = $('.page-container').not(layout);
        var animationContainer = $('.global-animation');
        var bmAnims = layout.data('bmAnims');
        var animLogo = $('.site-title .animation-container').data('bmAnim');
        animationContainer.css({
            display: 'block'
        });
        var startTransition = 0;
        var endTransition = startTransition + 1.1;
        var startHead = 1.7;
        var startIntro = 1.1;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.transition.play();
        }, null , null , startTransition);
        tl.call(function() {
            $('.nav-toggle, .nav-page').css({
                opacity: 0
            });
            $('.nav-main').removeClass('is-opened');
            $('.nav-main .open .line').css({
                backgroundColor: ''
            });
            layout.css({
                position: '',
                top: '',
                left: '',
                width: '',
                height: '',
                opacity: ''
            });
            otherLayout.hide();
            animationContainer.css({
                backgroundColor: '',
                display: 'none'
            });
            animLogo.stop();
            $('.site-title').find('.animation-container, .loader-container').css({
                display: ''
            });
            $('.global-loader').remove();
            bmAnims.transition.destroy();
        }, null , null , endTransition)
        tl.call(function() {
            animLogo.playSegments([0, 45], true);
            introNavButton();
        }, null , null , startHead);
        tl.call(function() {
            sectionIntro.trigger('intro');
        }, null , null , startIntro)
        tl.call(function() {
            pageKill();
            pageOpeningWait = false;
        });
        tl.play();
    });
    $(document).on('pageKillProcess', function() {
        var layout = $('.layout-process').first();
        $(document).off('mousewheel', processVerticalNav);
        $(document).off('keyup', processVerticalNav);
        $(window).off('resize', processResize);
        $('body').off('click', '.link-step', processSubnavLink);
        $('body').off('click', '.link-step-prev, .link-step-next', processArrowLink);
        $('body').off('click', '.layout-process .nav-tablet .button');
        var activeStepAnim = layout.find('.step.is-active').data('bmAnim');
        if (typeof (activeStepAnim) == 'object')
            activeStepAnim.destroy();
        if (!isSmartphone)
            $(document).swipe('destroy');
    });
    function processResize() {
        var layout = $('.layout-process').first();
        var steps = layout.find('.steps .step');
        if (isSmartphone) {
            steps.each(function() {
                $(this).css({
                    backgroundColor: $(this).attr('data-color')
                });
            });
        } else {
            steps.css({
                backgroundColor: ''
            });
        }
    }
    function processVerticalNav(e) {
        if (isSmartphone)
            return;
        var layout = $('.layout-process').first();
        var sections = layout.find('.page-section');
        var activeSection = sections.filter('.is-active');
        var activeStep = layout.find('.section-process .step.is-active');
        var down = null ;
        if (e.type == 'mousewheel') {
            down = (e.deltaY != 1);
        } else if (e.type == 'keyup') {
            if (e.which == 40)
                down = true;
            else if (e.which == 38)
                down = false;
        } else if (e.type == 'swipe') {
            if (e.direction == 'up')
                down = true;
            else if (e.direction == 'down')
                down = false;
        } else if (e.type == 'arrow') {
            if (e.direction == 'up')
                down = true;
            else
                down = false;
        }
        if (down == null )
            return;
        if (down) {
            if (activeSection.is('.section-intro') || (activeSection.is('.section-process') && activeStep.is(':last-child'))) {
                nextPageSection(true);
            } else if (activeSection.is('.section-process')) {
                processNextStep(true);
            }
        } else {
            if (activeSection.is('.section-contact') || (activeSection.is('.section-process') && activeStep.is(':first-child'))) {
                nextPageSection(false);
            } else if (activeSection.is('.section-process')) {
                processNextStep(false);
            }
        }
    }
    function processNextStep(next) {
        var layout = $('.layout-process').first();
        var activeStep = layout.find('.section-process .step.is-active');
        if (next)
            var nextStep = activeStep.next('.step');
        else
            var nextStep = activeStep.prev('.step');
        if (nextStep.length == 1)
            processSwitchSteps(nextStep);
    }
    $('body').on('click', '.layout-process .steps-navigation .big-dot', function() {
        var layout = $('.layout-process');
        var steps = layout.find('.steps .step');
        processSwitchSteps(steps.eq($(this).parent().index()));
    });
    function processSwitchSteps(step) {
        if (processStepsWait)
            return;
        processStepsWait = switchPageSectionsWait = true;
        var layout = $('.layout-process');
        var section = layout.find('.section-process');
        var steps = layout.find('.steps .step');
        var activeStep = steps.filter('.is-active');
        var stepTitle = step.find('.step-title');
        var stepContent = step.find('.step-content');
        var index = step.index();
        var pageText = section.find('.steps-pagination .page .text');
        var pageLine = section.find('.steps-pagination .page .line');
        var navigation = section.find('.steps-navigation');
        var navSlices = navigation.find('.slice');
        var activeSlices = navSlices.filter(':lt(' + (index) + ')');
        var currentSlice = navSlices.eq(index);
        var sectionContact = layout.find('.section-contact');
        var navToggleLines = $('.nav-main .open .line');
        var bmAnims = layout.data('bmAnims');
        var background = section.find('.steps-background');
        var subNavLinks = layout.find('.nav-page .subnav .item');
        if (step.hasClass('is-active'))
            return;
        if (activeStep.length == 1)
            activeStep.css({
                zIndex: 1
            });
        step.css({
            display: 'block',
            opacity: 0
        });
        var splitText = new SplitText(stepContent.find('p'),{
            type: 'lines',
            linesClass: 'line'
        });
        var stepLines = stepContent.find('.line');
        TweenLite.set(stepTitle, {
            alpha: 0,
            x: -50
        });
        TweenLite.set(stepLines, {
            opacity: 0,
            y: 30
        });
        var endTransition = 1;
        var startIntro = 0.6;
        var startPager = 0.2;
        var tl = new TimelineLite();
        tl.pause();
        if (activeStep.length == 1) {
            tl.to(section, 0.5, {
                backgroundColor: step.attr('data-color')
            }, 0);
            tl.to(activeStep, 0.5, {
                alpha: 0
            }, 0);
            tl.call(function() {
                var activeStepAnim = activeStep.data('bmAnim');
                if (typeof (activeStepAnim) == 'object') {
                    activeStepAnim.destroy();
                }
                activeStep.removeClass('is-active').css({
                    zIndex: ''
                });
                step.addClass('is-active').css({
                    display: '',
                    opacity: ''
                });
            }, null , null , endTransition);
        } else {
            startIntro = 0;
            tl.call(function() {
                section.css({
                    backgroundColor: step.attr('data-color')
                });
                step.addClass('is-active').css({
                    display: '',
                    opacity: ''
                });
            }, null , null , 0);
        }
        tl.set(step, {
            alpha: 1
        }, startIntro);
        tl.to(stepTitle, 0.8, {
            alpha: 1,
            x: 0,
            ease: Power3.easeOut
        }, startIntro);
        tl.staggerTo(stepLines, 0.5, {
            alpha: 1,
            y: 0,
            ease: Power3.easeOut
        }, 0.05, startIntro + 0.2);
        tl.call(function() {
            processInitStepAnim(step);
        }, null , null , startIntro + 0.2);
        tl.to(navToggleLines, 0.5, {
            'backgroundColor': step.attr('data-color')
        }, 0);
        if (activeStep.index() >= 0) {
            if (activeStep.index() < index) {
                var dots = currentSlice.not(':first-child').find('.dot');
                dots = dots.add(activeSlices.not('.is-active, .is-current, :first-child').find('.dot'));
                dots = dots.add(activeSlices.last().find('.dot').last());
                var finalDot = dots.last();
                dots.css({
                    transition: 'none'
                });
                if (dots.length > 0) {
                    var duration = 0.2;
                    var gap = 1.1 / dots.length;
                    tl.staggerTo(dots, duration, {
                        alpha: 1,
                        cycle: {
                            scale: function() {
                                if ($(this).hasClass('big-dot'))
                                    return 0.85;
                                return 1
                            }
                        },
                        ease: Power1.easeInOut
                    }, gap, 0);
                    tl.staggerTo(dots, duration, {
                        alpha: 1,
                        cycle: {
                            scale: function() {
                                if ($(this).is(finalDot))
                                    return 0.75;
                                return 0.5;
                            }
                        },
                        ease: Power1.easeInOut,
                        immediateRender: false
                    }, gap, duration, function() {
                        navSlices.removeClass('is-active is-current');
                        activeSlices.addClass('is-active');
                        currentSlice.addClass('is-current');
                        navSlices.find('.dot').css({
                            opacity: '',
                            transform: ''
                        });
                        dots.css({
                            transition: ''
                        });
                    });
                }
            } else {
                var dots = navSlices.filter('.is-active, .is-current').not(activeSlices).not(currentSlice).find('.dot');
                dots = dots.add(currentSlice.find('.dot').last());
                dots.reverse();
                var finalDot = dots.last();
                if (dots.length > 0) {
                    var duration = 0.2;
                    var gap = 1.1 / dots.length;
                    tl.staggerTo(dots, duration, {
                        cycle: {
                            scale: function() {
                                if ($(this).hasClass('big-dot'))
                                    return 0.85;
                                return 1;
                            }
                        },
                        ease: Power1.easeInOut
                    }, gap, 0);
                    tl.staggerTo(dots, duration, {
                        alpha: 0.3,
                        cycle: {
                            alpha: function() {
                                if ($(this).is(finalDot))
                                    return 1;
                                return 0.3
                            },
                            scale: function() {
                                if ($(this).is(finalDot))
                                    return 0.75;
                                return 0.5;
                            }
                        },
                        ease: Power1.easeInOut,
                        immediateRender: false
                    }, gap, duration, function() {
                        navSlices.removeClass('is-active is-current');
                        activeSlices.addClass('is-active');
                        currentSlice.addClass('is-current');
                        navSlices.find('.dot').css({
                            opacity: '',
                            transform: ''
                        });
                        dots.css({
                            transition: ''
                        });
                    });
                }
            }
        }
        if (activeStep.length == 1) {
            tl.to(pageText, 0.5, {
                alpha: 0,
                y: 10,
                ease: Power3.easeIn
            }, startPager);
            tl.call(function() {
                pageText.html(('0' + String(index + 1)).slice(-2));
            }, null , null , startPager + 0.5);
            tl.set(pageText, {
                alpha: 0,
                y: -10
            }, startPager + 0.5);
            tl.to(pageText, 0.5, {
                alpha: 1,
                y: 0,
                ease: Power3.easeOut
            }, startPager + 0.5);
        }
        tl.call(function() {
            subNavLinks.removeClass('is-active');
            subNavLinks.eq(index).addClass('is-active');
        }, null , null , 0.2)
        tl.call(function() {
            step.css({
                opacity: ''
            });
            stepTitle.css({
                opacity: '',
                transform: ''
            });
            stepContent.css({
                opacity: '',
                transform: ''
            });
            splitText.revert();
            pageText.css({
                opacity: '',
                transform: ''
            });
            processStepsWait = switchPageSectionsWait = false;
        });
        tl.play();
    }
    function processInitStepAnim(step) {
        var stepIllustration = step.find('.step-illustration');
        var animID = stepIllustration.attr('data-id');
        if (animID) {
            var animKey = animID.toLowerCamel();
            var stepAnimIntro = bodymovin.loadAnimation({
                container: stepIllustration.find('div').get(0),
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: bmProcessAnimationsData[animKey + 'Intro']
            });
            step.data('bmAnim', stepAnimIntro);
            stepAnimIntro.addEventListener('complete', function() {
                stepAnimIntro.destroy();
                var stepAnimLoop = bodymovin.loadAnimation({
                    container: stepIllustration.find('div').get(0),
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: bmProcessAnimationsData[animKey + 'Loop']
                });
                step.data('bmAnim', stepAnimLoop);
            })
        }
    }
    function processSubnavLink() {
        var link = $(this);
        var step = $('.layout-process').first().find('.section-process .step').eq(link.index());
        processSwitchSteps(step);
    }
    function processArrowLink() {
        var link = $(this);
        var layout = $('.layout-process').first();
        var activeStep = layout.find('.section-process .step.is-active');
        if (link.hasClass('link-step-next')) {
            if (!activeStep.is(':last-child')) {
                processNextStep(true);
            } else {
                nextPageSection(true);
            }
        } else if (link.hasClass('link-step-prev')) {
            if (!activeStep.is(':first-child')) {
                processNextStep(false);
            } else {
                nextPageSection(false);
            }
        }
    }
    $(document).on('pageInitAbout', function() {
        var layout = $('.layout-about');
        var sectionIntro = layout.find('.section-intro');
        $(document).on('mousewheel', aboutVerticalNav);
        $(document).on('keyup', aboutVerticalNav);
        $('body').on('click', '.layout-about .nav-tablet .button', function() {
            aboutVerticalNav({
                type: 'arrow',
                direction: ($(this).hasClass('prev') ? 'down' : 'up')
            });
        });
        if (!isSmartphone) {
            $(document).swipe({
                swipe: function(event, direction) {
                    aboutVerticalNav({
                        type: 'swipe',
                        direction: direction
                    });
                },
                fallbackToMouseEvents: false,
                excludedElements: ''
            });
        }
        if (isDev)
            return;
        if (isSmartphone) {
            aboutInitTeamAnim(true);
        }
        layout.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0
        });
        var bmAnims = {}
        var bmTransition = bodymovin.loadAnimation({
            container: $('.global-animation').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/about-transition' + (windowHeight > windowWidth ? '-mobile' : '') + '.json'
        });
        bmAnims.transition = bmTransition;
        var bmIntro = bodymovin.loadAnimation({
            container: sectionIntro.find('.animation-container').get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: WRK.tpl_dir + '/anim/about-intro.json'
        });
        bmAnims.intro = bmIntro;
        layout.data('bmAnims', bmAnims);
        sectionIntro.find('> div').css({
            opacity: 0
        });
    });
    $(document).on('pageOpeningAbout', function() {
        if (isDev)
            return;
        var layout = $('.layout-about').first();
        var sectionIntro = layout.find('.section-intro');
        var otherLayout = $('.page-container').not(layout);
        var animationContainer = $('.global-animation');
        var bmAnims = layout.data('bmAnims');
        var animLogo = $('.site-title .animation-container').data('bmAnim');
        animationContainer.css({
            display: 'block'
        });
        var startTransition = 0;
        var endTransition = startTransition + 1.1;
        var startHead = 1.9;
        var startIntro = 1.1;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmAnims.transition.play();
        }, null , null , startTransition);
        tl.call(function() {
            $('.nav-toggle, .nav-page').css({
                opacity: 0
            });
            $('.nav-main').removeClass('is-opened');
            $('.nav-main .open .line').css({
                backgroundColor: ''
            });
            layout.css({
                position: '',
                top: '',
                left: '',
                width: '',
                height: '',
                opacity: ''
            });
            otherLayout.hide();
            animationContainer.css({
                backgroundColor: '',
                display: 'none'
            });
            animLogo.stop();
            $('.site-title').find('.animation-container, .loader-container').css({
                display: ''
            });
            $('.global-loader').remove();
            bmAnims.transition.destroy();
        }, null , null , endTransition)
        tl.call(function() {
            animLogo.playSegments([0, 45], true);
            introNavButton();
        }, null , null , startHead);
        tl.call(function() {
            sectionIntro.trigger('intro');
        }, null , null , startIntro)
        tl.call(function() {
            pageKill();
            pageOpeningWait = false;
        });
        tl.play();
    });
    $(document).on('pageKillAbout', function() {
        var layout = $('.layout-about').first();
        layout.find('.section-team .member-illustration').each(function() {
            var bmAnim = $(this).data('bmAnim');
            if (bmAnim != undefined)
                bmAnim.destroy();
        })
        $(document).off('mousewheel', aboutVerticalNav);
        $(document).off('keyup', aboutVerticalNav);
        $('body').off('click', '.layout-about .nav-tablet .button');
        if (!isSmartphone)
            $(document).swipe('destroy');
    });
    function aboutVerticalNav(e) {
        if (isSmartphone)
            return;
        var layout = $('.layout-about').first();
        var sections = layout.find('.page-section');
        var activeSection = sections.filter('.is-active');
        var down = null ;
        if (e.type == 'mousewheel') {
            down = (e.deltaY != 1);
        } else if (e.type == 'keyup') {
            if (e.which == 40)
                down = true;
            else if (e.which == 38)
                down = false;
        } else if (e.type == 'swipe') {
            if (e.direction == 'up')
                down = true;
            else if (e.direction == 'down')
                down = false;
        } else if (e.type == 'arrow') {
            if (e.direction == 'up')
                down = true;
            else
                down = false;
        }
        if (down == null )
            return;
        if (down && (activeSection.is('.section-intro') || activeSection.is('.section-team'))) {
            nextPageSection(true);
        } else if (!down && (activeSection.is('.section-contact') || activeSection.is('.section-team'))) {
            nextPageSection(false);
        }
    }
    function aboutInitTeamAnim(loop) {
        var layout = $('.layout-about').first();
        var containers = layout.find('.section-team .member-illustration');
        if (!loop) {
            containers.each(function() {
                var container = $(this);
                var id = container.attr('data-id');
                var animKey = 'about' + id.toCamel();
                var oldAnim = container.data('bmAnim');
                if (oldAnim != undefined)
                    oldAnim.destroy();
                var animIntro = bodymovin.loadAnimation({
                    container: container.get(0),
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: bmAboutAnimationsData[animKey + 'Intro']
                });
                container.data('bmAnim', animIntro);
                animIntro.addEventListener('complete', function() {
                    animIntro.destroy();
                    var animLoop = bodymovin.loadAnimation({
                        container: container.get(0),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: bmAboutAnimationsData[animKey + 'Loop']
                    });
                    container.data('bmAnim', animLoop);
                });
            });
        } else {
            containers.each(function() {
                var container = $(this);
                var id = container.attr('data-id');
                var animKey = 'about' + id.toCamel();
                var oldAnim = container.data('bmAnim');
                if (oldAnim != undefined)
                    oldAnim.destroy();
                var animLoop = bodymovin.loadAnimation({
                    container: container.get(0),
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: bmAboutAnimationsData[animKey + 'Loop']
                });
                container.data('bmAnim', animLoop);
            });
        }
    }
    $(document).on('pageInitError', function() {
        var layout = $('.layout-404').first();
        $('.nav-toggle, .nav-page').css({
            opacity: 0
        });
        $('.nav-main').removeClass('is-opened');
        $('.nav-main .open .line').css({
            backgroundColor: ''
        });
        $('.site-title').find('.animation-container, .loader-container').css({
            display: ''
        });
        $('.global-animation').css({
            display: 'none'
        });
        meSpeak.loadConfig(WRK.tpl_dir + '/js/mespeak_config.json');
        meSpeak.loadVoice(WRK.tpl_dir + '/js/mespeak_en.json');
        meSpeakOptions = {
            pitch: 70,
            wordgap: 1,
            variant: 'm6',
            linebreak: 50,
            ssml: true
        }
        var text = $('.layout-404 .speech').html();
        meSpeak.speak(text, meSpeakOptions);
    });
    $(document).on('pageOpeningError', function() {
        if (isDev)
            return;
        var layout = $('.layout-404').first();
        var animLogo = $('.site-title .animation-container').data('bmAnim');
        $('.global-loader').fadeTo(200, 0, function() {
            $('.global-loader').remove();
        });
        animLogo.stop();
        animLogo.playSegments([0, 45], true);
        introNavButton();
        pageKill();
        pageOpeningWait = false;
    });
    $(document).on('pageKillError', function() {
        var layout = $('.layout-404').first();
        var container = layout.find('.animation-global');
        var bmAnim = container.data('bmAnim');
        bmAnim.destroy();
    });
    function loadVoice(id) {
        var fname = "voices/" + id + ".json";
        meSpeak.loadVoice(fname, errorVoiceLoaded);
    }
    function errorVoiceLoaded(success, message) {
        if (success) {
            alert("Voice loaded: " + message + ".");
        } else {
            alert("Failed to load a voice: " + message);
        }
    }
    $('body').on('intro', '.layout-process .section-intro, .layout-works .section-intro, .layout-about .section-intro', function() {
        switchPageSectionsWait = true;
        var section = $(this);
        var layout = section.closest('.page-container');
        var introInner = section.find('.section-inner');
        var introBackground = section.find('.section-background');
        var introLink = section.find('.section-scroll');
        var otherLayout = $('.page-container').not(layout);
        var activeSection = section.siblings('.page-section.is-active');
        var animationContainer = $('.global-animation');
        var bmAnims = layout.data('bmAnims');
        var navToggleLines = $('.nav-main .open .line');
        var splitText = new SplitText(section.find('.section-inner p'),{
            type: 'lines',
            linesClass: 'line'
        });
        var introInnerLines = introInner.find('.line, .section-title');
        bmAnims.intro.stop();
        TweenLite.set(introInnerLines, {
            opacity: 0,
            y: 50
        });
        TweenLite.set(introLink, {
            opacity: 0,
            y: 20
        });
        introInner.css({
            opacity: ''
        });
        introBackground.css({
            opacity: ''
        });
        var delay = 0;
        if (activeSection.hasClass('section-contact'))
            delay = 0.7;
        else if (activeSection.hasClass('section-works'))
            delay = 0.7;
        else if (activeSection.hasClass('section-team'))
            delay = 1;
        else if (!section.hasClass('is-active'))
            delay = 0.5;
        var startBackground = delay;
        var startInner = delay + 0.65;
        var startLink = delay + 1.7;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            section.find('.animation-container svg').get(0).setAttribute('preserveAspectRatio', 'xMidYMid meet');
            bmAnims.intro.play();
        }, null , null , startBackground);
        tl.staggerTo(introInnerLines, 0.5, {
            alpha: 1,
            y: 0,
            ease: Back.easeOut
        }, 0.1, startInner, function() {
            splitText.revert();
            introInnerLines.css({
                transform: '',
                opacity: ''
            });
        });
        tl.to(introLink, 0.5, {
            alpha: 1,
            y: 0,
            ease: Power3.easeOut
        }, startLink);
        tl.call(function() {
            introBackground.css({
                opacity: ''
            });
            introLink.css({
                opacity: ''
            });
            switchPageSectionsWait = false;
        });
        tl.play();
    });
    $('body').on('outro', '.layout-process .section-intro, .layout-works .section-intro, .layout-about .section-intro', function(e, nextSection) {
        var section = $(this);
        var inner = section.find('.section-inner');
        var link = section.find('.section-scroll');
        var background = section.find('.section-background');
        var activeSection = section.siblings('.page-section.is-active');
        if (!$(nextSection).hasClass('section-contact')) {
            var splitText = new SplitText(section.find('.section-inner p'),{
                type: 'lines',
                linesClass: 'line'
            });
            var innerLines = inner.find('.line, .section-title');
            TweenLite.set(background, {
                scale: 1
            });
            var tl = new TimelineLite();
            tl.pause();
            tl.staggerTo(innerLines, 0.5, {
                alpha: 0,
                y: -50,
                ease: Back.easeIn
            }, 0.1, 0, function() {
                splitText.revert();
                innerLines.css({
                    transform: '',
                    opacity: ''
                });
            });
            tl.to(background, 0.5, {
                alpha: 0,
                scale: 0.8,
                ease: Power3.easeIn
            }, 0);
            tl.to(link, 0.5, {
                alpha: 0
            }, 0);
            tl.call(function() {
                background.css({
                    opacity: '',
                    transform: ''
                });
                link.css({
                    opacity: '',
                    transform: ''
                });
                section.css({
                    position: '',
                    top: '',
                    left: '',
                    zIndex: ''
                });
            });
            tl.play();
        }
    });
    $('body').on('intro', '.layout-process .section-process', function() {
        switchPageSectionsWait = true;
        var section = $(this);
        var layout = $('.layout-process').first();
        var navigation = section.find('.steps-navigation');
        var navSlices = navigation.find('.slice');
        var navSmallDots = navigation.find('.small-dot');
        var navBigDots = navigation.find('.big-dot');
        var pagination = section.find('.steps-pagination');
        var activeSection = section.siblings('.page-section.is-active');
        var subNavLinks = layout.find('.nav-page .subnav .item');
        if (activeSection.hasClass('section-intro'))
            var step = section.find('.step').first();
        else
            var step = section.find('.step').last();
        navSlices.removeClass('is-current is-active');
        navSlices.filter(':lt(' + (step.index()) + ')').addClass('is-active');
        navSlices.eq(step.index()).addClass('is-current');
        subNavLinks.removeClass('is-active');
        subNavLinks.eq(step.index()).addClass('is-active');
        section.css({
            backgroundColor: step.attr('data-color')
        });
        step.css({
            opacity: 0
        });
        navigation.css({
            opacity: 0
        });
        pagination.css({
            opacity: 0
        });
        var delay = 0;
        if (activeSection.hasClass('section-intro'))
            delay = 1.1;
        else if (activeSection.hasClass('section-contact'))
            delay = 0.7;
        var startNavigation = delay;
        var startPagination = delay + 1.7;
        var startStep = delay + 1;
        var tl = new TimelineLite();
        tl.pause();
        var animateNavigation = navigation.data('animate');
        if (animateNavigation !== false) {
            tl.to(navigation, 0.3, {
                alpha: 1
            }, startNavigation);
            tl.from(navBigDots.filter(':even'), 1, {
                left: navigation.width() / 2,
                top: navigation.height() / 2,
                ease: Power3.easeInOut
            }, startNavigation);
            tl.from(navBigDots.filter(':odd'), 1, {
                left: navigation.width() / 2,
                top: navigation.height() / 2,
                ease: Power3.easeInOut
            }, startNavigation + 0.2);
            tl.staggerFrom(navSmallDots, 1.5, {
                alpha: 0,
                cycle: {
                    left: function() {
                        return Math.random() * navigation.width() * 3 - navigation.width();
                    },
                    top: function() {
                        return Math.random() * navigation.height() * 3 - navigation.height();
                    }
                },
                ease: Expo.easeOut
            }, 0.005, startNavigation + 0.5);
            navigation.data('animate', false);
        } else {
            tl.to(navigation, 0.3, {
                alpha: 1
            }, startNavigation);
            startPagination = delay;
            startStep = delay + 0.3;
        }
        tl.to(pagination, 0.5, {
            alpha: 1
        }, startPagination);
        tl.call(function() {
            processSwitchSteps(step);
        }, null , null , startStep)
        tl.call(function() {
            navigation.css({
                opacity: ''
            });
            navigation.find('.dot').css({
                top: '',
                left: ''
            });
            pagination.css({
                opacity: ''
            });
            step.css({
                opacity: ''
            });
            switchPageSectionsWait = false;
        });
        tl.play();
    });
    $('body').on('outro', '.layout-process .section-process', function(e, nextSection) {
        var section = $(this);
        var step = section.find('.step.is-active');
        var delay = 0;
        var duration = 0.5;
        if ($(nextSection).hasClass('section-contact')) {
            delay = 1.3;
            duration = 0;
        }
        var tl = new TimelineLite();
        tl.pause();
        tl.to(section, duration, {
            alpha: 0
        }, delay);
        tl.call(function() {
            section.css({
                opacity: '',
                position: '',
                top: '',
                left: '',
                zIndex: ''
            });
            step.removeClass('is-active');
            var stepAnim = step.data('bmAnim');
            if (typeof (stepAnim) == 'object')
                stepAnim.destroy();
        });
        tl.play();
    });
    $('body').on('intro', '.layout-works .section-works', function() {
        switchPageSectionsWait = true;
        worksWorksWait = true;
        var section = $(this);
        var activeSection = section.siblings('.page-section.is-active');
        section.find('.work').removeClass('is-active');
        if (activeSection.hasClass('section-intro'))
            section.find('.work').first().addClass('is-active');
        else if (activeSection.hasClass('section-contact'))
            section.find('.work').last().addClass('is-active');
        var layout = $('.layout-works').first();
        var activeWork = section.find('.work.is-active');
        var subNavLinks = layout.find('.nav-page .subnav .item');
        var image = activeWork.find('.work-image .image-container');
        var imageAnimationContainer = image.find('.animation-container');
        var content = activeWork.find('.work-content');
        var contentInner = content.find('.inner');
        var contentBorder = content.find('.border');
        var contentAnimationContainer = content.find('.animation-container');
        var navToggleLines = $('.nav-main .open .line');
        var animContent = bodymovin.loadAnimation({
            container: contentAnimationContainer.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: bmWorksAnimationsData['worksBackgroundOut']
        });
        contentAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
        var animImage = bodymovin.loadAnimation({
            container: imageAnimationContainer.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: bmWorksAnimationsData['worksBackgroundIn'],
        });
        imageAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
        subNavLinks.removeClass('is-active');
        subNavLinks.eq(activeWork.index()).addClass('is-active');
        if (activeSection.hasClass('section-intro'))
            section.css({
                backgroundColor: activeSection.css('backgroundColor')
            });
        else
            section.css({
                backgroundColor: activeWork.attr('data-color')
            });
        TweenLite.set(image, {
            scaleY: 0
        });
        contentInner.css({
            backgroundColor: 'transparent'
        });
        var splitText = new SplitText(content.find('.work-description p'),{
            type: 'lines',
            linesClass: 'line'
        });
        var contentElements = content.find('.work-title, .work-category, .line, .work-link, .work-credits li');
        TweenLite.set(contentElements, {
            opacity: 0,
            y: 30
        });
        activeWork.css({
            opacity: 0
        });
        var blackBackground = ColorMix.mix([new ColorMix.Color(0,0,0), new ColorMix.Color().fromHex(activeWork.attr('data-color'))], [20, 80]).toString('hex');
        imageAnimationContainer.find('path:last').css({
            fill: blackBackground
        });
        contentAnimationContainer.find('path:first').css({
            fill: blackBackground
        });
        var topBorder = contentBorder.position().top;
        var leftBorder = contentBorder.position().left;
        contentBorder.css({
            opacity: 0,
            top: 0,
            left: 0
        });
        var delay = 0;
        if (activeSection.hasClass('section-intro')) {
            delay = 1.1;
        } else if (activeSection.hasClass('section-contact')) {
            delay = 0.7;
        }
        var startWork = delay;
        var tl = new TimelineLite();
        tl.pause();
        if (activeSection.hasClass('section-intro')) {
            tl.to(activeWork, 1, {
                alpha: 1
            }, delay);
        } else if (activeSection.hasClass('section-contact')) {
            tl.set(activeWork, {
                alpha: 1
            }, 0);
        }
        tl.to(section, 1, {
            backgroundColor: activeWork.attr('data-color')
        }, delay);
        tl.to(navToggleLines, 1, {
            backgroundColor: activeWork.attr('data-color')
        }, delay);
        tl.to(image, 0.8, {
            scaleY: 1,
            ease: Power3.easeInOut
        }, delay);
        tl.call(function() {
            animImage.play();
        }, null , null , delay + 0.6);
        tl.call(function() {
            animContent.play();
        }, null , null , delay + 0.9);
        tl.staggerTo(contentElements, 0.5, {
            alpha: 1,
            y: 0,
            ease: Power3.easeOut
        }, 0.05, delay + 1.1);
        tl.set(contentBorder, {
            alpha: 1
        }, delay + 1.5);
        tl.to(contentBorder, 0.3, {
            top: topBorder,
            left: leftBorder,
            ease: Power2.easeOut
        }, delay + 1.5);
        tl.call(function() {
            activeWork.css({
                opacity: ''
            });
            contentElements.css({
                opacity: '',
                transform: ''
            });
            splitText.revert();
            image.css({
                transform: ''
            });
            contentInner.css({
                backgroundColor: ''
            });
            contentBorder.css({
                opacity: '',
                top: '',
                left: ''
            });
            animContent.destroy();
            animImage.destroy();
            switchPageSectionsWait = false;
            worksWorksWait = false;
            if (image.find('video').length == 1) {
                image.find('video').get(0).play();
            }
        });
        tl.play();
    });
    $('body').on('outro', '.layout-works .section-works', function(e, nextSection) {
        worksWorksWait = true;
        if (!$(nextSection).hasClass('section-contact')) {
            var section = $(this);
            var activeWork = section.find('.work.is-active');
            var image = activeWork.find('.work-image');
            var imageAnimationContainer = image.find('.animation-container');
            var content = activeWork.find('.work-content');
            var contentBorder = content.find('.border');
            var contentAnimationContainer = content.find('.animation-container');
            var animContent = bodymovin.loadAnimation({
                container: contentAnimationContainer.get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: bmWorksAnimationsData['worksBackgroundOut']
            });
            contentAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            var animImage = bodymovin.loadAnimation({
                container: imageAnimationContainer.get(0),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: bmWorksAnimationsData['worksBackgroundOut'],
            });
            imageAnimationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            var blackBackground = ColorMix.mix([new ColorMix.Color(0,0,0), new ColorMix.Color().fromHex(activeWork.attr('data-color'))], [20, 80]).toString('hex');
            var toBlackBackground = ColorMix.mix([new ColorMix.Color(0,0,0), new ColorMix.Color($(nextSection).css('backgroundColor'))], [20, 80]).toString('hex');
            imageAnimationContainer.find('path:first').css({
                fill: blackBackground
            });
            imageAnimationContainer.find('path:last').css({
                fill: activeWork.attr('data-color')
            });
            contentAnimationContainer.find('path:first').css({
                fill: blackBackground
            });
            contentAnimationContainer.find('path:last').css({
                fill: activeWork.attr('data-color')
            });
            imageAnimationContainer.css({
                transform: 'rotateZ(180deg)'
            });
            contentAnimationContainer.css({
                transform: 'rotateZ(180deg)'
            });
            contentAnimationContainer.parent().css({
                zIndex: 4
            });
            var tl = new TimelineLite();
            tl.pause();
            tl.to(contentBorder, 0.3, {
                top: 0,
                left: 0,
                ease: Power3.easeIn
            }, 0);
            tl.call(function() {
                animImage.play();
            }, null , null , 0.1);
            tl.call(function() {
                animContent.play();
            }, null , null , 0.3);
            tl.to(contentAnimationContainer.find('svg path:last').add(imageAnimationContainer.find('svg path:last')), 0.5, {
                fill: toBlackBackground
            }, 0);
            tl.to(contentAnimationContainer.find('svg path:first').add(imageAnimationContainer.find('svg path:first')), 0.5, {
                fill: toBlackBackground
            }, 0);
            tl.to(section, 0.5, {
                backgroundColor: $(nextSection).css('backgroundColor')
            }, 0);
            tl.to(section, 0.7, {
                alpha: 0
            }, 0.7);
            tl.call(function() {
                section.css({
                    backgroundColor: '',
                    opacity: '',
                    position: '',
                    top: '',
                    left: '',
                    zIndex: ''
                });
                contentBorder.css({
                    top: '',
                    left: ''
                });
                contentAnimationContainer.parent().css({
                    zIndex: ''
                });
                imageAnimationContainer.css({
                    transform: ''
                });
                contentAnimationContainer.css({
                    transform: ''
                });
                animContent.destroy();
                animImage.destroy();
                if (image.find('video').length == 1) {
                    image.find('video').get(0).pause();
                    image.find('video').get(0).currentTime = 0;
                }
            });
            tl.play();
        }
    });
    $('body').on('intro', '.layout-about .section-team', function() {
        switchPageSectionsWait = true;
        var section = $(this);
        var sections = $('.page-section');
        var activeSection = sections.filter('.is-active');
        var layout = $('.layout-about').first();
        var inner = section.find('.section-inner');
        var content = section.find('.section-content');
        var members = section.find('.member');
        var navToggleLines = $('.nav-main .open .line');
        aboutInitTeamAnim(isSmartphone);
        var splitText = new SplitText(content.find('.text p'),{
            type: 'lines',
            linesClass: 'line'
        });
        var contentElements = content.find('.section-title, .line');
        TweenLite.set(contentElements, {
            opacity: 0,
            y: 30
        });
        inner.css({
            opacity: 0
        });
        var delay = 0;
        if (activeSection.hasClass('section-intro'))
            delay = 1.1;
        else if (activeSection.hasClass('section-contact'))
            delay = 0.7;
        var tl = new TimelineLite();
        tl.pause();
        tl.to(inner, 0.5, {
            alpha: 1
        }, delay)
        tl.staggerTo(contentElements, 0.5, {
            alpha: 1,
            y: 0,
            ease: Power3.easeOut
        }, 0.05, delay + 0.3);
        tl.to(navToggleLines, 0.3, {
            backgroundColor: '#24305E'
        }, (delay != 0 ? delay + 0.05 : delay + 0.25));
        members.each(function(i) {
            var member = $(this);
            var animationContainer = member.find('.member-illustration');
            var bmAnim = animationContainer.data('bmAnim');
            var elements = member.find('.member-detail > div');
            TweenLite.set(elements, {
                opacity: 0,
                y: 30
            });
            tl.call(function() {
                bmAnim.play();
            }, null , null , delay + 0.6 + (i * 0.2))
            tl.staggerTo(elements, 0.5, {
                alpha: 1,
                y: 0,
                ease: Power3.easeOut
            }, 0.05, delay + (i * 0.2) + 1);
        });
        tl.call(function() {
            contentElements.css({
                opacity: '',
                transform: ''
            });
            splitText.revert();
            members.find('.member-detail > div').css({
                opacity: '',
                transform: ''
            });
            switchPageSectionsWait = false;
        }, null , null , delay + 1.9);
        tl.play();
    });
    $('body').on('outro', '.layout-about .section-team', function(e, nextSection) {
        var section = $(this);
        if (!$(nextSection).hasClass('section-contact')) {
            var content = section.find('.section-content');
            var members = section.find('.member');
            var inner = section.find('.section-inner');
            var splitText = new SplitText(content.find('.text p'),{
                type: 'lines',
                linesClass: 'line'
            });
            var contentElements = content.find('.section-title, .line');
            var delay = 0;
            var tl = new TimelineLite();
            tl.pause();
            tl.staggerTo(contentElements, 0.5, {
                alpha: 0,
                y: -30,
                ease: Power3.easeIn
            }, 0.05, 0);
            members.each(function(i) {
                var member = $(this);
                var animationContainer = member.find('.member-illustration');
                var elements = member.find('.member-detail > div');
                tl.to(animationContainer, 0.5, {
                    alpha: 0
                }, 0.2 + (i * 0.2));
                tl.staggerTo(elements, 0.5, {
                    alpha: 0,
                    y: -30,
                    ease: Power3.easeIn
                }, 0.05, 0.3 + (i * 0.2));
            });
            tl.to(section, 0.5, {
                alpha: 0
            }, 0.8);
            tl.call(function() {
                members.find('.member-illustration, .member-detail > div').css({
                    opacity: '',
                    transform: ''
                });
                contentElements.css({
                    opacity: '',
                    transform: ''
                });
                splitText.revert();
                section.css({
                    backgroundColor: '',
                    opacity: '',
                    position: '',
                    top: '',
                    left: '',
                    zIndex: ''
                });
            });
            tl.play();
        }
    });
    $('body').on('intro', '.layout-process .section-contact, .layout-works .section-contact, .layout-about .section-contact', function() {
        switchPageSectionsWait = true;
        var section = $(this);
        var sections = $('.page-section');
        var activeSection = sections.filter('.is-active');
        var layout = section.closest('.page-container');
        var animationContainer = section.find('.animation-container');
        var navToggleLines = $('.nav-main .open .line');
        var contact = section.find('.block-contact');
        var title = contact.find('.block-title');
        var contactElements = contact.find('.link-contact, .link');
        var navElements = section.find('.nav-site .menu-item');
        var wave = section.find('.wave-canvas');
        if (!simplifiedVersion()) {
            contactCanvasPlay(false);
            $(window).on('resize', contactResizeCanvas);
        }
        var bmContact = bodymovin.loadAnimation({
            container: animationContainer.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: bmAnimationsData.sectionContact
        });
        wave.css({
            opacity: 0
        });
        section.css({
            backgroundColor: 'transparent'
        });
        contact.css({
            backgroundColor: 'transparent'
        });
        title.css({
            opacity: 0
        });
        TweenLite.set(contactElements.add(navElements), {
            alpha: 0,
            y: 20
        });
        var endIntro = 1;
        var startNavLines = 0.3;
        var startContact = 0.6;
        var startNav = 0.9;
        var tl = new TimelineLite();
        tl.pause();
        tl.call(function() {
            animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
            bmContact.play();
        }, null , null , 0);
        tl.call(function() {
            bmContact.destroy();
            wave.css({
                opacity: ''
            });
            contact.css({
                backgroundColor: ''
            });
            section.css({
                backgroundColor: ''
            });
        }, null , null , endIntro);
        tl.to(title, 0.3, {
            alpha: 1
        }, startContact);
        tl.staggerTo(contactElements, 0.5, {
            alpha: 1,
            y: 0,
            ease: Back.easeOut
        }, 0.1, startContact + 0.2);
        tl.staggerTo(navElements, 0.5, {
            alpha: 1,
            y: 0,
            ease: Back.easeOut
        }, 0.1, startNav);
        tl.to(navToggleLines, 0.3, {
            backgroundColor: '#79c4c8'
        }, startNavLines);
        tl.call(function() {
            section.css({
                opacity: '',
                position: '',
                top: '',
                left: '',
                zIndex: ''
            });
            activeSection.css({
                opacity: '',
                position: '',
                top: '',
                left: '',
                zIndex: ''
            });
            contactElements.add(navElements).css({
                opacity: '',
                transform: ''
            });
            switchPageSectionsWait = false;
        });
        tl.play();
    });
    $('body').on('outro', '.layout-process .section-contact, .layout-works .section-contact, .layout-about .section-contact', function() {
        var section = $(this);
        var animationContainer = section.find('.animation-container');
        var contact = section.find('.block-contact');
        var elements = section.find('.block-contact, .nav-site');
        var wave = section.find('.wave-canvas');
        var canvas = wave.find('canvas');
        var bmContact = bodymovin.loadAnimation({
            container: animationContainer.get(0),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: bmAnimationsData.sectionContact
        });
        animationContainer.find('svg').get(0).setAttribute('preserveAspectRatio', 'none');
        bmContact.setDirection(-1);
        bmContact.goToAndStop(bmContact.totalFrames, true);
        wave.css({
            opacity: 0
        });
        section.css({
            backgroundColor: 'transparent'
        });
        contact.css({
            backgroundColor: 'transparent'
        });
        var startContact = 0;
        var endContact = startContact + 1;
        var tl = new TimelineLite();
        tl.pause();
        tl.to(elements, 0.4, {
            alpha: 0
        }, 0);
        tl.call(function() {
            bmContact.play();
        }, null , null , startContact);
        tl.call(function() {
            bmContact.destroy();
            elements.css({
                opacity: ''
            });
            wave.css({
                opacity: ''
            });
            contact.css({
                backgroundColor: ''
            });
            section.css({
                backgroundColor: '',
                opacity: '',
                position: '',
                top: '',
                left: '',
                zIndex: ''
            });
            if (!simplifiedVersion()) {
                contactCanvasStop();
                $(window).off('resize', contactResizeCanvas);
            }
        }, null , null , endContact);
        tl.play();
    });
    function contactResizeCanvas() {
        var section = $('.page-container:first .section-contact');
        var canvas = section.find('.wave-canvas canvas');
        if (!section.hasClass('is-active') || canvas.length != 1)
            return;
        contactCanvasStop();
        contactCanvasPlay(true);
    }
    function contactInitCanvas() {
        var canvas = $('.page-container:first .section-contact .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var vTotalPoints = 5;
        canvas.get(0).width = windowWidth;
        canvas.get(0).height = windowHeight;
        var c = canvas.get(0).getContext('2d');
        canvas.data('c', c);
        var vPoints1 = [];
        var vPoints2 = [];
        var vGap = (canvas.height()) / (vTotalPoints - 1);
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            vPoints1.push(new Point(canvas.get(0).width * 0.333333,i * vGap,'v',false,canvas));
            vPoints2.push(new Point(canvas.get(0).width * 0.666666,i * vGap,'v',false,canvas));
        }
        canvas.data('vPoints1', vPoints1);
        canvas.data('vPoints2', vPoints2);
        canvas.data('vGap', vGap);
    }
    function contactCanvasPlay(active) {
        if (active)
            var canvas = $('.page-container:first .section-contact.is-active .wave-canvas canvas');
        else
            var canvas = $('.page-container:first .section-contact .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var isPlaying = canvas.data('isPlaying');
        if (isPlaying)
            return
        canvas.data('isPlaying', true);
        contactInitCanvas();
        contactCanvasRender();
    }
    function contactCanvasStop() {
        var canvas = $('.page-container:first .section-contact .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var rafID = canvas.data('rafID');
        cancelAnimationFrame(rafID);
        canvas.data('isPlaying', false);
    }
    function contactCanvasRender() {
        var canvas = $('.page-container:first .section-contact .wave-canvas canvas');
        if (canvas.length != 1)
            return;
        var rafID = requestAnimationFrame(contactCanvasRender);
        canvas.data('rafID', rafID);
        var layout = $('.page-container');
        var c = canvas.data('c');
        var vPoints1 = canvas.data('vPoints1');
        var vPoints2 = canvas.data('vPoints2');
        var vTotalPoints = vPoints1.length;
        var mainColor = '#8ccdd0';
        var columnsColor = '#79c4c8';
        c.clearRect(0, 0, canvas.width(), canvas.height());
        c.fillStyle = mainColor;
        c.fillRect(0, 0, canvas.width(), canvas.height());
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            vPoints1[i].move();
            vPoints2[i].move();
        }
        c.fillStyle = columnsColor;
        c.strokeStyle = columnsColor;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(canvas.width() * 0.333333, 0);
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            var p = vPoints1[i];
            if (i < vTotalPoints - 1) {
                if (i == 0) {
                    p.y = 0;
                    p.cx = p.x;
                    p.cy = p.y;
                } else {
                    p.cx = (p.x + vPoints1[i + 1].x) / 2;
                    p.cy = (p.y + vPoints1[i + 1].y) / 2;
                }
            } else {
                p.cx = p.x;
                p.cy = p.y;
            }
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        c.lineTo(0, canvas.height());
        c.lineTo(0, 0);
        c.closePath();
        c.fill();
        c.beginPath();
        c.moveTo(canvas.width() * 0.666666, 0);
        for (var i = 0; i <= vTotalPoints - 1; i++) {
            var p = vPoints2[i];
            if (i < vTotalPoints - 1) {
                if (i == 0) {
                    p.y = 0;
                    p.cx = p.x;
                    p.cy = p.y;
                } else {
                    p.cx = (p.x + vPoints2[i + 1].x) / 2;
                    p.cy = (p.y + vPoints2[i + 1].y) / 2;
                }
            } else {
                p.cx = p.x;
                p.cy = p.y;
            }
            c.bezierCurveTo(p.x, p.y, p.cx, p.cy, p.cx, p.cy);
        }
        c.lineTo(canvas.width(), canvas.height());
        c.lineTo(canvas.width(), 0);
        c.closePath();
        c.fill();
    }
    $(window).on('load', function() {
        $(window).trigger('resize');
        pageIsLoading = false;
    });
});
;"use strict";
var icl_lang = icl_vars.current_language;
var icl_home = icl_vars.icl_home;
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
