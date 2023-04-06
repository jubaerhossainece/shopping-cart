<template>
    <div class="container mt-5">
        
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form @submit.prevent="OnRegister">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" v-model.trim="form.name" class="form-control" id="name">
                                <span v-if="errors.name" class="text-danger">
                                    {{errors.name[0]}}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" v-model.trim="form.email" class="form-control" id="email">
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
                            <button type="submit" class="btn btn-primary">Register</button>
                        </form>
                        <div class="mt-3">
                            Already have an account? <router-link to="/" class="link">Login</router-link>
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
                    name:'',
                    email:'',
                    password:''
                },
                errors: []
            }
        },
        methods: {
            OnRegister(){
                axios
                .post(`/register`, this.form)
                .then(response => {
                    console.log(response);
                    if(response.data.status == true){
                        this.$router.push('/');
                    }
                })
                .catch(error => {
                    console.log(error.response.data);
                    this.errors = error.response.data.errors
                })
            },
        },
        mounted() {
            console.log()
        }
    }
</script>