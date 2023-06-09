

import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Cart from './pages/Cart.vue';
import Product from './pages/ProductList.vue';
import ProductCard from "./components/ProductCard.vue";

const routes = [
    { 
      path: '/', 
      component: Login, 
      name: 'login' 
    },
    { 
      path: '/register', 
      component: Register, 
      name: 'register' 
    },
    { 
      path: '/cart', 
      component: Cart 
    },
    { 
      path: '/products', 
      component: Product 
    },
    { 
      path: '/product/:id', 
      component: ProductCard,
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
    .post(`/auth-check`,{}, config)
    .then(response => {

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
      
})

export default router;