// Authors: Roward
// Jira-task: 105 - Models ophalen
// Sprint: 2
// Last modified: 08-05-2023 

export async function getData() {
  const response = await fetch("http://localhost:8001/model/models", {
    method: "GET",
    headers: {
      Authorization: "test",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}


// To retrieve models for example:
// let models = await getData();
// console.log(models[0]["modelName"]);