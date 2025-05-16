// Fonctions faisant appel aux endpoints du back-end pour gérer des données dans la table semester

/**
 * Récupère tous les semestres dans la base de données.
 * 
 * @async
 * @function
 * @returns {Promise<Object[]>} Une promesse contenant la liste des semestres.
 */
export async function getAllSemesters() {
    try {
        const response = await fetch(`http://localhost:3000/semester`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des semestres :', error);
    }
}

/**
 * Récupère un semestre spécifique via son identifiant.
 * 
 * @async
 * @function
 * @param {number} id - L'identifiant du semestre.
 * @returns {Promise<Object>} Une promesse contenant les données du semestre correspondant.
 */
export async function getSemesterById(id) {
    try {
        const response = await fetch(`http://localhost:3000/semester/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading semester data:', error);
    }
}

/**
 * Supprime tous les semestres de la base de données.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} Une promesse contenant le nombre de lignes supprimées.
 */
export async function deleteSemester() {
    try {
        const response = await fetch("http://localhost:3000/semester/all", {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des semestres");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression des semestres :", error);
    }
}