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
  cartItems: [],
  cartCount: 0
}

const mutations = {
  UPDATE_CART_ITEMS (state, payload) {
    state.cartItems = payload;
  }
}

const actions = {
    getCartItems ({ commit }) {
      axios.get(`/api/v1/cart-items`)
      .then((response) => {
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    addCartItem ({ commit }, cartItem) {
      axios.post(`/api/v1/cart-item`, cartItem).then((response) => {
        console.log(response);
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    increaseCartItem({ commit }, cartId) {
      axios.post(`/api/v1/cart-item/${cartId}/increase`).then((response) => {
        console.log(response);
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    removeCartItem ({ commit }, cartId) {
      axios.delete(`/api/v1/cart-item/${cartId}/delete`).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    reduceCartItem({ commit }, cartId) {
      axios.post(`/api/v1/cart-item/${cartId}/reduce`).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    },
    removeAllCartItem({ commit }) {
      axios.delete(`/api/v1/cart-item/remove-all`)
        .then((response) => {
          console.log(response.data.payload.cart_items);
        commit('UPDATE_CART_ITEMS', response.data.payload.cart_items)
      });
    }
  }

  const getters = {
    cartItems: state => state.cartItems,
    cartTotal: state => {
      return state.cartItems.reduce((acc, cartItem) => {
        return (cartItem.product_quantity * cartItem.product_price) + acc;
      }, 0).toFixed(2);
    },
    cartQuantity: state => {
        return state.cartItems.length;
    }
  }

  const cartModule = {
    state,
    mutations,
    actions,
    getters
  }
  export default cartModule;