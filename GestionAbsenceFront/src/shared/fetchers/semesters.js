export async function getAllSemesters() {
    try {
        const response = await fetch(`http://localhost:3000/semester`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des semestres :', error);
    }
}

export async function getSemesterById(id) {
    try {
        const response = await fetch(`http://localhost:3000/semester/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading semester data:', error);
    }
}

export async function postSemester() {
    try {
        const response = await fetch("http://localhost:3000/semester/semesterfrom-ade", {
            method: "POST"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du semester");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi du semestre :", error);
    }
}

export async function deleteSemester() {
    try {
        const response = await fetch("http://localhost:3000/semester/all", {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de la suppression des semestres");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de la suppression des semestres :", error);
    }
}