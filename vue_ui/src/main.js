
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '../dist/output.css';
import SignIn from "@/components/SignIn.vue";
import Dashboard from "@/components/OverviewPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'SignIn', component: SignIn} ,
        {path: '/overview', name: 'overview', component: Dashboard},
    ]
})

createApp(App).use(router).mount('#app')