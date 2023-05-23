import {mount, VueWrapper} from '@vue/test-utils';
import TrainingPage from '@/pages/training/TrainingPage.vue';

describe('TrainingPage.vue', () => {
        let wrapper: VueWrapper<any>;

        beforeEach(() => {
            wrapper = mount(TrainingPage);
        });

        it('renders the component', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    }
);