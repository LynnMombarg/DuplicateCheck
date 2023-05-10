// Authors: Marloes
// Jira-task: 106 - Front-end maken
// Sprint: 2
// Last modified: 08-05-2023

export async function handleRequest(modelName: string, tableName: string, description: string) {
    const response = await fetch("http://localhost:8001/model/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelName: modelName,
        tableName: tableName,
        description: description,
        token: "ee8612ad-8ad3-489b-9982-33c15a6cc0a4",
      }),
    });
    return await response.json();
}