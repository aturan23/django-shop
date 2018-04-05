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
  setTimeout(sliderTimer, 1100);

  init();
  loadCart();
});

var cart = {};
function init() {
  //читаем json файл
  var hash = window.location.hash.substring(1);
  console.log(hash);
  $.post(
    'admin/core.php',
    {
      'action': 'loadSingleGoods',
      'id': hash
    },
    goodsOut
  );
}
function goodsOut(data) {
  // вывод на страницу
  data = JSON.parse(data);
  console.log(data);
  var out ='';
  out += '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">';
  out += '<div class="product-img"><div class="product-img-main slider">';
  out += '<div class="slider_zoom"><img src="img/models/'+ data.img5557101 +'.jpg" alt=""></div>';
  out += '<div class="slider_zoom"><img src="img/models/'+ data.img5557102 +'.jpg" alt=""></div>';
  out += '<div class="slider_zoom"><img src="img/models/'+ data.img5557103 +'.jpg" alt=""></div>';
  out += '<div class="slider_zoom"><img src="img/models/'+ data.img5557104 +'.jpg" alt=""></div></div>';
  out += '<div class="catalog-slider slider-nav">';
  out += '<div class="slick__item"><img src="img/models/'+ data.img70901 +'.jpg" alt=""></div>';
  out += '<div class="slick__item"><img src="img/models/'+ data.img70902 +'.jpg" alt=""></div>';
  out += '<div class="slick__item"><img src="img/models/'+ data.img70903 +'.jpg" alt=""></div>';
  out += '<div class="slick__item"><img src="img/models/'+ data.img70904 +'.jpg" alt=""></div></div>';
  out += '</div></div>';
  out += '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"><div class="product-description">';
  out += '<h3>'+ data.goods_name +'</h3><span class="product-category">'+ data.category +'</span><div class="rating-star-icons">';
  out += '<a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a><a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>';
  out += '<a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a><a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>';
  out += '<a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a><span>(1 customer review)</span></div>';
  out += '<p class="product-desc">'+ data.description +'</p><div class="product-price"><span>$'+ data.sale +'</span><del>$'+ data.cost +'</del></div>';
  out += '<form class="product__count" action=""><input type="button" value="-">';
  out += '<input class="count" type="number" step="1" min="1" size="4" pattern="[0-9]*" value="1">';
  out += '<input type="button" value="+"><input type="button" value="+ ADD TO CART" data-id="'+ data.id +'"></form>';
  out += '<div class="product-add-to-wishlist"><a class="product-wishlist" data-id="'+ data.id +'"><i class="fa fa-heart-o"></i> Add to wishlist</a></div>';
  out += '<div class="product-information"><span>product id:</span><b>'+ data.id +'</b><br><span>category:</span><b>'+ data.category +'</b></div></div></div>';
  $('.single-product-product').html(out);
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
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
  }
  alert('Added to Wish List');
  var id = $(this).attr('data-id');
  wishlist[id] = 1;
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}