<template>
    <div class="templatemo-top-nav-container">
        <div class="row">
            <nav class="templatemo-top-nav col-lg-12 col-md-12">
                <ul class="text-uppercase">
                    <li><a href="" class="active">Admin panel</a></li>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Overview</a></li>
                    <li v-if="$store.getters.isAuth" ><a @click="signout">Sign out</a></li>
                    <li v-else ><router-link to="/login">Sign in</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>