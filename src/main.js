import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import VueRouter from 'vue-router'
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import MainPage from "./components/main/Main.vue";
import PassengerPage from "./components/roles/passenger/ProfilePage.vue";
import ManagerPage from "./components/roles/manager/ProfilePage.vue";
import AgentPage from "./components/roles/agent/ProfilePage.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
    {
        path: '/dashboard',
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
    },
    {
        path: '/',
        component: MainPage,
        name: 'main',
    },
    {
        path: '/passenger-profile',
        component: PassengerPage,
        name: 'passenger-profile',
        meta: {requiresLogin: true}
    },
    {
        path: '/manager-profile',
        component: ManagerPage,
        name: 'manager-profile',
        meta: {requiresLogin: true}
    },
    {
        path: '/agent-profile',
        component: AgentPage,
        name: 'agent-profile',
        meta: {requiresLogin: true}
    },
];


const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.getters.isAuth && !localStorage.getItem('token')) {
            next({ path: '/login'})
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }

    if (to.matched.some(record => record.meta.notAuth)) {
        if (store.getters.isAuth && localStorage.getItem('token')) {
            next({ path: '/dashboard'})
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
