import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import VueRouter from 'vue-router'
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

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
