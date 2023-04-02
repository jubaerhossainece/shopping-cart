<template>
    <div class="">
        <router-link to="/about">About</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
