export async function getAllCourses() {
    try {
        const response = await fetch('http://localhost:3000/course_material');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de chargement des matières:', error);
    }
}

export async function postCourseMaterial() {
    try {
        const response = await fetch("http://localhost:3000/session_type/session_typefrom-ade", {
            method: "POST"
        })
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'inscription");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'inscription :", error);
    }
}

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