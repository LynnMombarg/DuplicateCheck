// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 01-06-2023

import { createModel } from "@/pages/overview/services/CreateModel";
import fetchModelsMock from "@/__tests__/mocks/fetchModelsMock";

describe("CreateModel", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetchModelsMock);
  });

  it("should return a model", async () => {
    const model = await createModel(
      "modelName",
      "tableName",
      "modelDescription"
    );
    expect(model).toEqual({
      name: "modelName",
      table_name: "tableName",
      description: "modelDescription",
    });
  });
});
