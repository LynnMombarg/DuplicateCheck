// Authors: Diederik
// Jira-task: 190
// Sprint: 4
// Last modified: 02-06-2023

import { shallowMount } from "@vue/test-utils";
import Navbar from "../../src/components/Navbar.vue";
import { createStore } from "vuex";

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
        };
      },
    });

    wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});

