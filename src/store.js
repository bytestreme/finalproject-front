import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import Vue from 'vue'

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
});

const store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    state: {
        isAuthorized: false,
        role: "",
        isLogsOn: true,
        isLogsDetailed: true
    },
    getters: {
        isAuth: state => {
            return state.isAuthorized;
        },
        role: state => {
            return state.role;
        }
    },
    mutations: {
        auth(state) {
            state.isAuthorized = true;
        },
        role(state, r) {
            state.role = r;
        },
        deAuth(state) {
            state.isAuthorized = false;
        },
    },
    actions: {
        auth(context) {
            context.commit('auth')
        },
        deAuth(context) {
            context.commit('deAuth')
        },
        role(context, r) {
            context.commit('role', r)
        },
    }
});

export default store;