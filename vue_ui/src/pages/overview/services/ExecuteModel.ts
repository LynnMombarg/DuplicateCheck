// Authors: Lynn
// Jira-task: 172
// Sprint: 4
// Last modified: 25-05-2023

export async function executeModel(tableName: string, modelId: string, recordId1: string, recordId2: string) {
    const response = await fetch("model/execute", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tableName: tableName,
        modelId: modelId,
        recordId1: recordId1,
        recordId2: recordId2,
      }),
    });
    return await response.json();
}

// for testing purposes
// export async function executeModel(tableName: string, modelId: string, recordId1: string, recordId2: string) {
//   // Create a mock response object
//   const mockResponse = {
//     "percentage": "76",
//     "is_match": "true",
//   };
//   // Return the mock response
//   return mockResponse;
// }

