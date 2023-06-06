// Authors: Diederik
// Jira-task: 190
// Sprint: 4
// Last modified: 02-06-2023

import { shallowMount } from "@vue/test-utils";
import Navbar from "../../src/components/Navbar.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

const mockRouterPush = jest.fn(() => Promise.resolve(
    { name: "OverviewPage" }
));

describe("Navbar.vue", () => {
  let wrapper;

  beforeEach(() => {
    const store = createStore({
      state() {
        return {
          user: {
            name: "testName",
            email: "testEmail",
          },
          token: "testToken",
          models: {},
        };
      },
      mutations: {
        removeToken(state) {
          state.token = null;
        },
        removeUser(state) {
          state.user = null;
        },
        removeModels(state) {
          state.models = null;
        },
      },
    });

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "SignIn",
          meta: { title: "Sign In - Plauti Duplicate Check ML" },
        },
        {
          path: "/overview",
          name: "OverviewPage",
          meta: { title: "Overview - Plauti Duplicate Check ML" },
        },
        {
          path: "/training/:modelId?",
          name: "TrainingPage",
          meta: { title: "Train model - Plauti Duplicate Check ML" },
        },
      ],
    });

    router.push = mockRouterPush;

    wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("navigates to overview page when clicked on logo", async () => {
    await wrapper.find("#logo").trigger("click");
    expect(mockRouterPush).toHaveBeenCalledWith({ name: "OverviewPage" });
  });

  it("signs out when signOut is called", async () => {
    await wrapper.vm.signOut();
    expect(mockRouterPush).toHaveBeenCalledWith({ name: "SignIn" });
  });
});
