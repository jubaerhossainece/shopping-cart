

import { createRouter, createWebHistory } from 'vue-router';
import ExampleComponent from './components/ExampleComponent.vue';
import LoginComponent from './components/auth/LoginComponent.vue';
import CartComponent from './components/CartComponent.vue';
import ProductComponent from './components/ProductComponent.vue';

const routes = [
    { path: '/about', component: ExampleComponent },
    { path: '/', component: LoginComponent },
    { path: '/cart', component: CartComponent },
    { path: '/products', component: ProductComponent },
  ];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})