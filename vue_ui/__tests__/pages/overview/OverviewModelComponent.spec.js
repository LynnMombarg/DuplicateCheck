// Authors: Silke
// Jira-task: 145
// Sprint: 3
// Last modified: 31-05-2023

import { shallowMount } from "@vue/test-utils";
import OverviewModelComponent from "vue_ui/src/pages/overview/components/OverviewModelComponent.vue";

describe("ModelComponent", () => {
  const wrapper = shallowMount(OverviewModelComponent, {
    propsData: {
      model: {
        modelId: "1",
        tableName: "testTable",
        modelName: "test Model",
        modelDescription: "test Model Description",
      },
    },
  });

  it("select job body is initialised with the right values", () => {
    // Assert
    expect(wrapper.vm.model.tableName).toBe("testTable");
    expect(wrapper.vm.model.modelName).toBe("test Model");
    expect(wrapper.vm.model.modelDescription).toBe("test Model Description");
  });

  it("delete function should call delete on parent component", () => {
    // Arrange
    wrapper.vm.$parent.deleteModel = jest.fn();

    // Act
    wrapper.vm.deleteModel("testmodelId");

    // Assert
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$parent.deleteModel).toHaveBeenCalledWith(
        "testmodelId"
      );
    });
  });

  it("execute function should call execute on parent component", () => {
    // Arrange
    wrapper.vm.$parent.executeModel = jest.fn();

    // Act
    wrapper.vm.executeModel(
      "testtableName",
      "testmodelId",
      "testRecord1",
      "testRecord2"
    );

    // Assert
    expect(wrapper.vm.$parent.executeModel).toHaveBeenCalledWith(
      "testtableName",
      "testmodelId",
      "testRecord1",
      "testRecord2"
    );
  });

  it("Iscontacts() should return true if the table is contacts ", () => {
    // Arrange/Act
    const result = wrapper.vm.isContacts("contacts");
    // Assert
    expect(result).toBe(true);
  });

  it("Iscontacts() should return false if the table is not contacts ", () => {
    // Arrange/Act
    const result = wrapper.vm.isContacts("leads");
    // Assert
    expect(result).toBe(false);
  });

  it("IsLeads() should return true if the table is leads ", () => {
    // Arrange/Act
    const result = wrapper.vm.isLeads("leads");
    // Assert
    expect(result).toBe(true);
  });

  it("IsLeads() should return false if the table is not leads", () => {
    // Arrange/Act
    const result = wrapper.vm.isLeads("contacts");
    // Assert
    expect(result).toBe(false);
  });

  it("IsAccounts() should return true if the table is accounts ", () => {
    // Arrange/Act
    const result = wrapper.vm.isAccounts("accounts");
    // Assert
    expect(result).toBe(true);
  });

  it("IsAccounts() should return false if the table is not accounts ", () => {
    // Arrange/Act
    const result = wrapper.vm.isAccounts("contacts");
    // Assert
    expect(result).toBe(false);
  });
});
