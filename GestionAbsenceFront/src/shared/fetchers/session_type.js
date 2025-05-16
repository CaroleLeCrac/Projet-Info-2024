// Fonctions faisant appel aux endpoints du back-end pour gérer les données de la table session_type

/**
 * Met à jour les données issues d'ADE (semestres, matières et types de séance).
 * 
 * @async
 * @function
 * @returns {Promise<Object>} Une promesse contenant un objet avec les statistiques de mise à jour (nombre d’éléments ajoutés).
 */
export async function refreshDataADE() {
    try {
        const response = await fetch("http://localhost:3000/ade/refresh", {
            method: "POST"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour des données issues d'ADE");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données issues d'ADE")
    }
}

/**
 * Supprime tous les types de session présents dans la table session_type.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} Une promesse contenant le nombre de lignes supprimées.
 */
export async function deleteSessionType() {
    try {
        const response = await fetch("http://localhost:3000/session_type/all", {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des types de session");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression des types de session :", error);
    }
}