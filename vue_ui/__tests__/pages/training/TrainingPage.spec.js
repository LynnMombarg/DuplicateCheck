// Authors: Diederik
// Jira-task: 152
// Sprint: 3
// Last modified: 24-05-2023

import TrainingPage from '../../../src/pages/training/TrainingPage.vue'
import { shallowMount } from '@vue/test-utils';

describe("TrainingPage.vue", () => {
    test("renders correctly", () => {
        const wrapper = shallowMount(TrainingPage);
        expect(wrapper.element).toMatchSnapshot();
    })
});
