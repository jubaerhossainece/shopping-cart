<template>
    <div class="container">
        <Navbar></Navbar>
        <div class="row justify-content-center">
            <div class="col-md-12">
            
                <section class="h-100" style="background-color: #eee;">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center h-100">

                    <div class="d-flex justify-content-between align-items-center mb-4 mt-4">
                    <router-link class="btn back-btn" to="/products"><i class="fas fa-long-arrow-left"></i>Continue shopping</router-link>
                    </div>
                    <div class="col-md-7">
                        <cart-item v-for="cartItem in cartItems" :cart-item="cartItem" :key="cartItem.id"></cart-item>
                    </div>
                    <div class="col-md-5">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Summary</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>{{cartTotal}}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Gratis</span>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                    <strong>Total amount</strong>
                                    </div>
                                    <span><strong>${{ cartTotal }}</strong></span>
                                </li>
                                </ul>

                                <button @click="removeAllCartItem" type="button" class="btn btn-primary btn-lg btn-block">
                                Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        </div>
    </div>
</template>
   
<script>
    import { mapGetters, mapActions } from "vuex";

    import CartItem from "../components/CartItem.vue";
    import Navbar from "../components/layouts/NavigationBar.vue";

    export default {
        components: {
            Navbar,
            CartItem
        },
        computed: {
            ...mapGetters(["cartItems", "cartTotal", "cartQuantity"]),
        },
        methods: {
            ...mapActions([
                'removeAllCartItem',
            ])
        }
    };
</script>

<style scoped>
.back-btn{
    background-color: white;
}
input#form1 {
    min-width: 50px;
}
</style>
