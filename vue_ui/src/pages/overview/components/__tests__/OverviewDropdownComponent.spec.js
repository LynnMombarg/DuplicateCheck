// Authors: Lynn
// Jira-task: 144
// Sprint: 3
// Last modified: 23-05-2023

import OverviewDropdownComponent from '../../components/OverviewDropdownComponent.vue';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import TrainingPage from '../../../training/TrainingPage.vue'

describe("OverviewDropdownComponent.vue", () => {
    test('dropdown not visible when not clicked', () => {
        const wrapper = mount(OverviewDropdownComponent);
        expect(wrapper.find('MenuItems').exists()).toBe(false);
    })

    //Test fails because typescript syntax is not supported (error in getJobs.ts) + required files need to contain relative imports
    test('triggers router push after clicking on train model', async () => {
        const router =  createRouter({
            history: createWebHashHistory(),
            routes: [{
                path: '/training',
                name: 'TrainingPage',
                component: TrainingPage
            }]
        })

        router.push('training');
        await router.isReady();

        const wrapper = mount(OverviewDropdownComponent, {
            global: {
                plugins: [router]
            }
        })

        expect(wrapper.findComponent(TrainingPage).exists()).toBe(true);
    })

});