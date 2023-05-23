// Authors: Roward
// Jira-task: 131 - Vue 3 - na klikken op "train model" jobs tonen
// Sprint: 3
// Last modified: 16-05-2023 

export async function getJobs(token: string, tableName) {
  const response = await fetch("http://localhost:8001/model/jobs?tableName=" + tableName, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}