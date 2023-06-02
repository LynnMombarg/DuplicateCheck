// Authors: Lynn, Diederik
// Jira-task: 144
// Sprint: 3, 4
// Last modified: 02-06-2023

import OverviewDropdownComponent from "@/pages/overview/components/OverviewDropdownComponent.vue";

import { mount, shallowMount } from "@vue/test-utils";

describe("OverviewDropdownComponent.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OverviewDropdownComponent);
  });

  test("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("dropdown not visible when not clicked", () => {
    expect(wrapper.find("MenuItems").exists()).toBe(false);
  });

  test("execute model while both recordIds are empty", async () => {
    wrapper.vm.executeModel();

    expect(wrapper.vm.$data.warningVisible).toBe(true);
  });

  test("execute model while both recordIds are filled", async () => {
    wrapper.vm.$data.recordId = "1";
    wrapper.vm.$data.modelId = "1";
    wrapper.vm.executeModel();

    expect(wrapper.vm.$data.dialog).toBe(false);
  });

  test("data is loaded", async () => {
    expect(wrapper.vm.$data.executeTableName).toBe("");
    expect(wrapper.vm.$data.executeModelId).toBe("");
    expect(wrapper.vm.$data.recordid1).toBe("");
    expect(wrapper.vm.$data.recordid2).toBe("");
    expect(wrapper.vm.$data.warningVisible).toBe(false);
    expect(wrapper.vm.$data.dialog).toBe(false);
    expect(wrapper.vm.$data.percentage).toBe(0);
  });

  test("resetValues", async () => {
    wrapper.vm.$data.recordid1 = "1";
    wrapper.vm.$data.executeModelId = "1";
    wrapper.vm.resetValues();

    expect(wrapper.vm.$data.recordid1).toBe("");
    expect(wrapper.vm.$data.executeModelId).toBe("");
  });

  test("confirmDelete", async () => {
    windowConfirmMock = jest.fn();
    window.confirm = windowConfirmMock;

    wrapper.vm.confirmDelete();

    expect(windowConfirmMock).toBeCalled();
  });

  test("defineProps", async () => {
    const wrapper = mount(OverviewDropdownComponent, {
      props: {
        modelId: "1",
        tableName: "1",
      },
    });
    
    expect(typeof wrapper.props().modelId).toBe("string");
    expect(typeof wrapper.props().tableName).toBe("string");
  });
});
