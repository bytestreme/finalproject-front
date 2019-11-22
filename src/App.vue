<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view v-if="$route.path === '/login' || $route.path === '/register'">
            </router-view>

            <div v-else class="templatemo-flex-row">
                <sidebar v-if="$store.getters.isAuth"></sidebar>
                <div class="templatemo-content col-1 light-gray-bg">
                    <headbar></headbar>
                    <router-view></router-view>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import sidebar from './components/common/Sidebar.vue'
    import headbar from './components/common/Headbar.vue'

    export default {
        components: {
            sidebar,
            headbar
        },
        name: 'app',
    }
</script>
