// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 30-05-2023

import { shallowMount } from '@vue/test-utils';

import SelectJobBody from "../../components/SelectJobBody.vue";



describe('SelectJob', () => {

    it('button click triggers select job pop up', () => {

        // arrange
        const parentComponentMock = {
            methods: {
                selectJob: jest.fn(),
            },
            data() {
                return {
                    jobId: "test job id",
                };
            },
        };


        const wrapper = shallowMount(SelectJobBody, {
            parentComponent: {
                $parent: parentComponentMock,
            },
        });

        // act
        const button = wrapper.find('button');
        button.trigger('click');
        wrapper.vm.$nextTick();
        wrapper.vm.$nextTick();

        // assert
        expect(wrapper.vm.open).toBe(true);
        //expect(wrapper.vm.jobId).toBe("test job id");
    });

    it('is initialised with the right values', () => {

        const wrapper = shallowMount(SelectJobBody);

        expect(wrapper.vm.open).toBe(false);
        expect(wrapper.vm.job).toBe(undefined);
    });

});



