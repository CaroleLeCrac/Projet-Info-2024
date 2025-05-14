/*import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { parseStringPromise } from 'xml2js';

const app = express();
const PORT = 3001;

app.use(cors());

// Fonction pour récupérer la session ID
async function getSessionId() {
    const response = await fetch('lienADE');
    const xmlText = await response.text();
    const json = await parseStringPromise(xmlText);
    return json.session.$.id;
}

app.get('/api/recupMatieres', async (req, res) => {
    try {
        const sessionId = await getSessionId();

        // Fixer le projet
        await fetch(`lienADEsessionId=${sessionId}&function=setProject&projectId=8`);

        const activitiesResponse = await fetch(`lienADEsessionId=${sessionId}&function=getActivities&tree=TRUE`);
        const activitiesXml = await activitiesResponse.text();
        const activitiesData = await parseStringPromise(activitiesXml);

        const uniqueActivities = []; // tableau sans les doublons des matieres
        const seenMatieres = new Set();
        const activities = [];

        function parcourirFolder(folder, context = {}) {
            const name = folder.$?.name || '';
            const newContext = { ...context };

            // Détection L1/L2/L3
            const niveauMatch = name.match(/\bL[1-3]\b MIASHS/i);
            if (niveauMatch) {
                newContext.niveau = niveauMatch[0].match(/L[1-3]/)[0];
            }

            // semestre
            if (/Semestre/i.test(name)) {
                const match = name.match(/\d+/);
                if (match) {
                    newContext.semestre = match[0].toString();
                }
            }

            // Nom de la matière
            if (
                newContext.niveau &&
                !/Semestre/i.test(name) &&
                !/L[1-3] MIASHS/i.test(name) &&
                !/^UE\b/i.test(name) &&
                !/\b(CM|TD|TP|TM)\b/i.test(name)
            ) {
                newContext.matiereName = name;
            }

            // Type : CM, TD, TP, TM
            const typeMatch = name.match(/\b(CM|TD|TP|TM)\b/i);
            if (typeMatch) {
                newContext.type = typeMatch[1].toUpperCase();
            }

            if (folder.activity) {
                folder.activity.forEach(activity => {
                    if (newContext.semestre != null || newContext.type != null || newContext.matiereName != null) {
                        activities.push({
                            semestre: newContext.semestre || null,
                            type: newContext.type || null,
                            name: newContext.matiereName || null,
                        });
                    }
                });
            }

            // Parcours récursif
            if (folder.folder) {
                folder.folder.forEach(subFolder => parcourirFolder(subFolder, newContext));
            }
        }

        if (activitiesData.treeActivities?.folder) {
            activitiesData.treeActivities.folder.forEach(folder => parcourirFolder(folder));
        }

        //trie les doublons
        activities.forEach(activity => {
            const key = activity.name + "_" + activity.semestre + "_" + activity.type; //en fonction de semestre, nom de la matiere et type
            if (!seenMatieres.has(key)) {
                seenMatieres.add(key);
                uniqueActivities.push(activity);
            }
        });

        res.json(uniqueActivities);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/api/creneaux', async (req, res) => {
    try {
        const sessionId = await getSessionId();

        // Fixer le projet
        await fetch(`lienADEsessionId=${sessionId}&function=setProject&projectId=8`);

        // Récup des matières
        const activitiesResponse = await fetch(`lienADEsessionId=${sessionId}&function=getActivities&tree=TRUE`);
        const activitiesXml = await activitiesResponse.text();
        const activitiesData = await parseStringPromise(activitiesXml);
        const activities = [];

        function parcourirFolder(folder, context = {}) {
            const name = folder.$?.name || '';
            const newContext = { ...context };

            const niveauMatch = name.match(/\bL[1-3]\b MIASHS/i);
            if (niveauMatch) {
                newContext.niveau = niveauMatch[0].match(/L[1-3]/)[0];
            }

            if (/Semestre/i.test(name)) {
                const match = name.match(/\d+/);
                if (match) {
                    newContext.semestre = parseInt(match[0], 10);
                }
            }

            if (
                newContext.niveau &&
                !/Semestre/i.test(name) &&
                !/L[1-3] MIASHS/i.test(name) &&
                !/^UE\b/i.test(name) &&
                !/\b(CM|TD|TP|TM)\b/i.test(name)
            ) {
                newContext.matiereName = name;
            }

            const typeMatch = name.match(/\b(CM|TD|TP|TM)\b/i);
            if (typeMatch) {
                newContext.type = typeMatch[1].toUpperCase();
            }


            if (folder.activity) {
                folder.activity.forEach(activity => {
                    activities.push({
                        activity_id: activity.$.id,
                        type: newContext.type || null,
                        name: newContext.matiereName || null,
                    });
                });
            }


            if (folder.folder) {
                folder.folder.forEach(subFolder => parcourirFolder(subFolder, newContext));
            }
        }

        if (activitiesData.treeActivities?.folder) {
            activitiesData.treeActivities.folder.forEach(folder => parcourirFolder(folder));
        }

        // Récupère la date passée dans la requête du calendrier de slotpage.vue
        const queryDate = req.query.date;

        if (!queryDate || !/^\d{4}-\d{2}-\d{2}$/.test(queryDate)) {
            return res.status(400).json({ error: 'Date manquante ou au format invalide. Format attendu: YYYY-MM-DD' });
        }

        const [year, month, day] = queryDate.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day); //-1 car janvier = 0, fevrier=1 ...  dans JS

        // le format attendu par l’API ADE est "MM/dd/yyyy"
        const formattedString = `${(month).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

        const eventsResponse = await fetch(`lienADEsessionId=${sessionId}&function=getEvents&date=${formattedString}`);
        const eventsXml = await eventsResponse.text();
        const eventsData = await parseStringPromise(eventsXml);

        const events = [];

        if (eventsData.events?.event) {
            for (const event of eventsData.events.event) {
                const activityId = event.$.activityId;

                const matiere = activities.find(a => a.activity_id === activityId);
                if (matiere) {
                    events.push({
                        matiere_name: matiere.name,
                        type: matiere.type,
                        date: queryDate
                    });
                }
            }
        }

        res.json(events);

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }
});

export async function getAllSlots(date) {
    try {
        const response = await fetch(`http://localhost:3001/api/creneaux?date=${date}`)

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des créneaux du jour');
        }
        const data = await response.json();
        courses.value = data;
    } catch (error) {
        console.error('Erreur lors de la récupération des créneaux du jour :', error);
    }

}

export function refreshADEGetAndPost() {
    fetch('http://localhost:3001/api/recupMatieres')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de ADE');
            }
            return response.json();
        })
        .then(async (uniqueActivities) => {
            // 1. Extraire les semestres uniques
            const semesters = [...new Set(
                uniqueActivities
                    .filter(item => item.semestre)
                    .map(item => `S${item.semestre}`)
            )].map(name => ({ semestre: name }));

            console.log("Semesters envoyés au backend:", semesters);

            // 2. Envoyer les semestres au backend
            const postResponseSemester = await fetch('http://localhost:3000/semester/semesterfrom-ade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(semesters),
            });

            if (!postResponseSemester.ok) {
                const errorText = await postResponseSemester.text();
                console.error('Erreur backend:', errorText);
                throw new Error('Erreur lors de l’envoi des données semestre au back');
            }

            const createdSemesters = await postResponseSemester.json();

            console.log("semesters avec id", createdSemesters);
            const seen = new Set();
            const courseMaterialsWithId = uniqueActivities
                .filter(item => item.name && item.semestre)
                .map(item => {
                    const semesterName = `S${item.semestre}`;
                    const semester = createdSemesters.find(s => s.name === semesterName);
                    return {
                        name: item.name,
                        semester_id: semester ? semester.id : null
                    };
                })
                .filter(item => {
                    const key = `${item.name}-${item.semester_id}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });

            console.log("Matieres envoyés au backend:", courseMaterialsWithId);

            // 4. Envoyer les matières avec l'ID du semestre au backend
            const postResponseCourseMaterial = await fetch('http://localhost:3000/course_material/course_materialfrom-ade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseMaterialsWithId)
            });

            if (!postResponseCourseMaterial.ok) {
                const errorText = await postResponseCourseMaterial.text();
                console.error('Erreur backend:', errorText);
                throw new Error('Erreur lors de l’envoi des données coursename au back');
            }
            const createdCourseMaterials = await postResponseCourseMaterial.json();
            console.log("coursematerials avec id", createdCourseMaterials);

            // 5. Extraire les types de session et les associer à la bonne matière via courseMaterialId
            const sessionTypesWithId = uniqueActivities
                .filter(item => item.type && item.name)
                .map((item) => {
                    const matchedCourse = createdCourseMaterials.find(c => c.name === item.name);
                    return {
                        course_type_name: item.type,
                        course_material_id: matchedCourse?.id  // Associer le type de session à l'ID de la matière correspondante
                    };
                });

            console.log("session_type envoyés au backend:", sessionTypesWithId);

            // 6. Envoyer les types de session avec l'ID de la matière au backend
            const postResponseSessionType = await fetch('http://localhost:3000/session_type/session_typefrom-ade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionTypesWithId)
            });

            if (!postResponseSessionType.ok) {
                const errorText = await postResponseSessionType.text();
                console.error('Erreur backend:', errorText);
                throw new Error('Erreur lors de l’envoi des données sessiontype au back');
            }

            // Utilise postResponseSessionType au lieu de postResponseCourseMaterial
            const createdSessionTypes = await postResponseSessionType.json();
            console.log("Session types avec id", createdSessionTypes);

            console.log('Données envoyées avec succès');
        })
}

app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
*/