'use strict';

$(document).ready(function () {

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
  };

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady() {
    legacySupport();
    // updateHeaderActiveClass();
    // initHeaderScroll();

    initPopups();
    initSliders();
    initScrollMonitor();
    initMasks();
    // initLazyLoad();

    // development helper
    _window.on('resize', debounce(setBreakpoint, 200));

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
  // _window.on('load', function(){
  // your functions
  // })


  //////////
  // COMMON
  //////////

  function legacySupport() {
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
  _document.on('click', '[href="#"]', function (e) {
    e.preventDefault();
  }).on('click', 'a[href^="#section"]', function () {
    // section scroll
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

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
  _document.on('keyup', function (e) {
    if (e.keyCode === 27) {
      $(".dropdown__menu").removeClass("is-show");
    }
  });
  /**
   * @description close popup or modal window after click on BODY
   */
  _document.on("click", "body", function (e) {
    if (!$(e.target).closest(".dropdown").length) {
      $(".dropdown__menu").removeClass("is-show");
      $("[dropdown-choose]").removeClass("is-hide");
    }

    if (!$(e.target).closest(".masterplan__map").length) {
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
  _document.on("click", "[dropdown-choose]", function () {
    var dropdownMenu = $(".dropdown__menu");

    dropdownMenu.addClass("is-show");
    $(this).addClass("is-hide");
  });
  /**
   * @description choose your location
   */
  _document.on("click", "[dropdown-btn]", function () {
    var dropdownMenu = $(".dropdown__menu"),
        chooseVal = $(this).find("[dropdown-name]").text(),
        currentVal = $("[dropdown-choose]").find("span");

    $("[dropdown-btn]").removeClass("is-active");
    $(this).addClass("is-active");

    currentVal.text(chooseVal);

    dropdownMenu.removeClass("is-show");
    $("[dropdown-choose]").removeClass("is-hide");
  });
  // ====================


  // TAB
  // ====================
  /**
   * @description toggle active tab
   */
  // _document.on("click", "[tab-js]", function(e) {
  //   var attrName = $(this).attr("data-tab");
  //
  //
  //   $("[tab-js]").removeClass("is-active");
  //   $(this).addClass("is-active");
  //
  //   $(".banner__slider").removeClass("is-active");
  //   $(".banner__slider--" + attrName).addClass("is-active");
  // });
  // ====================


  // SUBMENU
  // ====================
  /**
   * @description submenu btn
   */
  _document.on("click", "[data-js='submenu-js']", function (e) {
    $("[data-js='submenu-js']").removeClass("is-active");
    $(this).addClass("is-active");
  });
  // ====================


  // HAMBURGER
  // ====================
  /**
   * @description open mobile menu
   */
  _document.on("click", "[js-hamburger-open]", function (e) {
    $("html, body").addClass("is-hideScroll");
    $(".tab").addClass("is-show");
  });
  /**
   * @description close mobile menu
   */
  _document.on("click", "[js-hamburger-close]", function (e) {
    $("html, body").removeClass("is-hideScroll");
    $(".tab").removeClass("is-show");
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

    if ($("#map-buy").length) {
      var mapBuy = new google.maps.Map(document.getElementById('map-buy'), {
        zoom: 17,
        center: uluruBuy
      });
    }

    if ($("#map-nearby").length) {
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
  if ($("#map-buy").length || $("#map-nearby").length) {
    initMap();
  }
  // ====================


  // LOCATION BTN - map
  // ====================
  /**
   * @description buy section, location list
   */
  _document.on("click", "[location-js]", function () {
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
    var tableSale = $("[table-sale-js]"),
        tableRent = $("[table-rent-js]");

    $(".checkbox").click(function (e) {
      e.preventDefault();

      var inputCheckbox = $(this).find('input');

      if ($(this).hasClass('disabled')) {
        return false;
      }

      $(this).toggleClass('is-active');

      if ($(this).is(".realty-js.is-active")) {
        if (tableSale) {
          tableSale.removeClass("is-active");
          tableRent.addClass("is-active");
        }
      } else if ($(this).is(".realty-js")) {
        if (tableSale) {
          tableSale.addClass("is-active");
          tableRent.removeClass("is-active");
        }
      }

      if (inputCheckbox.prop('checked') === true) {
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
    $(".radio").click(function (e) {
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
   * @description custom select component - init
   */
  $('select').selectric();
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
    $(".submenu__list, .mouse").on("click", "a", function (e) {
      e.preventDefault();

      var id = $(this).attr('href'),
          navHeight = 0,
          // || $(".submenu").outerHeight(),
      topHeightOffset;

      if ($(window).width() >= bp.tablet) {
        topHeightOffset = $(id).offset().top - navHeight;
      } else {
        topHeightOffset = $(id).offset().top;
      }

      $('body, html').animate({
        scrollTop: topHeightOffset
      }, 1000);
    });
  }
  if ($(".submenu")) {
    smoothScrollSubmenu();
  }
  // ====================


  // TABLE
  // ====================
  /**
   * @description filter table data
   */
  _document.on("click", "[radio-js]", function (e) {
    var elem = $(e.target),
        elemVal = elem.text(),
        tableRooms = $("[table-js] [room-js]");

    elem.toggleClass("is-active");

    tableRooms.closest("[tbody-tr-js]").removeClass("is-hide");

    if (elem.hasClass("is-active")) {
      if ($("[radio-js]").hasClass("is-active")) {
        $("[radio-js]").removeClass("is-active");
      }

      elem.addClass("is-active");

      tableRooms.filter(function (idx, el) {
        if ($(el).text() !== elemVal) {
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
   * @description choose active row
   */
  _document.on("click", "[tbody-js]", function (e) {
    var elem = $(e.target);

    if (elem.closest("[td-js]")) {
      elem.closest("[table-js]").find("[tbody-tr-js]").removeClass("is-active");
      elem.closest("[tbody-tr-js]").addClass("is-active");
    }
  });
  /**
   * @description sort table col
   */
  _document.on("click", "[thead-js]", function (e) {
    var elem = $(e.target);

    if (elem.closest("[th-js]")) {
      var sortTable = function sortTable(sortNum1, sortNum2, numberSortVal, boolVal) {
        var sortVal = tbodyTr.sort(function (a, b) {

          var firstVal = $(a).find('[td-js]').eq(sortIdx).text(),
              secondVal = $(b).find('[td-js]').eq(sortIdx).text();

          if (sortType === "int") {

            return numberSortVal ? firstVal - secondVal : secondVal - firstVal;
          } else {

            return firstVal > secondVal ? sortNum1 : sortNum2;
          }
        });

        tbody.html(sortVal);
        sortBool = boolVal;
      };

      var tbody = elem.closest("[table-js]").find("[tbody-js]"),
          tbodyTr = elem.closest("[table-js]").find("[tbody-tr-js]");

      var sortIdx = parseInt(elem.closest("[th-js]").attr("data-id")),
          sortType = elem.closest("[th-js]").attr("data-type");

      elem.closest("[th-js]").toggleClass("is-active");

      var tbodyTh = elem.closest("[table-js]").find("[tbody-tr-js]");

      tbodyTh.each(function (idx, val) {
        var elemEq = $(val).find("[td-js]").eq(sortIdx),
            elemNotEq = $(val).find("[td-js]").not(":eq(" + sortIdx + ")");

        elemNotEq.removeClass("is-sort");
        elemEq.toggleClass("is-sort");
      });

      if (sortBool) {
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
   * @description master plan popup
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
  var masterPopUp = function masterPopUp(x, y, className, title, text, price, info) {
    return '\n      <div class="master" style="left:' + x + 'px;top:' + y + 'px;">\n        <p class="master__title">' + title + '</p>\n        <p class="master__text">' + text + '</p>\n        <p class="master__price">' + price + '</p>\n        <p class="master__info"><i class="icon-' + className + '"></i> ' + info + '</p>\n      </div>\n    ';
  };
  /**
   * @description master plan call for svg polygon popup window
   */
  _document.on("click", "[masterplan-js] polygon", function (e) {
    var leftPosition = e.originalEvent.offsetX - 100,
        topPosition = e.originalEvent.offsetY - 30;

    var obj = $(e.target).data('obj');

    $("[masterplan-js] polygon").removeClass("is-active");
    $(".masterplan .master").remove();

    $(e.target).addClass("is-active");
    $('.masterplan').append(masterPopUp(leftPosition, topPosition, obj.className, obj.title, obj.text, obj.price, obj.info));
  });
  // ====================


  // PRELOADER
  // ====================
  /**
   * @description
   */
  function cleanPreloaderClass() {
    $("body").addClass("no-preloader").removeClass("preloader");
    $("body, html").removeClass("is-hideScroll");
    $("#barba-wrapper").addClass("fadeIn");
  }

  /**
   * @description
   */
  function preloader() {
    if (typeof Storage !== "undefined") {

      if (_window.width() > "767") {
        if (!localStorage.isFirstLoadComplete) {
          $("body").addClass("preloader");

          setTimeout(function () {
            $("#barba-wrapper").addClass("fadeIn");
            $("#loader").fadeOut(500);
            cleanPreloaderClass();
          }, 11000);

          localStorage.setItem("isFirstLoadComplete", "true");
        } else {
          cleanPreloaderClass();
        }
      } else {
        cleanPreloaderClass();
      }
    } else {
      // No Web Storage support..
    }
  }
  preloader();
  // ====================


  //
  // ====================
  /**
   * @name changeImageSVG
   * @function
   * @description
   */
  var changeImageSVG = function changeImageSVG() {
    document.querySelectorAll('img.svg').forEach(function (element) {
      var imgID = element.getAttribute('id'),
          imgClass = element.getAttribute('class'),
          imgURL = element.getAttribute('src');

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var svg = xhr.responseXML.getElementsByTagName('svg')[0];

          if (imgID != null) {
            svg.setAttribute('id', imgID);
          }

          if (imgClass != null) {
            svg.setAttribute('class', imgClass + ' replaced-svg');
          }

          svg.removeAttribute('xmlns:a');

          if (!svg.hasAttribute('viewBox') && svg.hasAttribute('height') && svg.hasAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'));
          }
          element.parentElement.replaceChild(svg, element);
        }
      };

      xhr.open('GET', imgURL, true);
      xhr.send(null);
    });
  };
  changeImageSVG();
  // ====================


  //
  // ====================
  function initTeleport() {
    $('[js-teleport]').each(function (i, val) {
      var self = $(val);
      var objHtml = $(val).html();
      var target = $('[data-teleport-target=' + $(val).data('teleport-to') + ']');
      var conditionMedia = $(val).data('teleport-condition').substring(1);
      var conditionPosition = $(val).data('teleport-condition').substring(0, 1);

      if (target && objHtml && conditionPosition) {
        var teleport = function teleport() {
          var condition = void 0;

          if (conditionPosition === "<") {
            condition = _window.width() < conditionMedia;
          } else if (conditionPosition === ">") {
            condition = _window.width() > conditionMedia;
          }

          if (condition) {
            target.html(objHtml);
            self.html('');
          } else {
            self.html(objHtml);
            target.html("");
          }
        };

        teleport();
        _window.on('resize', debounce(teleport, 100));
      }
    });
  }
  initTeleport();
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
  // function updateHeaderActiveClass(){
  //   $('.header__menu li').each(function(i,val){
  //     if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
  //       $(val).addClass('is-active');
  //     } else {
  //       $(val).removeClass('is-active')
  //     }
  //   });
  // }

  //////////
  // SLIDERS
  //////////

  function initSliders() {
    // var slickPrevArrow = '<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>';
    // var slickNextArrow = '<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>';

    // General purpose sliders
    // $('[js-slider]').each(function(i, slider){
    //   var self = $(slider);
    //
    //   // set data attributes on slick instance to control
    //   if (self && self !== undefined) {
    //     self.slick({
    //       autoplay: self.data('slick-autoplay') !== undefined ? true : false,
    //       dots: self.data('slick-dots') !== undefined ? true : false,
    //       arrows: self.data('slick-arrows') !== undefined ? true : false,
    //       prevArrow: slickNextArrow,
    //       nextArrow: slickPrevArrow,
    //       infinite: self.data('slick-infinite') !== undefined ? true : true,
    //       speed: 300,
    //       slidesToShow: 1,
    //       accessibility: false,
    //       adaptiveHeight: true,
    //       draggable: self.data('slick-no-controls') !== undefined ? false : true,
    //       swipe: self.data('slick-no-controls') !== undefined ? false : true,
    //       swipeToSlide: self.data('slick-no-controls') !== undefined ? false : true,
    //       touchMove: self.data('slick-no-controls') !== undefined ? false : true
    //     });
    //   }
    //
    // });


    // VARIABLE
    // ===============
    var carouselBgName = '\n      [data-js=\'carousel-apartment-js\'],\n      [data-js=\'carousel-commercial-js\'],\n      [data-js=\'carousel-storerooms-js\'],\n      [data-js=\'carousel-earth-js\'],\n      [data-js=\'carousel-parking-js\']\n    ';
    var carouselInnerBgName = '\n      [data-js=\'carousel-quarterBlur-js\'],\n      [data-js=\'carousel-flatBlue-js\'],\n      [data-js=\'carousel-houseBlue-js\'],\n      [data-js=\'carousel-carBlue-js\'],\n      [data-js=\'carousel-pantryBlue-js\'],\n      [data-js=\'carousel-realtyBlue-js\'],\n      [data-js=\'carousel-galleryBlue-js\']\n    ';
    var sliderLocationName = '\n      [data-js=\'slider-apartment-js\'],\n      [data-js=\'slider-commercial-js\'],\n      [data-js=\'slider-storerooms-js\'],\n      [data-js=\'slider-earth-js\'],\n      [data-js=\'slider-parking-js\']\n    ';
    var sliderInnerLocationName = '\n      [data-js=\'slider-quarter-js\'],\n      [data-js=\'slider-flat-js\'],\n      [data-js=\'slider-house-js\'],\n      [data-js=\'slider-car-js\'],\n      [data-js=\'slider-pantry-js\'],\n      [data-js=\'slider-realty-js\'],\n      [data-js=\'slider-gallery-js\']\n    ';
    var swapInfoName = '\n      [swap-apartment-js],\n      [swap-commercial-js],\n      [swap-storerooms-js],\n      [swap-earth-js],\n      [swap-parking-js]\n    ';
    var sliderGallery0 = '[slider-0-js]';
    var sliderGallery1 = '[slider-1-js]';
    var sliderGallery2 = '[slider-2-js]';
    var swapGallery0 = '[swap-0-js]';
    var swapGallery1 = '[swap-1-js]';
    var swapGallery2 = '[swap-2-js]';

    var asNavForCarousel = sliderLocationName + ' , ' + swapInfoName;
    var asNavForSlider = carouselBgName + ' , ' + swapInfoName;
    var asNavForSwap = carouselBgName + ' , ' + sliderLocationName;

    var asNavForCarouselInner = '' + sliderInnerLocationName;
    var asNavForSliderInner = '' + carouselInnerBgName;

    var sliderPrevBtn = '\n      <button type=\'button\' class=\'slick-btn slick-prev\'>\n        <i class=\'icon icon-prev\'></i>\n      </button>\n    ';
    var sliderNextBtn = '\n      <button type=\'button\' class=\'slick-btn slick-next\'>\n        <i class=\'icon icon-next\'></i>\n      </button>\n    ';
    var sliderGalleryPrevBtn = '\n      <button type=\'button\' class=\'slick-btn slick-prev\'>\n        <i class=\'icon icon-prev-slider-gallery\'></i>\n      </button>\n    ';
    var sliderGalleryNextBtn = '\n      <button type=\'button\' class=\'slick-btn slick-next\'>\n        <i class=\'icon icon-next-slider-gallery\'></i>\n      </button>\n    ';
    var swapGalleryPrevBtn = '\n      <button type=\'button\' class=\'slick-btn slick-prev\'>\n        <i class=\'icon icon-prev-swap-gallery\'></i>\n      </button>\n    ';
    var swapGalleryNextBtn = '\n      <button type=\'button\' class=\'slick-btn slick-next\'>\n        <i class=\'icon icon-next-swap-gallery\'></i>\n      </button>\n    ';
    // ===============
    // SLICK OPTION
    // ===============
    var mainCarouselOption = function mainCarouselOption(asNavForName) {
      return {
        dots: false,
        prevArrow: false,
        nextArrow: false,
        speed: 500,
        infinite: true,
        fade: true,
        cssEase: 'linear',
        asNavFor: asNavForName
      };
    };
    var mainSliderOption = function mainSliderOption(centerModeBool, variableWidthBool, asNavForName) {
      return {
        draggable: false,
        dots: false,
        prevArrow: sliderPrevBtn,
        nextArrow: sliderNextBtn,
        speed: 500,
        infinite: true,
        centerMode: centerModeBool,
        variableWidth: variableWidthBool,
        asNavFor: asNavForName,
        responsive: [{
          breakpoint: 992,
          settings: {
            centerMode: false,
            variableWidth: false
          }
        }]
      };
    };
    var swapInfoOption = {
      dots: true,
      prevArrow: false,
      nextArrow: false,
      speed: 500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear',
      customPaging: function customPaging() {
        return '<span></span>';
      },
      asNavFor: asNavForSwap
    };
    var sliderInfoOption = {
      dots: true,
      prevArrow: false,
      nextArrow: false,
      speed: 500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      customPaging: function customPaging() {
        return '<span></span>';
      }
    };
    var sliderGalleryOption = function sliderGalleryOption(asNavForName) {
      return {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: asNavForName,
        prevArrow: sliderGalleryPrevBtn,
        nextArrow: sliderGalleryNextBtn
      };
    };
    var swapGalleryOption = function swapGalleryOption(asNavForName) {
      return {
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: asNavForName,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        prevArrow: swapGalleryPrevBtn,
        nextArrow: swapGalleryNextBtn
      };
    };

    // ===============
    // SLICK INIT
    // ===============
    $(carouselBgName).not('.slick-initialized').slick(mainCarouselOption(asNavForCarousel));
    $(sliderLocationName).not('.slick-initialized').on('init.slick', function (event, slick) {
      var slickActive = $('.slick-active');

      slickActive.prev().addClass('slick-prev');
      slickActive.next().addClass('slick-next');
    }).slick(mainSliderOption(true, true, asNavForSlider)).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.slick-slide').removeClass('slick-prev slick-next');
      $('.banner__slider .slick-list').removeClass("fadeIn").addClass("animated fadeOut");
    }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var slickActive = $('.slick-active');

      slickActive.prev().addClass('slick-prev');
      slickActive.next().addClass('slick-next');

      $('.banner__slider .slick-list').removeClass("fadeOut").addClass("fadeIn");
    }).on('click', '.slick-slide', function (e) {
      e.stopPropagation();

      var slickSlider = $('.slick-slider'),
          index = $(this).data("slick-index");

      if (slickSlider.slick('slickCurrentSlide') !== index) {
        slickSlider.slick('slickGoTo', index);
      }
    });
    $(swapInfoName).not('.slick-initialized').slick(swapInfoOption);

    $(carouselInnerBgName).not('.slick-initialized').slick(mainCarouselOption(asNavForCarouselInner));
    $(sliderInnerLocationName).not('.slick-initialized').slick(mainSliderOption(false, false, asNavForSliderInner));

    $('[info-slide-js]').not('.slick-initialized').slick(sliderInfoOption);

    $(sliderGallery0).not('.slick-initialized').slick(sliderGalleryOption(swapGallery0));
    $(sliderGallery1).not('.slick-initialized').slick(sliderGalleryOption(swapGallery1));
    $(sliderGallery2).not('.slick-initialized').slick(sliderGalleryOption(swapGallery2));
    $(swapGallery0).not('.slick-initialized').slick(swapGalleryOption(sliderGallery0));
    $(swapGallery1).not('.slick-initialized').slick(swapGalleryOption(sliderGallery1));
    $(swapGallery2).not('.slick-initialized').slick(swapGalleryOption(sliderGallery2));
    // ===============
  }

  //////////
  // MODALS
  //////////

  function initPopups() {
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
        beforeOpen: function beforeOpen() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function close() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    // $('[js-popup-gallery]').magnificPopup({
    // 	delegate: 'a',
    // 	type: 'image',
    // 	tLoading: 'Загрузка #%curr%...',
    // 	mainClass: 'popup-buble',
    // 	gallery: {
    // 		enabled: true,
    // 		navigateByImgClick: true,
    // 		preload: [0,1]
    // 	},
    // 	image: {
    // 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    // 	}
    // });
  }

  function closeMfp() {
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document.one('focus.autoExpand', '.ui-group textarea', function () {
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  }).on('input.autoExpand', '.ui-group textarea', function () {
    var minRows = this.getAttribute('data-min-rows') | 0,
        rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });

  // Masked input
  function initMasks() {
    $("[js-dateMask]").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
    $("input[type='tel']").mask("+7 (000) 000-0000", { placeholder: "+7 (___) ___-____" });
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor() {
    $('.wow').each(function (i, el) {

      var elWatcher = scrollMonitor.create($(el));

      var delay;
      if (_window.width() < 768) {
        delay = 0;
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp";

      var animationName = $(el).data('animation-name') || "wowFade";

      elWatcher.enterViewport(throttle(function () {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });
  }

  //////////
  // LAZY LOAD
  //////////
  // function initLazyLoad(){
  //   _document.find('[js-lazy]').Lazy({
  //     threshold: 500,
  //     enableThrottle: true,
  //     throttle: 100,
  //     scrollDirection: 'vertical',
  //     effect: 'fadeIn',
  //     effectTime: 350,
  //     // visibleOnly: true,
  //     // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
  //     onError: function(element) {
  //         console.log('error loading ' + element.data('src'));
  //     },
  //     beforeLoad: function(element){
  //       // element.attr('style', '')
  //     }
  //   });
  // }

  //////////
  // BARBA PJAX
  //////////

  // Barba.Pjax.Dom.containerClass = "page";
  //
  // var FadeTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     Promise
  //       .all([this.newContainerLoading, this.fadeOut()])
  //       .then(this.fadeIn.bind(this));
  //   },
  //
  //   fadeOut: function() {
  //     var deferred = Barba.Utils.deferred();
  //
  //     anime({
  //       targets: this.oldContainer,
  //       opacity : .5,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim){
  //         deferred.resolve();
  //       }
  //     })
  //
  //     return deferred.promise
  //   },
  //
  //   fadeIn: function() {
  //     var _this = this;
  //     var $el = $(this.newContainer);
  //
  //     $(this.oldContainer).hide();
  //
  //     $el.css({
  //       visibility : 'visible',
  //       opacity : .5
  //     });
  //
  //     anime({
  //       targets: "html, body",
  //       scrollTop: 0,
  //       easing: easingSwing, // swing
  //       duration: 150
  //     });
  //
  //     anime({
  //       targets: this.newContainer,
  //       opacity: 1,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim) {
  //         triggerBody()
  //         _this.done();
  //       }
  //     });
  //   }
  // });
  //
  // // set barba transition
  // Barba.Pjax.getTransition = function() {
  //   return FadeTransition;
  // };
  //
  // Barba.Prefetch.init();
  // Barba.Pjax.start();
  //
  // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
  //
  //   pageReady();
  //   // closeMobileMenu();
  //
  // });

  // some plugins get bindings onNewPage only that way
  function triggerBody() {
    $(window).scroll();
    $(window).resize();
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint() {
    var wHost = window.location.host.toLowerCase();
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0;
    if (displayCondition) {
      console.log(displayCondition);
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>" + wWidth + "</div>";

      $('.page').append(content);
      setTimeout(function () {
        $('.dev-bp-debug').fadeOut();
      }, 1000);
      setTimeout(function () {
        $('.dev-bp-debug').remove();
      }, 1500);
    }
  }
});

$(document).ready(function () {
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).parent('div').addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).parent('div').removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = '+X (XXX) XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 11,
    digits: true

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
  };$(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
        // phone: validatePhone
      } },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      password: {
        required: "Заполните это поле",
        email: "Пароль мимимум 6 символов"
      }
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });

  /**
   *
   */
  $("[question-form-js]").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      phone: validatePhone,
      message: "required"
    },
    messages: {
      name: "Заполните это поле",
      phone: {
        required: "Заполните это поле",
        minlength: "Введите не менее 11 символов",
        phone: "Введите корректный телефон"
      },
      message: {
        required: "Заполните это поле"
      }
    }
  });

  /**
   *
   */
  $("[choose-appartment-js], [modal-form-js]").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      phone: validatePhone
    },
    messages: {
      name: "Заполните это поле",
      phone: {
        required: "Заполните это поле",
        minlength: "Некорректный формат",
        phone: "Введите корректный телефон"
      }
    }
  });
  $("[modal-form-js]").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      phone: validatePhone
    },
    messages: {
      name: "Заполните это поле",
      phone: {
        required: "Заполните это поле",
        minlength: "Введите не менее 11 символов",
        phone: "Введите корректный телефон"
      }
    }
  });
});