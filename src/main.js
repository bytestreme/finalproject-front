import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import VueRouter from 'vue-router'
import VueMask from 'v-mask'

import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import MainPage from "./components/main/Main.vue";
import PassengerPage from "./components/roles/passenger/ProfilePage.vue";
import ManagerPage from "./components/roles/manager/ProfilePage.vue";
import ManagerTrain from "./components/roles/manager/CreateTrain.vue";
import ManagerAllTrains from "./components/roles/manager/Trains.vue";
import ManagerNews from "./components/roles/manager/Advisories.vue";
import ManagerAllRoutes from "./components/roles/manager/AllRoutes.vue";
//import ManagerEmployers from "./components/roles/manager/Employers.vue";
//import ManagerEmployer from "./components/roles/manager/Employer.vue";
import AgentPage from "./components/roles/agent/ProfilePage.vue";
import TrainPage from "./components/main/TrainPage.vue"
import TrainInfo from "./components/roles/manager/TrainInfo.vue";
import Logs from "./components/logs/Logs.vue"
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import TrainSchedule from "./components/roles/manager/TrainSchedule.vue";

Vue.config.productionTip = false;

Vue.use(Notifications, {velocity})
Vue.use(VueRouter);
Vue.use(VueMask);

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
        path: '/manager-all-routes',
        component: ManagerAllRoutes,
        name: 'manager-all-routes',
        meta: {requiresLogin: true}
    },
    {
        path: '/manager-train',
        component: ManagerTrain,
        name: 'manager-train',
        meta: {requiresLogin: true}
    },
    {
        path: '/manager-all-trains',
        component: ManagerAllTrains,
        name: 'manager-all-trains',
        meta: {requiresLogin: true}
    },
    {
        path: '/manager-news',
        component: ManagerNews,
        name: 'manager-news',
        meta: {requiresLogin: true}
    }/*,
    {
        path: '/manager-employers',
        component: ManagerEmployers,
        name: 'manager-employers',
        meta: {requiresLogin: true}
    },
    {
        path: '/manager-employer',
        component: ManagerEmployer,
        name: 'manager-employer',
        meta: {requiresLogin: true}
    }*/,
    {
        path: '/agent-profile',
        component: AgentPage,
        name: 'agent-profile',
        meta: {requiresLogin: true}
    },
    {
        path: '/route/:id',
        component: TrainPage,
        name: 'train-page',
        meta: {requiresLogin: true}
    },
    {
        path: '/train/:id',
        component: TrainInfo,
        name: 'train-info',
        meta: {requiresLogin: true}
    },
    {
        path: '/logs',
        component: Logs,
        name: 'Logs',
        meta: {requiresLogin: true}
    },
    {
        path: '/manage-route/:id',
        component: TrainSchedule,
        name: 'TrainSchedule',
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
            next({path: '/login'})
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }

    if (to.matched.some(record => record.meta.notAuth)) {
        if (store.getters.isAuth && localStorage.getItem('token')) {
            next({path: '/dashboard'})
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
