// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 01-06-2023

export default function fetchRecordsMock(url) {
  const baseUrl = "http://localhost:8001/";
  const absoluteUrl = `${baseUrl}${url}`;

  return Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "modelName",
        table_name: "tableName",
        description: "modelDescription",
      }),
    text: () => Promise.resolve("text"),
  });
}
