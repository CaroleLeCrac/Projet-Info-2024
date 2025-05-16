// Fonctions faisant appel aux endpoints du back-end pour gérer les données dans la table student

/**
 * Récupère la liste de tou.te.s les étudiant.e.s.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} Une promesse contenant la liste de tou.te.s les étudiant.e.s.
 */
export async function getAllStudents() {
    try {
        const response = await fetch('http://localhost:3000/student');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des étudiants:', error)
    }
}

/**
 * Récupère les étudiant.e.s d’un groupe spécifique.
 *
 * @async
 * @function
 * @param {number} id - L’identifiant du groupe.
 * @returns {Promise<Object[]>} Une promesse contenant les étudiant.e.s du groupe.
 */
export async function getStudentsByGroupId(id) {
    try {
        const response = await fetch(`http://localhost:3000/student/by-group/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des étudiants du groupe :', error);
    }
}

/**
 * Récupère les étudiant.e.s associé.e.s au semestre de la matière donnée.
 *
 * @async
 * @function
 * @param {number} courseId - L’identifiant de la matière.
 * @returns {Promise<Object[]>} Une promesse contenant les étudiant.e.s concerné.e.s.
 */
export async function getStudentsBySemesterCourse(courseId) {
    try {
        const response = await fetch(`http://localhost:3000/student/by-course_material/${courseId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des étudiants correspondants au semestre de la matière:', error)
    }
}

/**
 * Récupère les étudiant.e.s présent.e.s dans un autre groupe similaire au groupe fourni (groupe 1 ou 2 ou 3 du même semestre).
 * Dans le cas où pas de groupe similaire, récupère tou.te.s les étudiant.e.s non inscrit.e.s dans le groupe fourni.
 *
 * @async
 * @function
 * @param {number} id - L’identifiant du groupe.
 * @returns {Promise<Object[]>} Une promesse contenant les étudiant.e.s concerné.e.s.
 */
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

/**
 * Récupère les informations d’un.e étudiant.e à partir de son identifiant.
 *
 * @async
 * @function
 * @param {number} id - L’identifiant de l’étudiant.e.
 * @returns {Promise<Object>} Une promesse contenant les données de l’étudiant.e.
 */
export async function getStudentById(id) {
    try {
        const response = await fetch(`http://localhost:3000/student/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement de l\'étudiant:', error)
    }
}

/**
 * Envoie un fichier CSV contenant des étudiant.e.s à insérer dans la base de données.
 *
 * @async
 * @function
 * @param {File} fichier - Le fichier CSV contenant les étudiant.e.s.
 */
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

/**
 * Crée un.e nouvel.le étudiant.e dans la base de données.
 *
 * @async
 * @function
 * @param {string} student_number - Son numéro étudiant.
 * @param {string} name - Son nom et prénom.
 * @returns {Promise<Object>} Une promesse contenant les données de l’étudiant.e créé.e.
 */
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

/**
 * Met à jour les données d’un.e étudiant.e existant.e.
 *
 * @async
 * @function
 * @param {number} id - L’identifiant de l’étudiant.e.
 * @param {string} student_number - Le nouveau numéro étudiant.
 * @param {string} name - Le nouveau nom et prénom.
 */
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

/**
 * Supprime tou.te.s les étudiant.e.s de la table student.
 *
 * @async
 * @function
 * @returns {Promise<Object>} Une promesse contenant le nombre de lignes supprimées.
 */
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