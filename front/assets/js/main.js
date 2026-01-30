jQuery(document).ready(function ($) {



    // ==========================================

    // 1. SLIDERS (Swiper)

    // ==========================================

    function initSliders() {

        if (typeof Swiper === 'undefined') {

            console.error('Swiper library is not loaded');

            return;

        }



        $('.slider').each(function () {

            var $slider = $(this);

            var setting = $slider.attr("data-settings");

            var id = $slider.attr("id");



            if (!setting || !id) {

                return;

            }



            try {

                var items = JSON.parse(setting);

            } catch (e) {

                return;

            }



            var autoplaySetting = items.autoplay === "false" ? false : {

                delay: 3000,

                disableOnInteraction: false,

                pauseOnMouseEnter: true,

            };



            try {

                const swiper = new Swiper('#' + id, {

                    slidesPerView: items.columns || 1,

                    navigation: {

                        nextEl: '.button-next-' + id,

                        prevEl: '.button-prev-' + id,

                    },

                    autoplay: autoplaySetting,

                    loop: items.infinite || false,

                    centeredSlides: items.centerMode || false,

                    spaceBetween: parseInt(items.space) || 0,

                    pagination: {

                        el: '#' + id + ' .swiper-pagination',

                        clickable: true,

                        dynamicBullets: true,

                    },

                    breakpoints: {

                        10: { slidesPerView: items.columns_mobile || 1 },

                        480: { slidesPerView: items.columns_mobile_tablet || 1 },

                        768: { slidesPerView: items.columns_tablet || 1 },

                        1024: { slidesPerView: items.columns || 1 },

                    }

                });

            } catch (e) {

                console.error('Error initializing Swiper:', e, id);

            }

        });

    }



    if (typeof Swiper !== 'undefined') {

        initSliders();

    } else {

        $(window).on('load', function () {

            setTimeout(initSliders, 100);

        });

    }

    // 1. باز کردن منو

    $('.hamburger-menu').on('click', function () {

        $('.nav-wrapper').addClass('is-open');

        $('body').css('overflow', 'hidden'); // قفل اسکرول

    });



    // 2. بستن منو (با دکمه ضربدر یا کلیک روی فضای خالی)

    $('.close-menu-btn').on('click', function () {

        $('.nav-wrapper').removeClass('is-open');

        $('body').css('overflow', 'auto'); // باز کردن اسکرول

    });



    // 3. دراپ‌دان موبایل (آکاردئونی)

    $('.item.has-sub .item-link').on('click', function (e) {

        if ($(window).width() <= 992) {

            e.preventDefault();

            

            // باز/بسته کردن باکس زیرمنو

            $(this).siblings('.dropdown-menu').slideToggle(300);

            

            // چرخاندن فلش

            $(this).find('.arrow-icon').toggleClass('rotate');

        }

    });
    $('.accordion-header').on('click', function () {
        var item = $(this).closest('.accordion-item');

        // اگر آیتم کلیک شده فعال نیست
        if (!item.hasClass('active')) {
            // بستن همه آیتم‌های دیگر
            $('.accordion-item').removeClass('active');
            
            // باز کردن آیتم جاری
            item.addClass('active');
        } else {
            // اگر کاربر روی آیتم باز کلیک کرد، آن را ببند
            item.removeClass('active');
        }
    });
    $('.custom-video-wrapper').on('click', function (e) {
        var $wrapper = $(this);
        var video = $wrapper.find('video').get(0);

        // ** فیکس مشکل لوپ 1 ثانیه‌ای **
        // اگر ویدیو کنترل دارد (یعنی در حال پخش است) و کاربر دقیقا روی تگ ویدیو کلیک کرده،
        // یعنی دارد با کنترل‌های مرورگر کار می‌کند. پس ما هیچ کاری نمی‌کنیم.
        if (video.hasAttribute('controls') && $(e.target).is('video')) {
            return; 
        }

        // فقط دفعه اول که دکمه وسط هست این بخش اجرا می‌شود
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // وقتی ویدیو شروع به پخش کرد (چه با کلیک ما، چه کلیک راست)
    $('video').on('play', function () {
        var $wrapper = $(this).closest('.custom-video-wrapper');
        
        $wrapper.addClass('is-playing'); // دکمه وسط غیب میشه و طبق CSS متن پایین هم غیب میشه
        $(this).attr('controls', 'controls'); // کنترل‌های مرورگر اضافه میشه
    });

    // وقتی ویدیو تمام شد
    $('video').on('ended', function () {
        var $wrapper = $(this).closest('.custom-video-wrapper');
        
        $wrapper.removeClass('is-playing'); // دکمه وسط و متن برمی‌گردند
        $(this).removeAttr('controls'); // کنترل‌ها حذف میشن تا پوستر دیده بشه
        this.load(); // ویدیو ریست میشه به حالت اول
    });
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('.main-header').addClass('fixed');
        } else {
            $('.main-header').removeClass('fixed');
        }
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate active');
                
                // هندل کردن اختصاصی بخش هیرو برای عکس
                if ($(entry.target).hasClass('bg-icon')) {
                    setTimeout(() => {
                        $('.hero-header-section').addClass('show-image');
                    }, 200);
                }
            }
        });
    }, { threshold: 0.1 });

    // انتخاب تمام بخش‌هایی که باید موقع اسکرول انیمیشن بگیرند
    $('.bg-icon, .feather, .banner-item .icon, .category-items-section .item, .main-cart-theme').each(function() {
        if (!$(this).hasClass('bg-icon')) $(this).addClass('reveal');
        observer.observe(this);
    });
    // ==========================================
// Text Content FAQ Accordion Logic
// ==========================================
$(document).ready(function() {
    
    // انتخاب هدرهای آکاردئون
    $('.text-content-faq-section .faq-header').on('click', function() {
        var item = $(this).closest('.faq-item');
        var content = item.find('.faq-content');
        
        // اگر آیتم کلیک شده از قبل باز است، آن را ببند
        if (item.hasClass('active')) {
            content.css('max-height', '0');
            item.removeClass('active');
        } else {
            // بستن سایر آیتم‌ها (اختیاری - اگر می‌خواهید فقط یکی باز باشد)
            $('.text-content-faq-section .faq-item.active').removeClass('active').find('.faq-content').css('max-height', '0');
            
            // باز کردن آیتم جدید
            item.addClass('active');
            // تنظیم ارتفاع بر اساس محتوا
            var scrollHeight = content.prop('scrollHeight');
            content.css('max-height', scrollHeight + 'px');
        }
    });

    // تنظیم ارتفاع اولیه برای آیتمی که در HTML کلاس active دارد
    var activeItem = $('.text-content-faq-section .faq-item.active .faq-content');
    if (activeItem.length) {
        var scrollHeight = activeItem.prop('scrollHeight');
        activeItem.css('max-height', scrollHeight + 'px');
    }
});
$(document).ready(function() {
    // Smooth Scrolling for nav links
    $('.course-nav-wrapper a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            // چون نوار دیگر استیکی نیست، فقط بر اساس موقعیت سکشن اسکرول می‌کنیم
            // اگر هدر اصلی (main-header) روی محتوا را می‌پوشاند، ارتفاع آن را کم می‌کنیم
            var headerHeight = $('.main-header.fixed').length ? 80 : 0; 

            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800);
        }
    });

    // Active link switching on scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop() + 100; // مقدار افست برای تشخیص سکشن فعال

        $('section[id]').each(function(i) {
            if ($(this).offset().top <= scrollDistance) {
                $('.course-nav-wrapper a.nav-link.active').removeClass('active');
                $('.course-nav-wrapper a.nav-link').eq(i).addClass('active');
            }
        });
    });
});
});