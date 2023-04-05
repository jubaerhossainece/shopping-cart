import axios from "axios"

export const getProducts = ({commit}) => {
    axios.get(`${process.env.MIX_APP_URL}/api/products`)
    .then(response => {
        commit('SET_PRODUCTS', response.data);
    })
}