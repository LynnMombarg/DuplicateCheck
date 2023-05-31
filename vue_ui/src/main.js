// Authors: Marloes
// Jira-task: 106 - Front-end maken
// Sprint: 2, 3
// Last modified: 15-05-2023

import { createApp } from "vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "../dist/output.css";
import SignIn from "@/pages/login/SignIn.vue";
import OverviewPage from "@/pages/overview/OverviewPage.vue";
import "./fetch.js";
import TrainingPage from "@/pages/training/TrainingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "SignIn",
      component: SignIn,
      meta: { title: "Sign In - Plauti Duplicate Check ML" },
    },
    {
      path: "/overview",
      name: "OverviewPage",
      component: OverviewPage,
      meta: { title: "Overview - Plauti Duplicate Check ML" },
    },
    {
      path: "/training/:modelId?",
      name: "TrainingPage",
      component: TrainingPage,
      meta: { title: "Train model - Plauti Duplicate Check ML" },
    },
  ],
});

export const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token") || null,
      user: JSON.parse(localStorage.getItem("user")) || null,
      models: JSON.parse(localStorage.getItem("models")) || null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setModels(state, models) {
      state.models = models;
      localStorage.setItem("models", JSON.stringify(models));
    },
    removeModels(state) {
      state.models = null;
      localStorage.removeItem("models");
    },
  },
  getters: {
    getModelById: (state) => (modelId) => {
      try {
        return state.models.find((model) => model.modelId === modelId);
      } catch (e) {
        return null;
      }
    },
  },
});

router.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (to.name !== "SignIn" && !token) {
    next({ name: "SignIn" });
  } else if (to.name === "SignIn" && token) {
    next({ name: "OverviewPage" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
