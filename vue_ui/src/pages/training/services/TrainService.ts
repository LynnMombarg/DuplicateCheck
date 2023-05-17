// Authors: Marloes
// Jira-task: 132, 133, 134
// Sprint: 3
// Last modified: 17-05-2023

export async function selectJob(jobId, token) {
    console.log('Job selected');
    const response = await fetch("http://localhost:8001/training", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jobId: jobId,
        }),
    });
    return await response.text();
}

async function checkForRecords(trainingId, token) {
    console.log('Checked for records');
    const response = await fetch("http://localhost:8001//training/check-records/?trainingId=" + trainingId, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });
    return await response.text();
}

async function getRecords(trainingId, token) {
    if (await checkForRecords(trainingId, token)) {
        console.log('Fetched records');
        const response = await fetch("http://localhost:8001/training/records?trainingId=" + trainingId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } else {
        return null;
    }
}

export async function getMappedRecords(trainingId, token) {
    let mappedRecords = [];
    const records = await getRecords(trainingId, token);
    records.forEach()

    return records;
}

export async function giveAnswer(answer, trainingId, token) {
    console.log('Answered ' + answer);
    const response = await fetch("http://localhost:8001/training/give-answer", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            answer: answer,
            trainingId: trainingId,
        }),
    });
    return await response.json();
}

export async function saveTraining(trainingId, token) {
    console.log('Training saved');
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