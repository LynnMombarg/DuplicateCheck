// Authors: Diederik
// Jira-task: 114 - Authenticatie werkend krijgen, 162
// Sprint: 3
// Last modified: 23-05-2023

export async function signOut() {
    await fetch("auth/logout", {
        method: "POST",
    });
}