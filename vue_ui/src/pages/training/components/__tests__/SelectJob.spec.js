// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 30-05-2023

import { shallowMount } from '@vue/test-utils';

import SelectJobBody from "../training/components/SelectJobBody.vue";



describe('Create test', () => {
    
    it('button click triggers select job pop up', () => {

        const wrapper = shallowMount(SelectJobBody);
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.open).toBe(true);
    });


});



