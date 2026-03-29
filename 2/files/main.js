// lazyload for images
function img_loader() {
    setTimeout(function(){
        $('body').find('img[data-src]').each(function(){
            var src = $(this).attr('data-src');
            var srcset = $(this).attr('data-srcset');
            var classes = $(this).attr('class');
            var alt = $(this).attr('alt');
            var title = $(this).attr('title');
            if (src) {
              var img = new Image();
              $(img).hide();
              $(img).on('load', function(){
                $(this).fadeIn(400);
                setTimeout(function(){
                    $(img).addClass('transition');
                },400);
              });
              $(img).attr('srcset', srcset );  
              $(img).attr('src', src );
              $(img).attr('alt', alt);
              $(img).attr('title', title);
              $(img).addClass(classes);
              $(this).replaceWith(img);
            }
        });
    }, 150);
}

function setMonthCalendar(year, month, day) {
    let monthDays = new Date(year, month, 0).getDate(),
        monthPrefix = new Date(year, month - 1, 0).getDay(),
        monthDaysText = '';

    if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
            monthDaysText += '<div class="sm-calendar__clndr-cell"></div>';
        }
    }

    for (let i = 1; i <= monthDays; i++) {
        monthDaysText += '<div class="sm-calendar__clndr-cell' + ((i == day) ? ' is-active' : '') + '">' + i + '</div>';
    }

    $('.sm-calendar__clndr-row').html(monthDaysText);
}

function getTimeRemaining(endtime) {

    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function initializeClock(id, endtime) {
    var daysSpan = document.getElementById("sm-days");
    var hoursSpan = document.getElementById("sm-hours");
    var minutesSpan = document.getElementById("sm-minutes");
    var secondsSpan = document.getElementById("sm-seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            t.days = '00';
            t.hours = 0;
            t.minutes = 0;
            t.seconds = 0;
        }

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function startAll(){

    document.getElementById("sm-bt").addEventListener("click", () => {
      //  Fancybox.show([{ src: "#sm-mod", type: "inline" }]);
    });

    Fancybox.bind('[data-fancybox="gallery"]', {
        //
    });
    Fancybox.bind('[data-fancybox="gallery2"]', {
        //
    });
    Fancybox.bind('[data-fancybox="gallery3"]', {
        //
    });


    $(".js-sm-code-sliderOn").on("init reInit afterChange", function(event, slick) {
        $(".sm-slider-counterOn").html(
            slick.slickCurrentSlide() + 1 + "/" + slick.slideCount
        );
    });

    $(".js-sm-code-sliderOn").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: $(".sm-slider-arrowsOn"),
        prevArrow: '<div class="sm-slider__arrow sm-slider__arrow_left"></div>',
        nextArrow: '<div class="sm-slider__arrow sm-slider__arrow_right"></div>',
        dots: false
    });


    $(".js-sm-code-sliderTw").on("init reInit afterChange", function(event, slick) {
        $(".sm-slider-counterTw").html(
            slick.slickCurrentSlide() + 1 + "/" + slick.slideCount
        );
    });

    $(".js-sm-code-sliderTw").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: $(".sm-slider-arrowsTw"),
        prevArrow: '<div class="sm-slider__arrow sm-slider__arrow_left"></div>',
        nextArrow: '<div class="sm-slider__arrow sm-slider__arrow_right"></div>',
        dots: false
    });

    $(".js-sm-wishes-slider").on("init reInit afterChange", function(event, slick) {
        $(".sm-slider-counterTh").html(
            slick.slickCurrentSlide() + 1 + "/" + slick.slideCount
        );
    });

    $(".js-sm-wishes-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: $(".sm-slider-arrowsTh"),
        prevArrow: '<div class="sm-slider__arrow sm-slider__arrow_left"></div>',
        nextArrow: '<div class="sm-slider__arrow sm-slider__arrow_right"></div>',
        dots: false
    });

    img_loader();


    var year = new Date().getFullYear();
    var month = 10;
    var day = 23;
    var nd = parent.d_mdate;
    if(nd != '')
    {
        nd = parent.d_mdate.split('.');
        if(nd.length >= 3 && nd[2] >= new Date().getFullYear()) {
            year = nd[2];
            month = nd[1];
            day = nd[0];
        }
    }

    initializeClock('sm-timer', year + '/' + month + '/' + day);
    setMonthCalendar(year,month,day)

    if (typeof initWishSlider != 'undefined') {
        console.log('trying to init wish slider')
        setTimeout(function(){initWishSlider();},1000);
    }
}
function thankYou()
{
    $('.sm-thanks').toggleClass('active',true).toggleClass('sm-open',true);
    setTimeout(function(){window.location.reload();},3000)
}