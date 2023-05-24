import { shallowMount } from '@vue/test-utils';
import CreateModelButton from "../../overview/components/CreateModelButton.vue";
import { DialogTitle } from "@headlessui/vue";

describe("CreateModelButton.vue", () => {

  test('button click triggers create model pop up', () => {
    const methodMock = jest.spyOn(CreateModelButton.methods, 'createModel')
    const wrapper = shallowMount(CreateModelButton, {
      methods: {
        methodMock,
      }
    });
    wrapper.find('button').trigger('click');
    wrapper.vm.$nextTick();
    expect(methodMock).toBeCalled();
    expect(wrapper.vm.$data.open).toBe(true);
  })

  test('create model pop up is hidden by default', () => {
    const wrapper = shallowMount(CreateModelButton);
    // expect model pop up open to be false
    expect(wrapper.vm.$data.open).toBe(false);
  })

});