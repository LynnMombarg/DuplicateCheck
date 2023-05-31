// Authors: Diederik
// Jira-task: 184
// Sprint: 4
// Last modified: 31-05-2023

import RecordModel from "@/pages/training/components/RecordModel.vue";
import { shallowMount } from "@vue/test-utils";

describe("RecordModel.vue", () => {
  let wrapper;

  it("renders", () => {
    wrapper = shallowMount(RecordModel, {
      propsData: {
        record1: {
          columns: ['column1'],
          values: [1],
        },
        record2: {
          columns: ['column1'],
          values: [1],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("gets the row color of equal values", () => {
    wrapper = shallowMount(RecordModel, {
      propsData: {
        record1: {
          columns: ['column1'],
          values: [1],
        },
        record2: {
          columns: ['column1'],
          values: [1],
        },
      },
    });
    expect(wrapper.vm.getRowColor('column1')).toEqual('bg-gray-100');
  });

  it("gets the row color of different values", () => {
    wrapper = shallowMount(RecordModel, {
      propsData: {
        record1: {
          columns: ['column1'],
          values: [1],
        },
        record2: {
          columns: ['column1'],
          values: [2],
        },
      },
    });
    expect(wrapper.vm.getRowColor('column1')).toEqual('record-different');
  });
});
