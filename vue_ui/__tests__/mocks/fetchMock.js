// Authors: Diederik
// Jira-task: 149
// Sprint: 4
// Last modified: 02-06-2023

export default function fetchRecordsMock(url) {
    const baseUrl = "http://localhost:8001/";
    const absoluteUrl = `${baseUrl}${url}`;
  
    return Promise.resolve({
      json: () =>
        Promise.resolve({}),
      text: () => Promise.resolve("text"),
    });
  }
  