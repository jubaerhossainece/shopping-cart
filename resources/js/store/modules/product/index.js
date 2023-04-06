import axiosIns from 'axios';


const axios = axiosIns.create({
    // You can add your headers here
    // baseURL: process.env.MIX_APP_URL,
    timeout: 90000,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            },
        },
    }
})

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
    .get(`api/v1/products`)
    .then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data.payload.products);
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