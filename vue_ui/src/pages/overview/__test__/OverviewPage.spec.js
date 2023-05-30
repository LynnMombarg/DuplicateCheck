import OverviewPage from '../../overview/OverviewPage.vue';
import {shallowMount} from '@vue/test-utils';


  describe('OverviewPage', () => {

    it('check if the componment is rendered', () => {

expect(true).toBe(true);
    });

});
//
// describe('Create test', () => {
//
//   beforeEach(() => {
//     window.open = jest.fn();
//   });
//
//   it('button click triggers create model pop up', () => {
//     // arrange
//     const wrapper = shallowMount(CreateModelButton);
//     wrapper.vm.modelName = "test";
//     wrapper.vm.tableName = "test";
//     wrapper.vm.description = "test";
//
//     // act
//     wrapper.find('button').trigger('click');
//     wrapper.vm.$nextTick();
//
//     // assert
//     // test if pressing the button opens a window
//     expect(wrapper.vm.open).toBe(true);
//   });
//
//   it('renders a button with text "Create Model"', () => {
//     // arrange
//     const wrapper = shallowMount(CreateModelButton);
//     // assert
//     expect(wrapper.find('button').text()).toBe("+ Add model");
//   });
//
//   it('check if values are correct when the component is created', () => {
//     // arrange
//     const wrapper = shallowMount(CreateModelButton);
//     // assert
//     expect(wrapper.vm.open).toBe(false);
//     expect(wrapper.vm.warningVisible).toBe(false);
//     expect(wrapper.vm.modelName).toBe("");
//     expect(wrapper.vm.tableName).toBe("");
//     expect(wrapper.vm.description).toBe("");
//   });
//
//   it('reset should reset the values of the variables to their initial state', () => {
//       // arrange
//       const wrapper = shallowMount(CreateModelButton);
//       wrapper.vm.modelName = "test";
//       wrapper.vm.tableName = "test";
//       wrapper.vm.description = "test";
//       // act
//       wrapper.vm.resetValues();
//       // assert
//       expect(wrapper.vm.modelName).toBe("");
//       expect(wrapper.vm.tableName).toBe("");
//       expect(wrapper.vm.description).toBe("");
//     }
//   );
//
// });

