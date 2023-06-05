import { shallowMount } from '@vue/test-utils';
import OverviewPage from '../../../src/pages/overview/OverviewPage.vue';
import { getModels } from "@/pages/overview/services/GetModels";


// command to run this test only = npm test -- OverviewPage.spec.js
describe('OverviewPage tests', () => {
  let wrapper;


  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              models: [
                {
                  modelId: 1,
                  modelName: 'test',
                },
              ],
            },
          }),
      })
    );

    jest.spyOn(OverviewPage, 'mounted').mockImplementation(() => {});
    wrapper = shallowMount(OverviewPage);

  });


  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call the mounted hook', () => {
    expect(OverviewPage.mounted).toHaveBeenCalled();
  });

  it('should call the delete service and trigger a fetch', () => {
    wrapper.vm.deleteModel("test");
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should call the execute service and trigger a fetch', () => {
    wrapper.vm.executeModel("tableName", "modelId", "recordId1", "recordId2");
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should call the createModel service and trigger a fetch', () => {
    wrapper.vm.createModel("modelname", "tablename", "description");
    expect(global.fetch).toHaveBeenCalled();
  });

});
