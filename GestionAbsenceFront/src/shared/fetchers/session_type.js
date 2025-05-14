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