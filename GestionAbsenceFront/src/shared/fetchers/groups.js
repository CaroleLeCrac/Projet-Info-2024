//Fonctions faisant appel aux endpoints du back-end pour gérer des données dans la table group

/**
 * Récupère tous les groupes de la base de données, ordonnés par semestre (du S1 au S6).
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} Une promesse contenant la liste des groupes classés par semestre.
 */
export async function getAllGroupsBySemester() {
    try {
        const response = await fetch(`http://localhost:3000/group/by-semester`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des groupes par semestre :', error);
    }
}

/**
 * Récupère un groupe à partir de son identifiant.
 *
 * @async
 * @function
 * @param {number} id - L'identifiant du groupe à récupérer.
 * @returns {Promise<Object>} Une promesse contenant les données du groupe.
 */
export async function getGroupById(id) {
    try {
        const response = await fetch(`http://localhost:3000/group/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement du groupe :', error);
    }
}

/**
 * Récupère tous les groupes dans lesquels un.e étudiant.e est inscrit.e.
 *
 * @async
 * @function
 * @param {number} id - L'identifiant de l'étudiant.e.
 * @returns {Promise<Object[]>} Une promesse contenant la liste des groupes de l'étudiant.e.
 */
export async function getGroupsByStudentId(id) {
    try {
        const response = await fetch(`http://localhost:3000/group/by-student/${id}`);
        const data = await response.json();
        return data.map(group => {
            if (group.inscription_group) {
                return {
                    ...group.inscription_group
                };
            }
        });
    } catch (error) {
        console.error('Erreur lors du chargement des groupes de l\'étudiant : ', error);
    }
}

/**
 * Récupère tous les groupes d'une année spécifique (1 pour L1, 2 pour L2, 3 pour L3).
 *
 * @async
 * @function
 * @param {number} year - L'année (1 = L1, 2 = L2, 3 = L3).
 * @returns {Promise<Object[]>} Une promesse contenant la liste des groupes correspondant à l'année.
 */
export async function getGroupByYear(year) {
    try {
        const response = await fetch(`http://localhost:3000/group/year/${year}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des groupes par année : ', error);
    }
}

/**
 * Crée un nouveau groupe dans la table group et l’associe à un semestre via son nom.
 *
 * @async
 * @function
 * @param {string} semester - Le nom du semestre (ex: "S1").
 * @param {string} name - Le nom du groupe à ajouter.
 * @returns {Promise<Object>} Une promesse contenant les données du groupe nouvellement créé.
 */
export async function postGroupWithSemesterName(semester, name) {
    try {
        const response = await fetch("http://localhost:3000/group/from-semester-name", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                semester_name: semester,
                name: name
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


/**
 * Supprime tous les groupes de la base de données.
 *
 * @async
 * @function
 * @returns {Promise<{ count: number }>} Une promesse vide une fois la suppression effectuée.
 */
export async function deleteGroups() {
    try {
        const response = await fetch(`http://localhost:3000/group`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des groupes");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression des groupes:", error);
    }
}