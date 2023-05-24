import { shallowMount } from '@vue/test-utils';
import OverviewPage from '../OverviewPage.vue'; // import doesn't work during test
//const OverviewPage = require('./OverviewPage.vue');

describe('overviewpage', () => {

  it('renders correctly without errors', () => {
    const wrapper = shallowMount(OverviewPage);
    expect(wrapper.exists()).toBe(true);
    expect(true).toBe(true);
  });

}
);