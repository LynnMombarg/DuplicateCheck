// Authors: Diederik
// Jira-task: 114 - Authenticatie werkend krijgen
// Sprint: 3
// Last modified: 15-05-2023

export async function signOut(token) {
    await fetch("http://localhost:8001/auth/logout", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        }
    });
}