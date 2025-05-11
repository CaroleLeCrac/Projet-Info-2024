export async function getAllGroupsBySemester() {
    try {
        const response = await fetch(`http://localhost:3000/group/by-semester`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des groupes par semestre :', error);
    }
}

export async function getGroupById(id) {
    try {
        const response = await fetch(`http://localhost:3000/group/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement du groupe :', error);
    }
}

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

export async function getGroupByYear(year) {
    try {
        const response = await fetch(`http://localhost:3000/group/year/${year}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des groupes par année : ', error);
    }
}

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