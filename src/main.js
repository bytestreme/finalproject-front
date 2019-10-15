import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';

import VueRouter from 'vue-router'
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAuthorized: false,
    },
    getters: {
        isAuth: state => {
            return state.isAuthorized;
        }
    },
    mutations: {
        auth(state) {
            state.isAuthorized = true;
        },
        deAuth(state) {
            state.isAuthorized = false;
        },
        doReg(state) {
            state.register = true;
        },
        doLog(state) {
            state.register = false;
        }
    }
});


const routes = [
    {
        path: '/',
        component: DashboardPage,
        name: 'home',
        meta: {requiresLogin: true}
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register',
    }
];


const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    render: h => h(App),
    router,
    store,
    computed: {
        isAuthReturn() {
            return this.$store.getters.isAuth;
        }
    }
}).$mount('#app');
