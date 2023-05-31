// Authors: Diederik
// Jira-task: 152
// Sprint: 4
// Last modified: 31-05-2023

export default function fetchJobsMock(url) {
    const baseUrl = "http://localhost:8001/";
    const absoluteUrl = `${baseUrl}${url}`;
  
    return Promise.resolve({
      json: () => Promise.resolve([
        { id: 1 },
      ]),
      text: () => Promise.resolve("text"),
    });
  }
  