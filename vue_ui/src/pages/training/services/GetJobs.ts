// Authors: Roward, Diederik
// Jira-task: 131 - Vue 3 - na klikken op "train model" jobs tonen, 162
// Sprint: 3
// Last modified: 23-05-2023

export async function getJobs(tableName: string) {
  const response = await fetch(`model/jobs?tableName=${tableName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
