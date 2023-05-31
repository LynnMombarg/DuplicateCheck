// Authors: Diederik
// Jira-task: 186
// Sprint: 4
// Last modified: 31-05-2023

import TrainWindow from "@/pages/training/components/TrainWindow.vue";
import { shallowMount } from "@vue/test-utils";

const parentMock = {
  giveAnswer: jest.fn(),
};

describe("TrainWindow.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TrainWindow, {
      propsData: {
        records: [],
      },
      parentComponent: parentMock,
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("gets answer true when button-true is clicked", () => {
    wrapper.vm.giveAnswer = jest.fn();
    wrapper.find("#button-true").trigger("click");
    expect(wrapper.vm.giveAnswer).toHaveBeenCalledWith(true);
  });

  it("gets answer false when button-false is clicked", () => {
    wrapper.vm.giveAnswer = jest.fn();
    wrapper.find("#button-false").trigger("click");
    expect(wrapper.vm.giveAnswer).toHaveBeenCalledWith(false);
  });

  it("calls saveTraining when button-save is clicked", () => {
    wrapper.vm.saveTraining = jest.fn();
    wrapper.vm.answerCounter = 2;
    wrapper.vm.$nextTick().then(() => {
        const buttonSave = wrapper.find('#button-save');
      buttonSave.trigger('click');
    });
  });
});
