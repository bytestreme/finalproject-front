import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import VueRouter from 'vue-router'
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});

const store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
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
    },
    actions: {
        auth(context) {
            context.commit('auth')
        },
        deAuth(context) {
            context.commit('deAuth')
        },
        doReg(context) {
            context.commit('doReg')
        },
        doLog(context) {
            context.commit('doLog')
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
        name: 'login',
        meta: {notAuth: true}
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register',
        meta: {notAuth: true}
    }
];


const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.getters.isAuth) {
            next({ path: '/login'})
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }

    if (to.matched.some(record => record.meta.notAuth)) {
        if (store.getters.isAuth) {
            next({ path: '/'})
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
});

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
