export async function getStudentsByGroupId(id) {
    try {
        const response = await fetch(`http://localhost:3000/student/by-group/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des étudiants du groupe :', error);
    }
}

export async function getAllStudents() {
    try {
        const response = await fetch('http://localhost:3000/student');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des étudiants:', error)
    }
}

export async function getStudentById(id) {
    try {
        const response = await fetch(`http://localhost:3000/student/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement de l\'étudiant:', error)
    }
}

export async function getStudentsSameOtherGroup(id) {
    try {
        const response = await fetch(`http://localhost:3000/student/same-other-group/${id}`);
        const data = await response.json();
        return data.map(student => {
            if (student.inscription_student && student.inscription_group) {
                return {
                    ...student.inscription_student,
                    originalGroupName: student.inscription_group.name,
                    originalGroupId: student.inscription_group.id
                };
            }
            return student.inscription_student || student;
        });
    } catch (error) {
        console.error('Erreur de chargement des étudiants extérieurs au groupe :', error)
    }
}

export async function postStudentsCSV(fichier) {
    const formData = new FormData();
    formData.append("fileStudent", fichier);

    try {
        const response = await fetch('http://localhost:3000/csv/upload/student', {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi des étudiants");
        }
        console.log("Fichier envoyé avec succès");
    } catch (error) {
        console.error("Erreur lors de l'envoi des étudiants :", error);
    }
}

export async function postStudent(student_number, name) {
    try {
        const response = await fetch(`http://localhost:3000/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_number: student_number,
                name: name
            })
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de l'étudiant");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'étudiant:", error);
    }
}

export async function putStudentById(id, student_number, name) {
    try {
        const response = await fetch(`http://localhost:3000/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_number: student_number,
                name: name
            })
        })
        if (!response.ok) {
            throw new Error("Erreur lors des changements des données de l'étudiant");
        }
    } catch (error) {
        console.error("Erreur lors des changements des données de l'étudiant:", error);
    }
}

export async function deleteStudents() {
    try {
        const response = await fetch(`http://localhost:3000/student`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des étudiants");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression des étudiants:", error);
    }
}