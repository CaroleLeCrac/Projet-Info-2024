//Fonctions faisant appel aux endpoints du back-end pour gérer des données dans la table inscription

/**
 * Crée l'inscription d'un.e étudiant.e dans un groupe donné.
 *
 * @async
 * @function
 * @param {number} studentId - L'identifiant de l'étudiant.e.
 * @param {number} groupId - L'identifiant du groupe.
 * @returns {Promise<Object>} Une promesse contenant les données de l'inscription créée.
 */
export async function postInscription(studentId, groupId) {
    try {
        const response = await fetch("http://localhost:3000/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_id: studentId,
                group_id: groupId
            })
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'inscription");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'inscription :", error);
    }
}

/**
 * Crée les inscriptions de plusieurs étudiant.e.s via un fichier CSV, pour un groupe donné.
 *
 * @async
 * @function
 * @param {number} groupId - L'identifiant du groupe.
 * @param {File} fichier - Le fichier CSV contenant les données des inscriptions.
 * @returns {Promise<Object[]>} Une promesse contenant les données des inscriptions créées.
 */
export async function postInscriptionsCSV(groupId, fichier) {
    const formData = new FormData();
    formData.append("fileInscription", fichier);

    try {
        const response = await fetch(`http://localhost:3000/csv/upload/inscription/${groupId}`, {
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
 * Met à jour l'inscription d’un.e étudiant.e en supprimant l’inscription existante (ancien groupe)
 * et en en créant une nouvelle (nouveau groupe).
 * 
 * @async
 * @function
 * @param {number} studentId - L'identifiant de l'étudiant.e.
 * @param {number} olgGroupId - L'identifiant de l'ancien groupe.
 * @param {number} newGroupId - L'identifiant du nouveau groupe.
 * @returns {Promise<Object>} Une promesse contenant les deux inscriptions : celle supprimée et celle créée.
 */
export async function putInscriptionAndDeleteOldInscription(studentId, olgGroupId, newGroupId) {
    try {
        const response = await fetch(`http://localhost:3000/inscription/${studentId}/${olgGroupId}/${newGroupId}`, {
            method: "PUT"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'inscription");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'inscription :", error);
    }
}

/**
 * Supprime toutes les inscriptions d'un.e étudiant.e.
 * Et crée ses inscriptions aux groupes donnés.
 *
 * @async
 * @function
 * @param {number} studentId - L'identifiant de l'étudiant.e.
 * @param {number[]} groupsId - Liste des identifiants des groupes à inscrire.
 * @returns {Promise<Object>} Une promesse contenant le nombre de suppressions et d'ajouts effectués.
 */
export async function putManyInscriptions(studentId, groupsId) {
    try {
        const response = await fetch(`http://localhost:3000/inscription/many/${studentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupsId)
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'inscription");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'inscription :", error);
    }
}

/**
 * Supprime une inscription spécifique (étudiant.e + groupe).
 *
 * @async
 * @function
 * @param {number} studentId - L'identifiant de l'étudiant.e.
 * @param {number} groupId - L'identifiant du groupe.
 * @returns {Promise<void>} Une promesse vide une fois la suppression effectuée.
 */
export async function deleteInscriptionById(studentId, groupId) {
    try {
        const response = await fetch(`http://localhost:3000/inscription/${studentId}/${groupId}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de l'inscription");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'inscription:", error);
    }
}

/**
 * Supprime toutes les inscriptions de la base de données.
 *
 * @async
 * @function
 * @returns {Promise<{ count: number }>} Une promesse contenant un objet avec le nombre d'inscriptions supprimées.
 */
export async function deleteInscriptions() {
    try {
        const response = await fetch(`http://localhost:3000/inscription`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des inscriptions");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression des inscriptions:", error);
    }
}