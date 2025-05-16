//Fonctions faisant appel aux endpoints du back-end pour gérer des données dans la table course_material

/**
 * Récupère toutes les matières depuis la base de données.
 * 
 * @async
 * @function
 * @returns {Promise<Object[]>} Une promesse contenant la liste des matières (lignes de la table course_material).
 */
export async function getAllCourses() {
    try {
        const response = await fetch('http://localhost:3000/course_material');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des matières:', error);
    }
}

/**
 * Récupère les matières liées au semestre de l'étudiant.e spécifié.e.
 * 
 * @async
 * @function
 * @param {number} studentId - L'identifiant de l'étudiant.e.
 * @returns {Promise<Object[]>} Une promesse contenant la liste des matières correspondant au semestre de l'étudiant.e.
 */
export async function getCoursesByStudent(studentId) {
    try {
        const response = await fetch(`http://localhost:3000/course_material/by-student/${studentId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des matières du semestre de l\'étudiant:', error);
    }
}

/**
 * Supprime toutes les matières de la table course_material.
 *
 * @async
 * @function
 * @returns {Promise<{ count: number }>} Une promesse contenant un objet avec le nombre de matières supprimées.
 */
export async function deleteCourseMaterial() {
    try {
        const response = await fetch("http://localhost:3000/course_material/all", {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des cours");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression des cours :", error);
    }
}