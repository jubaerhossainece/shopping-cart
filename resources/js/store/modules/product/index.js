import axios from 'axios';

const state = {
  productItems: [] 
}
const mutations = {
    UPDATE_PRODUCT_ITEMS (state, payload) {
        state.productItems = payload;
    }
}

const actions = {
  getProductItems ({ commit }) {
    axios
    .get(`${process.env.MIX_APP_URL}/api/v1/products`)
    .then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data.payload.products);
      console.log(response.data.payload.products);
      console.log(`${process.env.MIX_APP_URL}/api/v1/products`);
    });
  }
}

const getters = {
    productItems: state => state.productItems,
    productItemById: (state) => (id) => {
      return state.productItems.find(productItem => productItem.id === id)
    }
  }

  const productModule = {
    state,
    mutations,
    actions,
    getters
  }
  
  export default productModule;