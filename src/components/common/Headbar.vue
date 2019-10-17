<template>
    <div class="templatemo-top-nav-container">
        <div class="row">
            <nav class="templatemo-top-nav col-lg-12 col-md-12">
                <ul class="text-uppercase">
                    <li><router-link class="active" to="/">POVIDLO Railways</router-link></li>
                    <li v-if="$store.getters.isAuth" ><a href="" @click="signout">Sign out</a></li>
                    <li v-else ><router-link to="/login">Sign in</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default{
        methods:{
            signout(){
                this.$store.dispatch('deAuth').then(()=>{
                    localStorage.removeItem("token");
                    this.$router.push({ name: 'main'})
                });
            }
        }
    }
</script>