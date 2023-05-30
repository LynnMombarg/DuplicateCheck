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
        const methodMock = jest.spyOn(CreateModelButton.methods, 'createModel'
        );
        const wrapper = shallowMount(CreateModelButton, {
            methods: {
                methodMock,
            }
        });
        wrapper.vm.modelName = "test";
        wrapper.vm.tableName = "test";
        wrapper.vm.description = "test";
        wrapper.find('button').trigger('click');
        wrapper.vm.$nextTick();
        expect(methodMock).toBeCalled();
    });

    it('renders a button with text "Create Model"', () => {
        const wrapper = shallowMount(CreateModelButton);
        expect(wrapper.find('button').text()).toBe("+ Add model");
    });

    it('check if values are correct when the component is created', () => {
        const wrapper = shallowMount(CreateModelButton);
        expect(wrapper.vm.open).toBe(false);
        expect(wrapper.vm.warningVisible).toBe(false);
        expect(wrapper.vm.modelName).toBe("");
        expect(wrapper.vm.tableName).toBe("");
        expect(wrapper.vm.description).toBe("");
    });

});



