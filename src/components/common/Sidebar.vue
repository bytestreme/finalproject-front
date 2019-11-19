<template>
    <div class="templatemo-sidebar">
        <header class="templatemo-site-header">
            <div class="square"></div>
            <h1>User Control</h1>
        </header>
        <div class="mobile-menu-icon">
            <i class="fa fa-bars"></i>
        </div>
        <nav class="templatemo-left-nav">
            <ul>
                <li>
                    <router-link to="/dashboard" :class="{'active': $route.path.includes('dashboard')}">
                    <i class="fa fa-home fa-fw"></i>Dashboard</router-link>
                </li>
                <li v-if="$store.getters.role === 'ADMIN' || $store.getters.role === 'MANAGER'">
                    <router-link to="/manager-profile" :class="{'active': $route.path.includes('manager-profile')}">
                    <i class="fa fa-subway fa-fw"></i>Create Routes</router-link>
                </li>
                <li v-if="$store.getters.role === 'AGENT'">
                    <router-link to="/agent-profile" :class="{'active': $route.path.includes('agent-profile')}">
                    <i class="fa fa-ticket fa-fw"></i>Manage ticket</router-link>
                </li>
                <li>
                    <router-link to="/passenger-profile" :class="{'active': $route.path.includes('passenger-profile')}">
                    <i class="fa fa-user fa-fw"></i>User Profile</router-link>
                </li>
                <li v-if="$store.getters.role === 'ADMIN' || $store.getters.role === 'MANAGER'">
                    <router-link to="/manager-all-routes" :class="{'active': $route.path.includes('manager-all-routes')}">
                    <i class="fa fa-desktop fa-fw"></i>Manage Routes</router-link>
                </li>
                <li v-if="$store.getters.role === 'ADMIN' || $store.getters.role === 'MANAGER'">
                    <router-link to="/manager-all-trains" :class="{'active': isClassTrains}">
                    <i class="fa fa-train fa-fw"></i>Manage Trains</router-link>
                </li>
                <li v-if="$store.getters.role === 'ADMIN' || $store.getters.role === 'MANAGER'">
                    <router-link to="/manager-news" :class="{'active': $route.path.includes('manager-news')}">
                    <i class="fa fa-envelope fa-fw"></i>Send news</router-link>
                </li>
                <li v-if="$store.getters.role === 'ADMIN' || $store.getters.role === 'MANAGER'">
                    <router-link to="/logs" :class="{'active': $route.path.includes('logs')}">
                    <i class="fa fa-exclamation-circle fa-fw"></i>Logs</router-link>
                </li>
                <li>
                    <router-link to="/" :class="{'active': $route.path === '/'}">
                    <i class="fa fa-map-marker fa-fw"></i>Search tickets</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        computed:{
            isClassTrains(){
                return this.$route.path === '/manager-all-trains'
                    || this.$route.path.startsWith('/train')
                    || this.$route.path === '/manager-train'
            }
        }
    }
</script>

