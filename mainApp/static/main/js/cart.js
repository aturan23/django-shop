var cart ={};
function loadCart() {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    showCart();
  } else {
    $('.item_list').html('bascet is empty');
  }
}
function showCart() {
  if (!isEmpty(cart)) {
    $('.item_list__header p').html('bascet is empty');
  } else {
    $.getJSON('goods.json', function (data) {
      var goods = data;
      var out = '';
      out += '<table><thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead><tbody>';
      for (var id in cart) {
        out += '<tr><td><a class="item_list__remove" data-id="' + id + '"><i class="fa fa-remove"></i></a></td>';
        out += '<td><a class="item_list__img" href="product#'+ id +'"><img src="img/models/' + goods[id].img70901 + '.jpg" alt="cart"></a></td>';
        out += '<td><a href="product#'+ id +'">' + goods[id].goods_name + '</a></td><td><a href=""></a>$' + goods[id].cost + '</td>';
        out += '<td><a class="product__count"><input class="product_minus" type="button" data-id="'+ id +'" value="-">';
        out += '<input class="count" type="number" step="1" min="1" size="4" pattern="[0-9]*" value="'+ cart[id] +'">';
        out += '<input class="product_plus" type="button" data-id="'+ id +'" value="+"></a></td><td><a>$' + cart[id]*goods[id].cost + '</a></td></tr>';
      }
      out += '</tbody></table>';

      $('.item_list__items').html(out);
      $('.item_list__remove').on('click', delGoods);
      $('.product_plus').on('click', plusGoods);
      $('.product_minus').on('click', minusGoods);
    });
  }
}

function delGoods() {
  var id = $(this).attr('data-id');
  delete cart[id];
  saveCart();
  showCart();
}

function plusGoods() {
  var id = $(this).attr('data-id');
  cart[id]++;
  saveCart();
  showCart();
}

function minusGoods() {
  var id = $(this).attr('data-id');
  if (cart[id] == 1) {
    delete cart[id];
  } else {
    cart[id]--;
  }
  saveCart();
  showCart();
}
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
  for (var key in object)
  if(object.hasOwnProperty(key)) return true;
  return false;
}

$(document).ready(function () {
  loadCart();
});