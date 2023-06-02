// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 02-06-2023

import { signOut } from "@/pages/overview/services/SignOut";
import fetchMock from "@/__tests__/mocks/fetchMock";

describe("SignOut", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetchMock);
  });

  it("should sign out", async () => {
    await signOut();
  });
});
