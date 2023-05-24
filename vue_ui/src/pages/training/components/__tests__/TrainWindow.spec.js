// Authors: Lynn
// Jira-task: 151
// Sprint: 3
// Last modified: 24-05-2023

import { mount, shallowMount } from '@vue/test-utils';
import TrainWindow from '../TrainWindow.vue';
import TrainService from '../../services/TrainService';
// import RecordModel from "../RecordModel.vue";
// import OverviewModelComponent from "../../../overview/components/OverviewModelComponent.vue";
// jest.mock("../RecordModel.vue");
// jest.mock("../../../overview/components/OverviewModelComponent.vue");

describe('TrainWindow.vue', () => {
    test('window contains button', () => {
        const wrapper = mount(TrainWindow);
        expect(wrapper.exists('button')).toBe(true);
    })

    test('', () => {
        const giveAnswerMock = jest.spyOn(TrainService.methods, 'giveAnswer');
        const saveTrainingMock = jest.spyOn(TrainWindow.methods, 'saveTraining');
        const wrapper = mount(TrainWindow, {
            methods: {
                giveAnswerMock,
                saveTrainingMock,
            },
            propsData: {
                answerCounter: 0,
            }            
        });
        wrapper.find('button').trigger('click');
        expect(giveAnswerMock).toBeCalled();
    })

})