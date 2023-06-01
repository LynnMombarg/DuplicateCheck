// Authors: Diederik
// Jira-task: 185
// Sprint: 4
// Last modified: 31-05-2023

import SelectJobBody from "@/pages/training/components/SelectJobBody.vue";
import { shallowMount } from "@vue/test-utils";

describe("SelectJobBody.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SelectJobBody);
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
