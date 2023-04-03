

import { createRouter, createWebHistory } from 'vue-router';

import LoginComponent from './components/auth/Login.vue';
import RegisterComponent from './components/auth/Register.vue';
import CartComponent from './components/Cart.vue';
import ProductComponent from './components/Product.vue';

const routes = [
    { path: '/', component: LoginComponent, name: 'login' },
    { path: '/register', component: RegisterComponent, name: 'register' },
    { path: '/cart', component: CartComponent },
    { path: '/products', component: ProductComponent },
  ];

 const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.name != 'login' && to.name != 'register'){
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'));
      next()
    }else{
      next({ name: 'login' })
    }
  }else{
    next()
  }
  // if the user is not authenticated, `next` is called twice
})

export default router;