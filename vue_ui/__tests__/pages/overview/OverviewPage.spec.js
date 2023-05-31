// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 30-05-2023

import { shallowMount } from "@vue/test-utils";
import CreateModelButton from "../../../src/pages/overview/components/CreateModelButton.vue";
import OverviewBannerComponent from "../../../src/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "../../../src/pages/overview/components/OverviewModelComponent.vue";
import OverviewPage from "../../../src/pages/overview/OverviewPage.vue";

describe("OverviewPage", () => {
  let overviewBannerComponentWrapper;
  let overviewModelComponentWrapper;
  let createModelButtonWrapper;
  let overviewPageWrapper;

  beforeEach(() => {
    overviewBannerComponentWrapper = shallowMount(OverviewBannerComponent, {
      propsData: {
        models: [["test"]],
      },
    });

    overviewModelComponentWrapper = shallowMount(OverviewModelComponent, {
      propsData: {
        model: [],
      },
    });

    createModelButtonWrapper = shallowMount(CreateModelButton, {
      data() {
        return {
          tableName: "",
          modelName: "",
          description: "",
        };
      },
    });

    overviewPageWrapper = mount(OverviewPage, {
      data() {
        return {
          models: [],
        };
      },
    });
  });

  describe("CreateModelButton", () => {
    it("button click triggers create model pop up", () => {
      // act
      createModelButtonWrapper.find("button").trigger("click");
      createModelButtonWrapper.vm.$nextTick();

      // assert
      // test if pressing the button opens a window
      expect(createModelButtonWrapper.vm.open).toBe(true);
    });

    it('renders a button with text "Create Model"', () => {
      // assert
      expect(createModelButtonWrapper.find("button").text()).toBe(
        "+ Add model"
      );
    });

    it("check if values are correct when the component is created", () => {
      // assert
      expect(createModelButtonWrapper.vm.open).toBe(false);
      expect(createModelButtonWrapper.vm.warningVisible).toBe(false);
      expect(createModelButtonWrapper.vm.modelName).toBe("");
      expect(createModelButtonWrapper.vm.tableName).toBe("");
      expect(createModelButtonWrapper.vm.description).toBe("");
    });

    it("reset should reset the values of the variables to their initial state", () => {
      // act
      createModelButtonWrapper.vm.resetValues();
      // assert
      expect(createModelButtonWrapper.vm.modelName).toBe("");
      expect(createModelButtonWrapper.vm.tableName).toBe("");
      expect(createModelButtonWrapper.vm.description).toBe("");
    });
  });

  describe("OverviewBannerComponent", () => {
    it("should render", () => {
      // assert
      expect(overviewBannerComponentWrapper.exists()).toBe(true);
    });

    it("should render child components", () => {
      // assert
      expect(
        overviewBannerComponentWrapper.findComponent(CreateModelButton).exists()
      ).toBe(true);
      expect(
        overviewBannerComponentWrapper
          .findComponent(OverviewModelComponent)
          .exists()
      ).toBe(true);
    });

    it("should call createModel on parent", () => {
      // arrange
      const mockedMethod = jest.spyOn(OverviewPage.methods, "createModel");
      // act
      overviewBannerComponentWrapper.vm.$emit("createModel");
      // assert
      expect(mockedMethod).toHaveBeenCalled();
    });
  });
});
