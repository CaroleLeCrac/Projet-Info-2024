export async function postAbsence(slotId, idStudents) {
    try {
        const response = await fetch(`http://localhost:3000/presence/many/${slotId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idStudents
            })
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du groupe");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi du groupe :", error);
    }
}

export async function getAbsenceByYear(year) {
    try {
        const response = await fetch(`http://localhost:3000/presence/by-year/${year}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

export async function getStudentsAbsenceByCourse(courseId) {
    try {
        const response = await fetch(`http://localhost:3000/student/presence/course/${courseId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

export async function getStudentAbsencesById(id) {
    try {
        const response = await fetch(`http://localhost:3000/course_material/presence/student/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

export async function deletePresences() {
    try {
        const response = await fetch(`http://localhost:3000/presence`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des inscriptions");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression des inscriptions:", error);
    }
}