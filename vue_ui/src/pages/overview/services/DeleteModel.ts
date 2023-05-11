// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 10-05-2023 

export async function deleteModel(modelId: string) {
	const response = await fetch(
    "http://localhost:8001/model?modelId=" + modelId,
    {
      method: "DELETE",
      headers: {
        Authorization: "test",
        "Content-Type": "application/json",
      },
    }
  );
	return await response.json();
  }
  
  
  // To retrieve models for example:
  // let models = await getData();
  // console.log(models[0]["modelName"]);