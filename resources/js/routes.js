

import { createRouter, createWebHistory } from 'vue-router';

import LoginComponent from './components/auth/Login.vue';
import RegisterComponent from './components/auth/Register.vue';
import CartComponent from './components/Cart.vue';
import ProductComponent from './components/Product.vue';

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/cart', component: CartComponent },
    { path: '/products', component: ProductComponent },
  ];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})