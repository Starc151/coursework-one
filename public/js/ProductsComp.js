Vue.component('products', {
  data() {
    return {
      products: [],
      filtered: [],
    }
  },
  methods: {
    filter(value) {
      let regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  mounted() {
    this.$parent.getJson(`/api/products`)
            .then(data => {
              for (let el of data) {
                this.products.push(el);
                this.filtered.push(el);
              }
            })
  },
  template: `<div>
           <product 
           v-for="el of filtered" 
           :key="el.id_product"
           :product="el"></product>
        </div>`
});

Vue.component('product', {
  props: ['product'],
  template: `<div class="product">
              <a href="product.html">
                <div class="promo__img">
                  <img :src="product.img" :alt="product.product_name">
                </div>
                <div class="productPrice">
                  <p>{{product.product_name}}</p>
                  <span>\$ {{product.price}}</span>
                </div>
              </a>
              <a href="#" class="productAdd" @click.prevent="$root.$refs.cart.addProduct(product)">
                <img src="img/addCart.svg" alt="addCart">
                <div>Add to Cart</div>
              </a>
            </div>`
})