// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 31-05-2023

import { shallowMount } from '@vue/test-utils';

import SelectJobBody from "../../components/SelectJobBody.vue";

describe('SelectJob', () => {

        it('button click triggers call with jobId on parent component', () => {

            // Arrange
            const parentComponentMock = {
                methods: {
                    selectJob: jest.fn(),
                },
                data() {
                    return {
                        jobId: null,
                    };
                },
            };

            const wrapper = shallowMount(SelectJobBody, {
                parentComponent: {
                    parentComponentMock,
                },
            });

            wrapper.vm.$parent.selectJob = jest.fn();
            wrapper.vm.jobId = "test job id";

            // Act
            const button = wrapper.find('button');
            button.trigger('click');
            wrapper.vm.$nextTick();

            // Assert
           expect(wrapper.vm.$parent.selectJob).toHaveBeenCalledWith(wrapper.vm.jobId);
        });

    it('button click sets open to true', () => {
        // Arrange
        const wrapper = shallowMount(SelectJobBody);
        wrapper.vm.$parent.selectJob = jest.fn();

        // Act
        const button = wrapper.find('button');
        button.trigger('click');
        wrapper.vm.$nextTick();

        // Assert
        expect(wrapper.vm.open).toBe(true);
    });

    it('select job body is initialised with the right values', () => {
        // Arrange / Act
        const wrapper = shallowMount(SelectJobBody);
        // Assert
        expect(wrapper.vm.open).toBe(false);
        expect(wrapper.vm.job).toBe(undefined);
    });

});



