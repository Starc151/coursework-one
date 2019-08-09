Vue.component('cartpage', {
  data() {
    return {
      cartItems: [],
    }
  },
  computed: {
    totalPrice() {
      totalPriceCart = 0;
      for (let key  of this.cartItems.keys()) {
        totalPriceCart += this.cartItems[key].price * this.cartItems[key].quantity;
      }
      return totalPriceCart;
    }
  },
  methods: {
    addProduct(product) {
      let find = this.cartItems.find(el => el.id_product === product.id_product);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                .then(data => {
                  if (data.result) {
                    find.quantity++;
                  }
                })
      } else {
        let prod = Object.assign({quantity: 1}, product);
        this.$parent.postJson(`/api/cart`, prod)
                .then(data => {
                  if (data.result) {
                    this.cartItems.push(prod);
                  }
                })
      }
    },
    remove(product) {
      if (product.quantity > 1) {
        this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                .then(data => {
                  if (data.result) {
                    product.quantity--;
                  }
                })
      } else {
        this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                .then(data => {
                  if (data.result) {
                    this.cartItems.splice(this.cartItems.indexOf(product), 1)
                  }
                })
      }
    },
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
            .then(data => {
              for (let el of data.contents) {
                this.cartItems.push(el);
              }
            });
  },
  template: `<div class="cartForVue">
                <cart-item 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item"
                @remove="remove"></cart-item>
                <div class="resetMyCart">
                  <a href="cart.html"><div class="resetMyCartLeft">CLEAR SHOPPING CART</div></a>
                  <a href="catalog.html"><div class="resetMyCartRight">CONTINUE SHOPPING</div></a>
                </div>
                <div class="totalMyCart">
                  <div>
                    <form class="totalMyCartForm">
                      <p>SHIPPING ADRESS</p>
                      <select>
                        <option>Abkhazia</option>
                        <option>Afghanistan</option>
                        <option>Aland Islands</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                        <option>Andorra</option>
                        <option>Angola</option>
                        <option>Other...</option>
                      </select>
                      <input type="text" placeholder="State">
                      <input type="text" placeholder="Postcode / Zip">
                      <input type="submit" class="buttonTotalMyCart" value="GET A QUOTE">
                    </form>
                  </div>
                  <div>
                    <form class="totalMyCartForm">
                      <p>COUPON DISCOUNT</p>
                      <span>Enter your coupon code if you have one</span>
                      <input type="text" placeholder="State">
                      <input type="submit" class="buttonTotalMyCart" value="APPLY COUPON">
                    </form>
                  </div>
                  <div class="grandTotal">
                    <div>
                      <p class="sTotal">Sub total<span>\${{totalPrice}}</span></p>
                      <p class="gTotal">GRAND TOTAL<span>\${{totalPrice}}</span></p>
                    </div>
                    <a href="checkout.html" class="button">PROCEED TO CHECKOUT</a>
                  </div>
                </div>
              </div>`
});

Vue.component('cart-item', {
  props: ['cartItem'],
  template: `<div class="myCartProduct">
                <ul>
                  <li class="productInMyCart">
                    <div>
                      <a href="product.html">
                        <img width = "100" :src="cartItem.img" :alt="cartItem.product_name">
                      </a>
                    </div>
                    <div class="productInMyCartText">
                      <a href="product.html"><p class="productName">{{cartItem.product_name}}</p></a>
                      <p>Color: <a href="product.html"><span>Red</span></a></p>
                      <p>Size: <a href="product.html"><span>Xll</span></a></p>
                    </div>
                  </li>
                  <li>\$ {{cartItem.price}}</li>
                  <li>{{cartItem.quantity}}</li>
                  <li>FREE</li>
                  <li>\${{cartItem.quantity * cartItem.price}}</li>
                  <li><a href="#" class="deletFromCart" @click="$emit('remove', cartItem)">X</a></li>
                </ul>
            </div>`
});