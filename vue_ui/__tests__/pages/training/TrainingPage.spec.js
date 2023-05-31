// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 31-05-2023

import TrainingPage from "@/pages/training/TrainingPage.vue";
import { shallowMount } from "@vue/test-utils";
import * as getJobsModule from "@/pages/training/services/GetJobs";


describe("TrainingPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    getJobsModule.getJobs = jest.fn().mockResolvedValue({0: 'job1', 1: 'job2'});
      
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
                return {name: 'model-name', id: 'model-id'};
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

  it("sets the model", () => {
    expect(wrapper.vm.model).toEqual({'name': 'model-name', 'id': 'model-id'});
  });

  it("calls getJobs on created", () => {
    expect(getJobsModule.getJobs).toHaveBeenCalled();
  });

  it("sets the jobs", () => {
    expect(wrapper.vm.jobs).toEqual({0: 'job1', 1: 'job2'});
  });
});
