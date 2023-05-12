// Authors: Marloes
// Jira-task: 106 - Front-end maken
// Sprint: 2
// Last modified: 26-04-2023

import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '../dist/output.css';
import SignIn from "@/pages/login/SignIn.vue";
import OverviewPage from "@/pages/overview/OverviewPage.vue";
import './fetch.js';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'SignIn', component: SignIn},
        {path: '/overview', name: 'OverviewPage', component: OverviewPage}
    ]
})

export const store = createStore({
    state() {
        return {
            token: localStorage.getItem('token') || null,
        };
    },
    mutations: {
        setToken(state, token ) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        removeToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
});

router.beforeEach((to, from, next) => {
    const token = store.state.token;
    if (to.name !== 'SignIn' && !token) next({ name: 'SignIn' });
    else if (to.name === 'SignIn' && token) next({ name: 'OverviewPage' });
    else next();
});


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

