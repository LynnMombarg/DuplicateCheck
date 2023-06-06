// Authors: Marloes, Diederik, Silke
// Jira-task: 132, 133, 134, 162, 166
// Sprint: 3
// Last modified: 23-05-2023

const jsonHeaders = 'application/json';
const notFoundCode = 404;

export async function selectJob(job: string, table: string, model: string) {
  const response = await fetch('training', {
    method: 'POST',
    headers: {
      'Content-Type': jsonHeaders,
    },
    body: JSON.stringify({
      jobId: job,
      tableName: table,
      modelId: model,
    }),
  });
  if (response.status === notFoundCode) {
    return null;
  }
  return response.text();
}

async function checkForRecords(trainingId: string) {
  const response = await fetch(
    `training/check-records/?trainingId=${trainingId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': jsonHeaders,
      },
    }
  );
  if (response.status === notFoundCode) {
    return false;
  }
  return response.text();
}

async function getRecords(trainingId: string) {
  if (await checkForRecords(trainingId)) {
    const response = await fetch(
      `training/records?trainingId=${trainingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': jsonHeaders,
        },
      }
    );
    return response.json();
  } else {
    return null;
  }
}

export async function getMappedRecords(trainingId: string) {
  const records = await getRecords(trainingId);
  if (records.records[0] === null) {
    return null;
  }

  let mappedRecords = [];
  for (let record of records.records) {
    let columns = [];
    let values = [];
    for (let key in record.data[0]) {
      if (key !== 'attributes') {
        columns.push(key);
        values.push(record.data[0][key]);
      }
    }
    mappedRecords.push({ columns, values });
  }
  return mappedRecords;
}

export async function giveAnswer(answerInput: boolean, id: string) {
  const response = await fetch('training/give-answer', {
    method: 'PUT',
    headers: {
      'Content-Type': jsonHeaders,
    },
    body: JSON.stringify({
      answer: answerInput,
      trainingId: id,
    }),
  });
  return response.json();
}

export async function saveTraining(model: string, training: string) {
  const response = await fetch('training/save', {
      method: 'PUT',
      headers: {
          'Content-Type': jsonHeaders,
      },
      body: JSON.stringify({
          modelId: model,
          trainingId: training,
      }),
  });
  return response.json();
}
