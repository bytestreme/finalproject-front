import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Hello from './components/HelloWorld.vue'
import Signup from './components/Signup.vue'

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: Hello,
    name: 'hello'
  },
  {
    path:'/sign-up',
    component: Signup,
    name: 'sign-up'
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
