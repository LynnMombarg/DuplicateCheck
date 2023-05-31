// Authors: Lynn
// Jira-task: 144
// Sprint: 3
// Last modified: 23-05-2023

import SignInButton from '../../../src/pages/login/components/SignInButton.vue';
import { shallowMount } from '@vue/test-utils';

describe("SignInButton.vue", () => {
    test('button click triggers login', () => {
        const methodMock = jest.spyOn(SignInButton.methods, 'login')
        const wrapper = shallowMount(SignInButton, {
            methods: {
                methodMock,
            }
        });
        wrapper.find('button').trigger('click');
        wrapper.vm.$nextTick();
        expect(methodMock).toBeCalled();
    })
});