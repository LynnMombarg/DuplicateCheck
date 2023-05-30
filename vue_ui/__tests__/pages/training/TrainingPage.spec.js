// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 30-05-2023

import TrainingPage from "@/pages/training/TrainingPage.vue";
import { shallowMount } from "@vue/test-utils";
import * as getJobsModule from "@/pages/training/services/GetJobs";


describe("TrainingPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    getJobsModule.getJobs = jest.fn();
      
    wrapper = shallowMount(TrainingPage, {
      global: {
        mocks: {
          $route: {
            params: {
              modelId: "model-id",
            },
          },
          $store: {
            getters: {
              getModelById: () => {
                return {};
              },
            },
          },
        },
      },
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
