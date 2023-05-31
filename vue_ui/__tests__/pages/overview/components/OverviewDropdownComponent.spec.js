// Authors: Lynn
// Jira-task: 144
// Sprint: 3
// Last modified: 23-05-2023

import OverviewDropdownComponent from "@/pages/overview/components/OverviewDropdownComponent.vue";

import { mount, shallowMount } from "@vue/test-utils";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
// import TrainingPage from "@/pages/training/TrainingPage.vue";

describe("OverviewDropdownComponent.vue", () => {
  test("renders", () => {
    const wrapper = shallowMount(OverviewDropdownComponent);
    expect(wrapper.exists()).toBe(true);
  });

  test("dropdown not visible when not clicked", () => {
    const wrapper = shallowMount(OverviewDropdownComponent);
    expect(wrapper.find("MenuItems").exists()).toBe(false);
  });

  //   test("triggers router push after clicking on train model", async () => {
  //     const router = createRouter({
  //       history: createWebHashHistory(),
  //       routes: [
  //         {
  //           path: "/training",
  //           name: "TrainingPage",
  //           component: TrainingPage,
  //         },
  //       ],
  //     });

  //     router.push("training");
  //     await router.isReady();

  //     const wrapper = shallowMount(OverviewDropdownComponent, {
  //       global: {
  //         plugins: [router],
  //       },
  //     });

  //     expect(wrapper.findComponent(TrainingPage).exists()).toBe(true);
  //   });

  test("start execution sets values", async () => {
    const wrapper = shallowMount(OverviewDropdownComponent, {
        methods: {
            resetValues: jest.fn(),
        }
    });

    wrapper.vm.startExecuteModel("modelId", "tableName");

    expect(wrapper.vm.$data.dialog).toBe(true);
    expect(wrapper.vm.$data.executeModelId).toBe("modelId");
    expect(wrapper.vm.$data.executeTableName).toBe("tableName");
  });

  test("execute model while both recordIds are empty", async () => {
    const wrapper = shallowMount(OverviewDropdownComponent);

    wrapper.vm.executeModel();

    expect(wrapper.vm.$data.warningVisible).toBe(true);
  });

  test("execute model while both recordIds are filled", async () => {
    const wrapper = shallowMount(OverviewDropdownComponent);
    wrapper.vm.$data.recordId = "1";
    wrapper.vm.$data.modelId = "1";
    wrapper.vm.executeModel();

    expect(wrapper.vm.$data.dialog).toBe(false);
  });
});
