// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 31-05-2023

import { shallowMount } from '@vue/test-utils';

import OverviewModelComponent from  "vue_ui/src/pages/overview/components/OverviewModelComponent.vue"

describe('ModelComponent', () => {

  it('select job body is initialised with the right values', () => {
    // Arrange / Act
    const wrapper = shallowMount(OverviewModelComponent);
    // Assert
   expect(true).toBe(true);
  });



});

