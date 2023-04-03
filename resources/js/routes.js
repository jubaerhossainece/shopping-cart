

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

 const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== '/' && to.name !=='register'){

//     next({ name: '/' })
//   } 
//   // if the user is not authenticated, `next` is called twice
//   next()
// })

export default router;