<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand">Navbar</a>

            <div class="d-flex">
               
                <router-link to="/cart" class="btn"><i class="fas fa-cart-plus pr-2"></i></router-link>

                <button class="btn" @click.="logout">
                    <i class="fas fa-sign-out-alt pr-2"></i>
                </button>
            </div>
        </div>
    </nav>        
</template>

<script>
import axios from 'axios';

    export default {
        name: 'Navbar',
        mounted() {
            console.log('Component mounted.')
        },
        methods:{
            logout(){
                
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };

                axios
                .post(`${process.env.MIX_APP_URL}/logout`,{}, config)
                .then(response => {
                    console.log(response);
                    if(response.data.status == true){
                        this.$router.push('/');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    .back-btn{
        background-color: white;
    }
    input#form1 {
        min-width: 50px;
    }
</style>