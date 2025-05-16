//Fonctions faisant appel aux endpoints du back-end pour gérer des données dans la table presence

/**
 * Récupère toutes les absences pour une année donnée.
 *
 * @async
 * @function
 * @param {number} year - L’année (1 pour L1, 2 pour L2, 3 pour L3).
 * @returns {Promise<Object[]>} Une promesse contenant la liste des absences pour l’année donnée.
 */
export async function getAbsenceByYear(year) {
    try {
        const response = await fetch(`http://localhost:3000/presence/by-year/${year}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

/**
 * Récupère la liste des étudiant.e.s absent.e.s pour une matière donnée.
 *
 * @async
 * @function
 * @param {number} courseId - L'identifiant de la matière.
 * @returns {Promise<Object[]>} Une promesse contenant les étudiant.e.s absent.e.s pour cette matières.
 */
export async function getStudentsAbsenceByCourse(courseId) {
    try {
        const response = await fetch(`http://localhost:3000/student/presence/course/${courseId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

/**
 * Récupère toutes les absences d’un.e étudiant.e via son identifiant.
 *
 * @async
 * @function
 * @param {number} id - L’identifiant de l’étudiant.e.
 * @returns {Promise<Object[]>} Une promesse contenant la liste des absences de l’étudiant.e.
 */
export async function getStudentAbsencesById(id) {
    try {
        const response = await fetch(`http://localhost:3000/course_material/presence/student/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des absences : ", error);
    }
}

/**
 * Envoie une liste d’absences pour un créneau donné.
 *
 * @async
 * @function
 * @param {number} slotId - L'identifiant du créneau (slot).
 * @param {number[]} idStudents - Tableau d'identifiants des étudiant.e.s absent.e.s.
 * @returns {Promise<Object>} Une promesse contenant les absences ajoutées dans la base de données.
 */
export async function postAbsence(slotId, idStudents) {
    try {
        const response = await fetch(`http://localhost:3000/presence/many/${slotId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                idStudents
            )
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du groupe");
        }
        const text = await response.text();
        if (text) {
            return JSON.parse(text);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du groupe :", error);
    }
}

/**
 * Supprime toutes les absences dans la table presence de la base de données.
 *
 * @async
 * @function
 * @returns {Promise<Object>} Une promesse contenant le nombre de lignes supprimées.
*/
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