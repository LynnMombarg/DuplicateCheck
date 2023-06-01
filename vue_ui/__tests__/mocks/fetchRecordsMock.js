// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 31-05-2023

export default function fetchRecordsMock(url) {
  const baseUrl = "http://localhost:8001/";
  const absoluteUrl = `${baseUrl}${url}`;

  return Promise.resolve({
    json: () =>
      Promise.resolve({
        records: [
          {
            data: [
              { key1: "value1", key2: "value2" },
              { key1: "value3", key2: "value4" },
            ],
          },
        ],
      }),
    text: () => Promise.resolve("text"),
  });
}
