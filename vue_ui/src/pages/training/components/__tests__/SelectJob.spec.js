// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 30-05-2023

import { shallowMount } from '@vue/test-utils';

import SelectJobBody from "../../components/SelectJobBody.vue";



describe('Create test', () => {

    describe('Create test', () => {
        // it('button click triggers select job pop up', () => {
        //
        //     const wrapper = shallowMount(SelectJobBody);
        //
        //     const button = wrapper.find('button');
        //     button.trigger('click');
        //
        //     expect(wrapper.vm.open).toBe(true);
        //     //expect(wrapper.vm.$parent.selectJob).toHaveBeenCalled();
        // });

        // describe('Create test', () => {
        //     it('button click triggers select job pop up', () => {
        //
        //         const mockParentComponent = {
        //             methods: {
        //                 selectJob: jest.fn(),
        //             },
        //         };
        //
        //         const wrapper = shallowMount(SelectJobBody
        //             , {
        //               mocks: {
        //                   $parent: mockParentComponent,
        //               }
        //           });
        //
        //         const button = wrapper.find('button');
        //         button.trigger('click');
        //
        //         expect(wrapper.vm.open).toBe(true);
        //         // You can remove the expect statement for selectJobMock since it is not being used in this case
        //     });
        // });

        it('button click triggers select job pop up', () => {
            const selectJobMock = jest.fn();

            const wrapper = shallowMount({
                components: {
                    SelectJobBody,
                },
                template: '<div><SelectJobBody @select-job="selectJob"/></div>',
                methods: {
                    selectJob: selectJobMock,
                },
            });

            const selectJobBodyComponent = wrapper.findComponent(SelectJobBody);

            selectJobBodyComponent.find('button').trigger('click');

            expect(selectJobBodyComponent.vm.open).toBe(true);
            expect(selectJobMock).toHaveBeenCalled();
        });
});
});



