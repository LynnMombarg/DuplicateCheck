// Authors: Marloes, Diederik
// Jira-task: 106 - Front-end maken, 162
// Sprint: 2, 3
// Last modified: 23-05-2023

export async function createModel(modelName: string, tableName: string, description: string) {
    const response = await fetch("model/create", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        modelName: modelName,
        tableName: tableName,
        modelDescription: description,
      }),
    });
    return await response.json();
}