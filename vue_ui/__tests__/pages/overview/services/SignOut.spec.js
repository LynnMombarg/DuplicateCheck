// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 02-06-2023

import { signOut } from "@/pages/overview/services/SignOut";

describe("SignOut", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({});
    });
  });

  it("should sign out", async () => {
    const response = await signOut();
    expect(response).toEqual({});
  });
});
