// Authors: Roward, Diederik
// Jira-task: 110 - Models verwijderen uit database, 162
// Sprint: 2, 3
// Last modified: 23-05-2023

export async function deleteModel(modelId: string) {
    const response = await fetch(
    'model?modelId=' + modelId,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
	return response.json();
  }
