// Authors: Marloes, Diederik
// Jira-task: 132, 133, 134, 162
// Sprint: 3
// Last modified: 23-05-2023

export async function selectJob(jobId, tableName) {
  const response = await fetch("training", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      tableName: tableName,
    }),
  });
  return await response.text();
}

async function checkForRecords(trainingId) {
  console.log(trainingId);
  const response = await fetch(
    "training/check-records/?trainingId=" + trainingId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.text();
}

async function getRecords(trainingId) {
  if (await checkForRecords(trainingId)) {
    const response = await fetch(
      "training/records?trainingId=" + trainingId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } else {
    console.log('Ik ben null');
    return null;
  }
}

export async function getMappedRecords(trainingId) {
  const records = await getRecords(trainingId);
  if (records.records[0] === null) {
    return null;
  }

  let mappedRecords = [];
  for (let i = 0; i < records.records.length; i++) {
    let columns = [];
    let values = [];
    for (let key in records.records[i].data[0]) {
      if (key !== "attributes") {
        columns.push(key);
        values.push(records.records[i].data[0][key]);
      }
    }
    mappedRecords.push({ columns, values });
  }
  return mappedRecords;
}

export async function giveAnswer(answer, trainingId) {
  const response = await fetch("training/give-answer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: answer,
      trainingId: trainingId,
    }),
  });
  return await response.json();
}

export async function saveTraining(modelId, trainingId) {
  const response = await fetch("training/save", {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          modelId: modelId,
          trainingId: trainingId,
      }),
  });
  return await response.json();
}
