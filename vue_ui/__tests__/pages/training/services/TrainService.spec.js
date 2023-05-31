// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 31-05-2023

import {
  getMappedRecords,
  giveAnswer,
  saveTraining,
  selectJob,
  getRecords,
} from "@/pages/training/services/TrainService";
import fetchRecordsMock from "@/__tests__/mocks/fetchRecordsMock";
import fetchJobsMock from "@/__tests__/mocks/fetchJobsMock";

describe("TrainService", () => {
  it("should return a list of mapped records", async () => {
    global.fetch = jest.fn().mockImplementation(fetchRecordsMock);
    const mappedRecords = await getMappedRecords("test");
    expect(mappedRecords).toEqual([
      {
        columns: ["key1", "key2"],
        values: ["value1", "value2"],
      },
    ]);
  });

  it("selects a job", async () => {
    global.fetch = jest.fn().mockImplementation(fetchJobsMock);
    const job = await selectJob("test", 1);
    expect(job).toEqual("text");
  });

  it("saves a training", async () => {
    global.fetch = jest.fn().mockImplementation(fetchJobsMock);
    const job = await saveTraining("test", 1);
    expect(job).toEqual([{ id: 1 }]);
  });

  it("gives an answer", async () => {
    global.fetch = jest.fn().mockImplementation(fetchJobsMock);
    const job = await giveAnswer("test", 1);
    expect(job).toEqual([{ id: 1 }]);
  });
});
