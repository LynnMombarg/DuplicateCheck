// Authors: Lynn, Silke
// Jira-task: 172, 194
// Sprint: 4
// Last modified: 5-06-2023

export async function executeModel(
  table: string,
  id: string,
  record1: string,
  record2: string
) {
  const response = await fetch('model/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableName: table,
      modelId: id,
      recordId1: record1,
      recordId2: record2,
    }),
  });
  return response.json();
}
