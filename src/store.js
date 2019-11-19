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
        },
        logStatus: state => {
            return state.isLogsOn;
        },
        isLogsDetailed: state => {
            return state.isLogsDetailed;
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
        logStatusChange(state, s) {
            state.isLogsOn = s;
        },
        logTypeChange(state, s) {
            state.isLogsDetailed= s;
        }
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
        logTypeChange(context, r) {
            context.commit('logStatusChange', r)
        },
        logStatusChange(context, r) {
            context.commit('logTypeChange', r)
        }
    }
});

export default store;