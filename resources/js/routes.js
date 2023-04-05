

import { createRouter, createWebHistory } from 'vue-router';

import LoginComponent from './components/auth/Login.vue';
import RegisterComponent from './components/auth/Register.vue';
import CartComponent from './components/Cart.vue';
import ProductComponent from './components/ProductList.vue';
import ProductCardComponent from "./components/ProductCard.vue";

const routes = [
    { path: '/', component: LoginComponent, name: 'login' },
    { path: '/register', component: RegisterComponent, name: 'register' },
    { path: '/cart', component: CartComponent },
    { path: '/products', component: ProductComponent },
    { 
      path: '/product/:id', 
      component: ProductCardComponent,
      name: 'product',
      props:true
    },
  ];

 const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    let isAuthenticated = false;
    
    let auth_token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    axios
    .post(`${process.env.MIX_APP_URL}/auth-check`,{}, config)
    .then(response => {

      console.log(response);
      isAuthenticated = response.data.status;

    })
    .catch(error => {
      
      console.log(error);
      isAuthenticated = false;
    
    })
    .finally(()=>{
      if (!isAuthenticated){
        if((to.name == 'login' || to.name == 'register')){
         
          next();
        
        }else{
        
          next({path: '/'});
        
        }
      }else if(isAuthenticated){
        if((to.name == 'login' || to.name == 'register')){
          next({path: 'products'});
        }else{
          next();
        }
      }
    });
      console.log(auth_token);
      
})

export default router;