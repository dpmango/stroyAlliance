$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  // BREAKPOINT SETTINGS
  var bp = {
    mobileS: 375,
    mobile: 568,
    tablet: 768,
    desktop: 992,
    wide: 1336,
    hd: 1680
  }

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    updateHeaderActiveClass();
    // initHeaderScroll();

    initPopups();
    initSliders();
    initScrollMonitor();
    initMasks();
    initLazyLoad();

    // development helper
    _window.on('resize', debounce(setBreakpoint, 200))

    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here

    // initTeleport();
    // parseSvg();
    // revealFooter();
    // _window.on('resize', throttle(revealFooter, 100));
  }

  // this is a master function which should have all functionality
  pageReady();


  // some plugins work best with onload triggers
  _window.on('load', function(){
    // your functions
  })


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: true,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', 'a[href^="#section"]', function() { // section scroll
      var el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
    })


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  // function initHeaderScroll(){
  //   _window.on('scroll', throttle(function(e) {
  //     var vScroll = _window.scrollTop();
  //     var header = $('.header').not('.header--static');
  //     var headerHeight = header.height();
  //     var firstSection = _document.find('.page__content div:first-child()').height() - headerHeight;
  //     var visibleWhen = Math.round(_document.height() / _window.height()) >  2.5;
  //
  //     if (visibleWhen){
  //       if ( vScroll > headerHeight ){
  //         header.addClass('is-fixed');
  //       } else {
  //         header.removeClass('is-fixed');
  //       }
  //       if ( vScroll > firstSection ){
  //         header.addClass('is-fixed-visible');
  //       } else {
  //         header.removeClass('is-fixed-visible');
  //       }
  //     }
  //   }, 10));
  // }


  // CLOSE ALL DROPDOWN OR OTHER POPUP WINDOW
  // ====================
  /**
   * @description close popup or modal window after press button ESC
   */
  _document.on('keyup', function(e){
    if (e.keyCode === 27) {
      $(".dropdown__menu").removeClass("is-show");
    }
  });
  /**
   * @description close popup or modal window after click on BODY
   */
  _document.on("click", "body", function(e) {
    if(!$(e.target).closest(".dropdown").length) {
      $(".dropdown__menu").removeClass("is-show");
    }

    if(!$(e.target).closest(".masterplan__map").length) {
      $("[masterplan-js] polygon").removeClass("is-active");
      $(".masterplan .master").remove();
    }
  });
  // ====================


  // CHOOSE LOCATION
  // ====================
  /**
   * @description open dropdown menu for choose location
   */
  _document.on("click", "[dropdown-choose]", function() {
    var dropdownMenu = $(".dropdown__menu");

    dropdownMenu.addClass("is-show");
  });
  /**
   * @description choose your location
   */
  _document.on("click", "[dropdown-btn]", function() {
    var dropdownMenu = $(".dropdown__menu"),
      chooseVal = $(this).find("[dropdown-name]").text(),
      currentVal = $("[dropdown-choose]").find("span");

    $("[dropdown-btn]").removeClass("is-active");
    $(this).addClass("is-active");

    currentVal.text(chooseVal);

    dropdownMenu.removeClass("is-show");
  });
  // ====================


  // TAB
  // ====================
  /**
   * @description toggle active tab
   */
  _document.on("click", "[tab-js]", function(e) {
    var attrName = $(this).attr("data-tab");


    $("[tab-js]").removeClass("is-active");
    $(this).addClass("is-active");

    $(".banner__slider").removeClass("is-active");
    $(".banner__slider--" + attrName).addClass("is-active");
  });
  // ====================


  // SUBMENU
  // ====================
  /**
   * @description submenu btn
   */
  _document.on("click", "[data-js='submenu-js']", function(e) {
    $("[data-js='submenu-js']").removeClass("is-active");
    $(this).addClass("is-active");
  });
  // ====================


  // HAMBURGER
  // ====================
  /**
   * @description open mobile menu
   */
  _document.on("click", "[js-hamburger-open]", function(e) {
    $("html, body").addClass("is-hideScroll");
    $(".tab").addClass("is-show")
  });
  /**
   * @description close mobile menu
   */
  _document.on("click", "[js-hamburger-close]", function(e) {
    $("html, body").removeClass("is-hideScroll");
    $(".tab").removeClass("is-show")
  });
  // ====================


  // INIT MAP
  // ====================
  /**
   * @description init google maps
   */
  function initMap() {
    var uluruBuy = {
      lat: 54.1918065,
      lng: 37.6177402
    };
    var uluruNearby = {
      lat: 54.1918065,
      lng: 37.6177402
    };
    var iconMarker = '../img/map-marker.png';

    if($("#map-buy").length) {
      var mapBuy = new google.maps.Map(document.getElementById('map-buy'), {
        zoom: 17,
        center: uluruBuy
      });
    }

    if($("#map-nearby").length) {
      var mapNearby = new google.maps.Map(document.getElementById('map-nearby'), {
        zoom: 17,
        center: uluruNearby
      });
    }

    var marker = new google.maps.Marker({
      position: uluruBuy,
      map: mapBuy,
      icon: iconMarker
    });
  }
  if($("#map-buy").length || $("#map-nearby").length) {
    initMap();
  }
  // ====================


  // LOCATION BTN - map
  // ====================
  /**
   * @description buy section, location list
   */
  _document.on("click", "[location-js]", function() {
    $("[location-js]").removeClass('is-active');
    $(this).addClass('is-active');
  });
  // ====================


  // CHECKBOX
  // ====================
  /**
   * @description custom checkbox button
   */
  function checkboxInit() {
    $(".checkbox").click(function(e) {
      e.preventDefault();

      var inputCheckbox = $(this).find('input');

      if ($(this).hasClass('disabled')){
        return false;
      }

      $(this).toggleClass('is-active');

      if(inputCheckbox.prop('checked') === true){
        inputCheckbox.prop('checked', false).change();
      } else {
        inputCheckbox.prop('checked', true).change();
      }

      return false;
    });
  }
  checkboxInit();
  // ====================


  // RADIO
  // ====================
  /**
   * @description custom radio button
   */
  function radioInit() {
    $(".radio").click(function(e) {
      e.preventDefault();

      $(this).parent().find(".radio").removeClass("is-active");
      $(this).addClass('is-active');

      $(this).parent().find('input[type="radio"]:checked').prop('checked', false);
      $(this).find('input[type="radio"]').prop('checked', true).change();
    });
  }
  radioInit();
  // ====================


  // SELECT
  // ====================
  /**
   *
   * @param selector
   * @description custom select component - init
   */
  function selectInit(selector) {
    if (selector === undefined) {
      var selector = 'select';
    }

    selectReset(selector);

    $(selector).on('change', function () {
      selectReset(this);
    });
  }

  /**
   *
   * @param selector
   * @description custom select component - reset
   */
  function selectReset(selector){
    if (selector === undefined) {
      var selector = 'select';
    }

    $(selector).each(function(){
      var valOption = $(this).children('option:selected');

      $(this).prev('span').html(valOption.text());
    });
  }
  selectInit();
  // ====================


  // OBJECT-FIT POLYFILL
  // ====================
  var $someImages = $('[objectFit-js]');
  objectFitImages($someImages);
  // ====================


  // SMOOTH SCROLL
  // ====================
  /**
   * @description
   */
  function smoothScrollSubmenu() {
    $(".submenu__list").on("click", "a", function (e) {
      e.preventDefault();

      var id = $(this).attr('href'),
        navHeight = 0 || $(".submenu").outerHeight(),
        topHeightOffset;

      if ($(window).width() >= bp.tablet) {
        topHeightOffset = $(id).offset().top - navHeight
      } else {
        topHeightOffset = $(id).offset().top;
      }

      $('body, html').animate({
        scrollTop: topHeightOffset
      }, 1000);
    });
  }
  if($(".submenu")) {
    smoothScrollSubmenu();
  }
  // ====================


  // TABLE
  // ====================
  /**
   * @description filter table data
   */
  _document.on("click", "[radio-js]", function(e) {
    var elem = $(e.target),
      elemVal = elem.text(),
      tableRooms = $("[table-js] [room-js]");

    elem.toggleClass("is-active");

    tableRooms.closest("[tbody-tr-js]").removeClass("is-hide");

    if(elem.hasClass("is-active")) {
      if($("[radio-js]").hasClass("is-active")) {
        $("[radio-js]").removeClass("is-active");
      }

      elem.addClass("is-active");

      tableRooms.filter(function(idx, el) {
        if($(el).text() !== elemVal) {
          return $(el).closest("[tbody-tr-js]").addClass("is-hide");
        }
      });
    }
  });
  /**
   *
   * @type {boolean}
   */
  var sortBool = true;

  /**
   * @description
   */
  _document.on("click", "[tbody-js]", function(e) {
    var elem = $(e.target);

    if(elem.closest("[td-js]")) {
      $("[tbody-tr-js]").removeClass("is-active");
      elem.closest("[tbody-tr-js]").addClass("is-active");
    }
  });

  /**
   * @description
   */
  _document.on("click", "[thead-js]", function(e) {
    var elem = $(e.target);

    if(elem.closest("[th-js]")) {
      var tbody = $("[tbody-js]"),
        tbodyTr = $("[tbody-tr-js]");

      var sortIdx = parseInt(elem.attr("data-id"));

      elem.toggleClass("is-active");

      function sortTable(sortNum1, sortNum2, numberSortVal, boolVal) {
        var sortVal = tbodyTr.sort(function(a, b) {

          var firstVal = $(a).find('[td-js]').eq(sortIdx).text(),
            secondVal = $(b).find('[td-js]').eq(sortIdx).text();

          if(sortIdx === 0 || sortIdx === 1) {

            return (numberSortVal) ? firstVal - secondVal : secondVal - firstVal;
          } else {

            return (firstVal > secondVal) ? sortNum1 : sortNum2;
          }
        });

        tbody.html(sortVal);
        sortBool = boolVal;
      }

      if(sortBool) {
        sortTable(1, -1, true, false);
      } else {
        sortTable(-1, 1, false, true);
      }
    }
  });
  // ====================


  // MASTERPLAN
  // ====================
  /**
   * @description master plan
   */
  /**
   * @description
   *
   * @param x {Number}
   * @param y {Number}
   * @param className {string}
   * @param title {string}
   * @param text {string}
   * @param price {string}
   * @param info {string}
   * @returns {string}
   */
  var masterPopUp = (x, y, className, title, text, price, info) => {
    return `
      <div class="master" style="left:${x}px;top:${y}px;">
        <p class="master__title">${title}</p>
        <p class="master__text">${text}</p>
        <p class="master__price">${price}</p>
        <p class="master__info"><i class="icon-${className}"></i> ${info}</p>
      </div>
    `;
  };
  /**
   * @description
   */
  _document.on("click", "[masterplan-js] polygon", (e) => {
    const leftPosition = e.originalEvent.offsetX - 100,
      topPosition = e.originalEvent.offsetY - 30;

    const obj = $(e.target).data('obj');

    $("[masterplan-js] polygon").removeClass("is-active");
    $(".masterplan .master").remove();

    $(e.target).addClass("is-active");
    $('.masterplan').append(masterPopUp(leftPosition, topPosition, obj.className, obj.title, obj.text, obj.price, obj.info));
  });
  // ====================



  // HAMBURGER TOGGLER
  // _document.on('click', '[js-hamburger]', function(){
  //   $(this).toggleClass('is-active');
  //   $('.mobile-navi').toggleClass('is-active');
  // });
  //
  // function closeMobileMenu(){
  //   $('[js-hamburger]').removeClass('is-active');
  //   $('.mobile-navi').removeClass('is-active');
  // }

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }

  //////////
  // SLIDERS
  //////////

  function initSliders(){
    var slickPrevArrow = '<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>';
    var slickNextArrow = '<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>';

    // General purpose sliders
    $('[js-slider]').each(function(i, slider){
      var self = $(slider);

      // set data attributes on slick instance to control
      if (self && self !== undefined) {
        self.slick({
          autoplay: self.data('slick-autoplay') !== undefined ? true : false,
          dots: self.data('slick-dots') !== undefined ? true : false,
          arrows: self.data('slick-arrows') !== undefined ? true : false,
          prevArrow: slickNextArrow,
          nextArrow: slickPrevArrow,
          infinite: self.data('slick-infinite') !== undefined ? true : true,
          speed: 300,
          slidesToShow: 1,
          accessibility: false,
          adaptiveHeight: true,
          draggable: self.data('slick-no-controls') !== undefined ? false : true,
          swipe: self.data('slick-no-controls') !== undefined ? false : true,
          swipeToSlide: self.data('slick-no-controls') !== undefined ? false : true,
          touchMove: self.data('slick-no-controls') !== undefined ? false : true
        });
      }

    });


    // VARIABLE
    // ===============
    const carouselBgName = `
      [data-js='carousel-apartment-js'],
      [data-js='carousel-commercial-js'],
      [data-js='carousel-storerooms-js'],
      [data-js='carousel-earth-js'],
      [data-js='carousel-parking-js']
    `;
    const carouselInnerBgName = `
      [data-js='carousel-quarterBlur-js'],
      [data-js='carousel-flatBlue-js'],
      [data-js='carousel-houseBlue-js']
    `;
    const sliderLocationName = `
      [data-js='slider-apartment-js'],
      [data-js='slider-commercial-js'],
      [data-js='slider-storerooms-js'],
      [data-js='slider-earth-js'],
      [data-js='slider-parking-js']
    `;
    const sliderInnerLocationName = `
      [data-js='slider-quarter-js'],
      [data-js='slider-flat-js'],
      [data-js='slider-house-js']
    `;
    const swapInfoName = `
      [swap-apartment-js],
      [swap-commercial-js],
      [swap-storerooms-js],
      [swap-earth-js],
      [swap-parking-js]
    `;

    const asNavForCarousel = `${sliderLocationName} , ${swapInfoName}`;
    const asNavForSlider = `${carouselBgName} , ${swapInfoName}`;
    const asNavForSwap = `${carouselBgName} , ${sliderLocationName}`;
    const asNavForCarouselInner = `${sliderInnerLocationName}`;
    const asNavForSliderInner = `${carouselInnerBgName}`;

    const sliderPrevBtn = `
      <button type='button' class='slick-btn slick-prev'>
        <i class='icon icon-prev'></i>
      </button>
    `;
    const sliderNextBtn = `
      <button type='button' class='slick-btn slick-next'>
        <i class='icon icon-next'></i>
      </button>
    `;
    // ===============
    // SLICK OPTION
    // ===============
    const mainCarouselOption = (asNavForName) => {
      return {
        dots: false,
        prevArrow: false,
        nextArrow: false,
        speed: 500,
        infinite: true,
        fade: true,
        cssEase: 'linear',
        asNavFor: asNavForName
      }
    };
    const mainSliderOption = (centerModeBool, variableWidthBool, asNavForName) => {
      return {
        dots: false,
        prevArrow: sliderPrevBtn,
        nextArrow: sliderNextBtn,
        speed: 500,
        infinite: true,
        centerMode: centerModeBool,
        variableWidth: variableWidthBool,
        asNavFor: asNavForName,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              centerMode: false,
              variableWidth: false,
            }
          }
        ]
      }
    };
    const swapInfoOption = {
      dots: true,
      prevArrow: false,
      nextArrow: false,
      speed: 500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear',
      customPaging: function() {
        return '<span></span>';
      },
      asNavFor: asNavForSwap
    };
    const sliderInfoOption = {
      dots: true,
      prevArrow: false,
      nextArrow: false,
      speed: 500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      customPaging: function() {
        return '<span></span>';
      },
    };
    // ===============
    // SLICK INIT
    // ===============
    $(carouselBgName).not('.slick-initialized').slick(mainCarouselOption(asNavForCarousel));
    $(sliderLocationName).not('.slick-initialized').slick(mainSliderOption(true, true, asNavForSlider));
    $(swapInfoName).not('.slick-initialized').slick(swapInfoOption);

    $(carouselInnerBgName).not('.slick-initialized').slick(mainCarouselOption(asNavForCarouselInner));
    $(sliderInnerLocationName).not('.slick-initialized').slick(mainSliderOption(false, false, asNavForSliderInner));

    $('[info-slide-js]').not('.slick-initialized').slick(sliderInfoOption);
    // ===============
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'show',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('[js-popup-gallery]').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
  	});
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      elWatcher.exitViewport(throttle(function() {
        $(el).removeClass(animationClass);
        $(el).css({
          'animation-name': 'none',
          'animation-delay': 0,
          'visibility': 'hidden'
        });
      }, 100));
    });

  }


  //////////
  // LAZY LOAD
  //////////
  function initLazyLoad(){
    _document.find('[js-lazy]').Lazy({
      threshold: 500,
      enableThrottle: true,
      throttle: 100,
      scrollDirection: 'vertical',
      effect: 'fadeIn',
      effectTime: 350,
      // visibleOnly: true,
      // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
      onError: function(element) {
          console.log('error loading ' + element.data('src'));
      },
      beforeLoad: function(element){
        // element.attr('style', '')
      }
    });
  }

  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var deferred = Barba.Utils.deferred();

      anime({
        targets: this.oldContainer,
        opacity : .5,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim){
          deferred.resolve();
        }
      })

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : .5
      });

      anime({
        targets: "html, body",
        scrollTop: 0,
        easing: easingSwing, // swing
        duration: 150
      });

      anime({
        targets: this.newContainer,
        opacity: 1,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim) {
          triggerBody()
          _this.done();
        }
      });
    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

    pageReady();
    // closeMobileMenu();

  });

  // some plugins get bindings onNewPage only that way
  function triggerBody(){
    $(window).scroll();
    $(window).resize();
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wHost = window.location.host.toLowerCase()
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
    if (displayCondition){
      console.log(displayCondition)
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";

      $('.page').append(content);
      setTimeout(function(){
        $('.dev-bp-debug').fadeOut();
      },1000);
      setTimeout(function(){
        $('.dev-bp-debug').remove();
      },1500)
    }
  }

});
