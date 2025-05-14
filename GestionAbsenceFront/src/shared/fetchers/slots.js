export async function getSlots(date) {

}

export async function postSlot(groupId, courseName, sessionType, date) {
    try {
        const response = await fetch("http://localhost:3000/slot/by-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                groupId: groupId,
                courseName: courseName,
                sessionType: sessionType,
                date, date
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

export async function deleteSlots() {
    try {
        const response = await fetch(`http://localhost:3000/slot`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression des créneaux");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression des créneaux:", error);
    }
}