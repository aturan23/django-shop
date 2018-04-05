$(function () {
  function sliderTimer() {
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: '.slider-nav',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
    $('.slider-nav').slick({
      slidesToShow: 4,
      variableWidth: true,
      asNavFor: '.slider',
      centerPadding: '0px',
      // centerMode: true,
      focusOnSelect: true
    });
  }
  setTimeout(sliderTimer, 1000);

  $('.dropdown').click(function (e) {
    $(this).next().toggleClass('show');
  });
  $('.menu-toggle').click(function () {
    $('.site-nav').toggleClass('site-nav-open');
    $(this).toggleClass('menu-toggle-open');
  });
  $('#search-trigger').click(function () {
    $('#search-input').toggleClass('search-input-open');
  });
  $(document).click(function (e) {
    if (!$(e.target).closest('.menu-toggle').length) {
      $('.site-nav').removeClass('site-nav-open');
      $(this).removeClass('menu-toggle-open')
    }
    if (!$(e.target).closest('.search-form').length) {
      $('#search-input').removeClass('search-input-open');
    }
    if (!$(e.target).closest('.dropdown').length) {
      $('.site-nav ul ul').removeClass('show');
    }
  });

  var mW = $(window).width();
  if (mW > 900) {
    $('.banner').on('mousemove', function (e) {
      var w = $(window).width();
      var h = $(window).height();
      var offsetX = 0.5 - e.pageX / w;
      var offsetY = 0.5 - e.pageY / h;

      $('.parallax').each(function (i, el) {
        var offset = parseInt($(el).data('offset'));
        var translate = 'translate3d(' + Math.round(offsetX * offset)
          + 'px,' + Math.round(offsetY * offset) + 'px, 0';
        $(el).css({
          'transform': translate
        });
      });
    });
  }
  init();
  loadCart();
});

var cart = {};
function init() {
  //читаем json файл
  $.post(
    'admin/core.php',
    {
      'action': 'loadGoods'
    },
    goodsOut
  );
}
function goodsOut(data) {
  // вывод на страницу
  data = JSON.parse(data);
  console.log(data);
  var out ='';
  for (var key in data) {
    out += '<div class="goods-item col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">';
    out += '<div class="item">';
    out += '<a class="item__img" href="product#'+ key +'">';
    out += '<img class="out" src="img/models/'+ data[key].img2903702 +'.jpg" alt="out">';
    out += '<img class="in" src="img/models/'+ data[key].img2903701 +'.jpg" alt="in"></a>';
    out += '<span class="item__wishelist" data-id="'+ key +'"><a><i class="fa fa-heart"></i></a></span>';
    out += '<span class="item__sale">sale</span>';
    out += '<div class="item__desc">';
    out += '<div class="row margin-0">';
    out += '<div class="desc__left">';
    out += '<h3><a href="product#'+ key +'">' + data[key].goods_name  + '</a></h3>';
    out += '<span class="category">' + data[key].category + '</span>';
    out += '<span>'+ data[key].sale +'</span></div>';
    out += '<div class="desc__right">';
    out += '<a class="add-to-cart" data-id="'+ key +'"><i class="fa fa-plus"></i></a>';
    out += '<span>&nbsp;</span><del>'+ data[key].cost +'</del></div></div></div></div></div>';
  }
  // for (var ele in cart) {
  //   console.log(ele, ':', cart[ele]);
  // }
  $('#goods').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.item__wishelist').on('click', addWishList);
}
function addToCart() {
  // добавляем товар в корзину
  var id = $(this).attr('data-id');
  if (cart[id] == undefined) {
    cart[id] = 1;
  } else {
    cart[id]++;
  }
  saveCart();
}
function addWishList() {
  var wishlist = {};
  // var total = 0;
  // total++;
  // $('.fa-heart-o + span').text(total);
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
  }
  alert('Added to Wish List');
  var id = $(this).attr('data-id');
  wishlist[id] = 1;
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  $('.item__wishelist').click(function () {
    $('.fa-heart').toggleClass('red');
  });
  for (var some in wishlist) {
    console.log(some, ':', wishlist[some]);
  }
}
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCart() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}