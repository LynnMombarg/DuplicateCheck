// Authors: Marloes
// Jira-task: 106 - Front-end maken
// Sprint: 2
// Last modified: 26-04-2023

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '../dist/output.css';
import SignIn from "@/components/SignIn.vue";
import CreateModel from "@/components/CreateModel.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'SignIn', component: SignIn},
        {path: '/create', name: 'CreateModel', component: CreateModel}
    ]
})

createApp(App).use(router).mount('#app')

