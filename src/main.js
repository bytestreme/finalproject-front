import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import DashboardPage from "./components/dashboard/DashboardPage";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: DashboardPage,
    name: 'home'
  },
  {
    path:'/login',
    component: RegisterPage,
    name: 'login'
  },
  {
    path:'/register',
    component: LoginPage,
    name: 'register'
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});


new Vue({
  render: h => h(App),
  router
}).$mount('#app');
