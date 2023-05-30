// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 30-05-2023

import { shallowMount } from '@vue/test-utils';
import CreateModelButton from "../CreateModelButton.vue";

describe('Create test', () => {

    beforeEach(() => {
        window.open = jest.fn();
    });

    it('button click triggers create model pop up', () => {
        // arrange
        const wrapper = shallowMount(CreateModelButton);
        wrapper.vm.modelName = "test";
        wrapper.vm.tableName = "test";
        wrapper.vm.description = "test";

        // act
        wrapper.find('button').trigger('click');
        wrapper.vm.$nextTick();

       // assert
       // test if pressing the button opens a window
        expect(wrapper.vm.open).toBe(true);
    });

    it('renders a button with text "Create Model"', () => {
        // arrange
        const wrapper = shallowMount(CreateModelButton);
        // assert
        expect(wrapper.find('button').text()).toBe("+ Add model");
    });

    it('check if values are correct when the component is created', () => {
        // arrange
        const wrapper = shallowMount(CreateModelButton);
        // assert
        expect(wrapper.vm.open).toBe(false);
        expect(wrapper.vm.warningVisible).toBe(false);
        expect(wrapper.vm.modelName).toBe("");
        expect(wrapper.vm.tableName).toBe("");
        expect(wrapper.vm.description).toBe("");
    });

});



