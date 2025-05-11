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

export async function name(params) {

}

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

export async function name(params) {

}