Vue.component('filtered', {
  data() {
    return {
      userSearch: ''
    }
  },
  template: `<form class="search"action="#" method="post" @submit.prevent="$root.$refs.products.filter(userSearch)">
               <input type="text" placeholder="Search for Item..." v-model="userSearch">
               <input type="submit" value=" ">
             </form>`
});