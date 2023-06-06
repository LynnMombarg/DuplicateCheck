// Authors: Roward, Diederik
// Jira-task: 105 - Models ophalen, 162
// Sprint: 2, 3
// Last modified: 23-05-2023

export async function getModels() {
  const response = await fetch('model/models', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
