import axiosIns from 'axios';


const axios = axiosIns.create({
    // You can add your headers here
    baseURL: process.env.MIX_APP_URL,
    // baseURL: 'https://sources.com.bd/',
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
  cartItems: []
}

const mutations = {
  UPDATE_CART_ITEMS (state, payload) {
    state.cartItems = payload;
  }
}

const actions = {
    getCartItems ({ commit }) {
      axios.get(`${process.env.MIX_APP_URL}/api/v1/cart-items`)
      .then((response) => {
        console.log(response.data.payload.cart_items);
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    addCartItem ({ commit }, cartItem) {
        console.log(cartItem);
      axios.post(`${process.env.MIX_APP_URL}/api/v1/cart-item`, cartItem).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    },
    removeCartItem ({ commit }, cartItem) {
      axios.delete(`${process.env.MIX_APP_URL}/api/cart-item/delete`, cartItem).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    },
    removeAllCartItems ({ commit }) {
      axios.delete(`${process.env.MIX_APP_URL}/api/cart-item/delete/all`).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    }
  }

  const getters = {
    cartItems: state => state.cartItems,
    cartTotal: state => {
      return state.cartItems.reduce((acc, cartItem) => {
        return (cartItem.quantity * cartItem.price) + acc;
      }, 0).toFixed(2);
    },
    cartQuantity: state => {
      return state.cartItems.reduce((acc, cartItem) => {
        return cartItem.quantity + acc;
      }, 0);
    }
  }

  const cartModule = {
    state,
    mutations,
    actions,
    getters
  }
  export default cartModule;