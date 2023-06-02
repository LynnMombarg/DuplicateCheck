// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 02-06-2023

import { executeModel } from "@/pages/overview/services/ExecuteModel";
import fetchModelsMock from "@/__tests__/mocks/fetchModelsMock";

describe("ExecuteModel", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetchModelsMock);
  });

  it("should return a model", async () => {
    const model = await executeModel("tableName", "modelId", "recordId1", "recordId2");
    expect(model).toEqual({
      name: "modelName",
      table_name: "tableName",
      description: "modelDescription",
    });
  });
});
