// Authors: Roward
// Jira-task: 146
// Sprint: 4
// Last modified: 31-05-2023

import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import CreateModelButton from "@/pages/overview/components/CreateModelButton.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
import OverviewPage from "@/pages/overview/OverviewPage.vue";
import { shallowMount } from "@vue/test-utils";

describe("OverviewBannerComponent.vue", () => {
  let wrapper;
  const parentWrapper = {
    methods: {
      createModel: jest.fn(),
      executeModel: jest.fn(),
      deleteModel: jest.fn(),
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(OverviewBannerComponent, {
      propsData: {
        models: [["test"]],
      },
      parentComponent: { parentWrapper },
    });
  });

  it("renders", () => {
    // Assert
    expect(wrapper.exists()).toBe(true);
  });

  it("renders child components", () => {
    // Assert
    expect(wrapper.findComponent(CreateModelButton).exists()).toBe(true);
    expect(wrapper.findComponent(OverviewModelComponent).exists()).toBe(true);
  });

  it("renders child components", () => {
    // Assert
    expect(wrapper.findComponent(CreateModelButton).exists()).toBe(true);
    expect(wrapper.findComponent(OverviewModelComponent).exists()).toBe(true);
  });

  it("calls createModel on parent", () => {
    // Arrange
    wrapper.vm.$parent.createModel = jest.fn();

    // Act
    wrapper.vm.createModel("modelName", "tableName", "description");

    // Assert
    expect(wrapper.vm.$parent.createModel).toHaveBeenCalledWith(
      "modelName",
      "tableName",
      "description"
    );
  });

  it("calls executeModel on parent", () => {
    // Arrange
    wrapper.vm.$parent.executeModel = jest.fn();

    // Act
    wrapper.vm.executeModel("tableName", "modelId", "recordId1", "recordId2");

    // Assert
    expect(wrapper.vm.$parent.executeModel).toHaveBeenCalledWith(
      "tableName",
      "modelId",
      "recordId1",
      "recordId2"
    );
  });

  it("calls deleteModel on parent", () => {
    // Arrange
    wrapper.vm.$parent.deleteModel = jest.fn();

    // Act
    wrapper.vm.deleteModel("modelId");

    // Assert
    expect(wrapper.vm.$parent.deleteModel).toHaveBeenCalledWith("modelId");
  });
});
