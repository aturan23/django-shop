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
  data = JSON.parse(data);
  console.log(data);
  var out ='';
  var wishlist = {};
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    out += '<table><thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead><tbody>';
    for (var key in wishlist) {
      out += '<tr><td><a class="item_list__remove" data-id="' + key + '"><i class="fa fa-remove"></i></a></td>';
      out += '<td><a class="item_list__img" href=""><img src="img/models/' + data[key].img70901 + '.jpg" alt="cart"></a></td>';
      out += '<td><a href="">' + data[key].goods_name + '</a></td><td><a href=""></a>$' + data[key].cost + '</td>';
      out += '<td><a class="product__count" href=""><input class="product_minus" type="button" data-id="'+ key +'" value="-">';
      out += '<input class="count" type="number" step="1" min="1" size="4" pattern="[0-9]*" value="'+ data[key] +'">';
      out += '<input class="product_plus" type="button" data-id="'+ key +'" value="+"></a></td><td><a href="">$' + data[key].cost + '</a></td></tr>';
    }
    out += '</tbody></table>';
  } else {
    $('.item_list p').html('wishlist is empty');
  }
  $('.item_list__items').html(out);
}
$(document).ready(function () {
  init();
});