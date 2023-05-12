// Authors: Marloes
// Jira-task: 106 - Front-end maken
// Sprint: 2
// Last modified: 26-04-2023

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '../dist/output.css';
import SignIn from "@/pages/login/SignIn.vue";
import OverviewPage from "@/pages/overview/OverviewPage.vue";
import TrainingPage from "@/pages/training/TrainingPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'SignIn', component: SignIn},
        {path: '/overview', name: 'OverviewPage', component: OverviewPage},
        {path: '/training', name: 'TrainingPage', component: TrainingPage}
    ]
})

createApp(App).use(router).mount('#app')

