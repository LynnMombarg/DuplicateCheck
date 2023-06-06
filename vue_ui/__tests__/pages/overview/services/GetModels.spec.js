// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 02-06-2023

import { getModels } from "@/pages/overview/services/GetModels";
import fetchModelsMock from "@/__tests__/mocks/fetchModelsMock";

describe("GetModels", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetchModelsMock);
  });

  it("should return a model", async () => {
    const model = await getModels();
    expect(model).toEqual({
      name: "modelName",
      table_name: "tableName",
      description: "modelDescription",
    });
  });
});
