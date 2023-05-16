// Authors: Marloes
// Jira-task: 132
// Sprint: 3
// Last modified: 16-05-2023

const records = [
    [
        {
            columns: ['1', '2', '3'],
            values: ['First', 'Second', 'Third'],
        },
        {
            columns: ['1', '2', '3'],
            values: ['First', 'Second', 'Tird'],
        }
    ],
    [
        {
            columns: ['A', 'B', 'C', 'D'],
            values: ['!', '@', '#', '$'],
        },
        {
            columns: ['A', 'B', 'C', 'E'],
            values: ['!', '@', '#', '$'],
        }
    ],
    [
        {
            columns: ['a', 'b', 'c', 'D'],
            values: ['aefgfhj', 'dfcgbvbn', 'erefgh', 'kjhyg'],
        },
        {
            columns: ['a', 'B', 'c', 'd'],
            values: ['asdfdg', 'htre', 'dfshda', 'aaagagga'],
        }
    ],
];

export function selectJob(jobId, token) {
    return 0;
}

function checkForRecords(trainingId, token) {
    return trainingId < records.length;

    // const response = await fetch("http://localhost:8001//training/check-records/" + trainingId, {
    //     method: "GET",
    //     headers: {
    //         Authorization: "Bearer " + token,
    //         "Content-Type": "application/json",
    //     },
    // });
    // return await response.json();
}

export function getRecords(trainingId, token) {
    if (checkForRecords(trainingId, token)) {
        return records[trainingId];

        // const response = await fetch("http://localhost:8001/training/records/" + trainingId, {
        //     method: "GET",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //     },
        // });
        // return await response.json();
    } else {
        saveTraining(trainingId, token);
    }
}

export async function giveAnswer(answer, trainingId, token) {
    console.log('Answered: ' + answer);

    // const response = await fetch("http://localhost:8001/training/give-answer", {
    //     method: "POST",
    //     headers: {
    //         Authorization: "Bearer " + token,
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         answer: answer,
    //         trainingId: trainingId,
    //     }),
    // });
    // return await response.json();
}

function saveTraining(trainingId, token) {
    console.log('Training completed');

    // const response = await fetch("http://localhost:8001/training/?", {
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