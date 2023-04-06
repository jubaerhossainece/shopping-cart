<template>
    <div class="container mt-5">
        
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <div v-if="message" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Warning!</strong> {{message}}
                        </div>

                        <form @submit.prevent="OnLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" name="email" v-model.trim="form.email" class="form-control" id="email">
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                <span v-if="errors.email" class="text-danger">
                                    {{errors.email[0]}}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" name="password" v-model.trim="form.password" class="form-control" id="password">
                                <span v-if="errors.password" class="text-danger">
                                    {{errors.password[0]}}
                                </span>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                        <div class="mt-3">
                            Not registered? <router-link to="register" class="link">Register now</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                form: {
                    email:'',
                    password:''
                },
                errors: [],
                message: ''
            }
        },
        methods: {
            OnLogin(){
                axios
                .post(`/login`, this.form)
                .then(response => {
                    console.log(response);
                    let token = response.data.payload.token;
                    localStorage.setItem('token', token);
                    this.$router.push('/products');
                    
                })
                .catch(error => {
                    console.log(error);
                })
            },
        },
    }
</script>