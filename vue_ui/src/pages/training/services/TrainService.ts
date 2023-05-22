// Authors: Marloes
// Jira-task: 132, 133, 134
// Sprint: 3
// Last modified: 17-05-2023

export async function selectJob(jobId, tableName, token) {
  const response = await fetch("http://localhost:8001/training", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      tableName: tableName,
    }),
  });
  return await response.text();
}

async function checkForRecords(trainingId, token) {
  console.log(trainingId);
  const response = await fetch(
    "http://localhost:8001/training/check-records/?trainingId=" + trainingId,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );
  return await response.text();
}

async function getRecords(trainingId, token) {
  if (await checkForRecords(trainingId, token)) {
    const response = await fetch(
      "http://localhost:8001/training/records?trainingId=" + trainingId,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
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

export async function getMappedRecords(trainingId, token) {
  const records = await getRecords(trainingId, token);
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

export async function giveAnswer(answer, trainingId, token) {
  const response = await fetch("http://localhost:8001/training/give-answer", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: answer,
      trainingId: trainingId,
    }),
  });
  return await response.json();
}

export async function saveTraining(trainingId, token) {
  // const response = await fetch("http://localhost:8001/training/save", {
  //     method: "POST",
  //     headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //         trainingId: trainingId,
  //     }),
  // });
  // return await response.json();
}
