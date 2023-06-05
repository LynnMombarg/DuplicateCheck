// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 31-05-2023

import { getJobs } from "@/pages/training/services/GetJobs";
import fetchJobsMock from "@/__tests__/mocks/fetchJobsMock";

describe("GetJobs", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetchJobsMock);
  });

  it("should return a list of jobs", async () => {
    const jobs = await getJobs("test");
    expect(jobs).toEqual([
      {
        id: 1,
      },
    ]);
  });
});
