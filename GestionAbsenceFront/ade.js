import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { parseStringPromise } from 'xml2js';

const app = express();
const PORT = 3001;

app.use(cors());

// Fonction pour récupérer la session ID
async function getSessionId() {
    const response = await fetch('https://lien_ADE');
    const xmlText = await response.text();
    const json = await parseStringPromise(xmlText);
    return json.session.$.id;
}

app.get('/api/recupMatieres', async (req, res) => {
    try {
        const sessionId = await getSessionId();

        // Fixer le projet
        await fetch(`https://lien_ADEsessionId=${sessionId}&function=setProject&projectId=8`);

        const activitiesResponse = await fetch(`https://lien_ADEsessionId=${sessionId}&function=getActivities&tree=TRUE`);
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
                    newContext.semestre = parseInt(match[0], 10);
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

            // Ajout des activités
            if (folder.activity) {
                folder.activity.forEach(activity => {
                    activities.push({
                        semestre: newContext.semestre || null,
                        type: newContext.type || null,
                        name: newContext.matiereName || null,
                    });
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
        await fetch(`https://lien_ADEsessionId=${sessionId}&function=setProject&projectId=8`);

        // Récup des matières
        const activitiesResponse = await fetch(`https://lien_ADEsessionId=${sessionId}&function=getActivities&tree=TRUE`);
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

        const eventsResponse = await fetch(`https://lien_ADEsessionId=${sessionId}&function=getEvents&date=${formattedString}`);
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

app.listen(3001, () => {
    console.log('Serveur lancé sur http://localhost:3001');
});

/*
fetch('http://localhost:3000/api/creneaux') //requete get les donnees "events"
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la recuperation des donnees de ADE');
        }
        return response.json();
    })
    .then(async (events) => {

        const postResponse = await fetch('http://localhost:3000/api/slot/from-ade', { // envoie mes donnees recuperes vers backend api/slot/from-ade
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(events)
        });

        //id int autoincrementer, group id je ne men occupe pas, session type id, date, name

        if (!postResponse.ok) {
            throw new Error('Erreur lors de lenvoi des donnees creneaux au back');
        }

        console.log('Donnees envoyes avec succes');
    })
    .catch(error => {
        console.error('Erreur:', error);
    });


fetch('http://localhost:3000/api/recupMatieres') //requete get les donnees "uniqueActivities"
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la recuperation des donnees de ADE');
        }
        return response.json();
    })
    .then(async (uniqueActivities) => {

        //envoie seulement type matieres
        const postResponseSessiontype = await fetch('http://localhost:3000/api/session-type/from-ade', { // envoie mes donnees recuperes vers backend api/sessiontype/from-ade
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uniqueActivities)
        });
        if (!postResponseSessiontype.ok) {
            throw new Error('Erreur lors de lenvoi des donnees sessionstype au back');
        }

        //envoie seulement noms de matieres 
        const postResponseCourseName = await fetch('http://localhost:3000/api/courseName/from-ade', { // envoie mes donnees recuperes vers backend api/courseName/from-ade
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uniqueActivities)
        });
        if (!postResponseCourseName.ok) {
            throw new Error('Erreur lors de lenvoi des donnees coursename au back');
        }

        //envoie seulement semestre
        const postResponseSemester = await fetch('http://localhost:3000/api/semester/from-ade', { // envoie mes donnees recuperes vers backend api/smeester/from-ade
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uniqueActivities)
        });
        if (!postResponseSemester.ok) {
            throw new Error('Erreur lors de lenvoi des donnees semestre au back');
        }

        console.log('Donnees envoyes avec succes');
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
*/
/*
//les 6 semestres
const semesters = [...new Set(uniqueActivities.map(a => a.semester))].map((name, index) => ({
    name
}));

//le nom des matieres
const courseMaterials = uniqueActivities.map((a, index) => {
    //trouve le lien avec les semestres
    const semester = semesters.find(s => s.name === a.semester);
    return {
        name: a.name,
        semester_id: semester.id
    };
});

//le type de matiere
const sessionTypes = uniqueActivities.map((a, index) => {
    //lies au type et semestre assoscies
    const course = courseMaterials.find(c => c.name === a.name && semesters[c.semester_id - 1].name === a.semester);
    return {
        name: a.type,
        coursematerial_id: course.id
    };
});

console.log("Semesters:", semesters);
console.log("CourseMaterials:", courseMaterials);
console.log("SessionTypes:", sessionTypes);
console.log("Slots:", slots);

const res1 = await fetch('/api/semester/from-ade', { method: 'PUT', headers, body: JSON.stringify(semesters) }); //envoie les donnes des semestres au back
const res2 = await fetch('/api/courseMaterial/from-ade', { method: 'PUT', headers, body: JSON.stringify(courseMaterials) }); //envoie les noms de matieres au back
const res3 = await fetch('/api/session-type/from-ade', { method: 'PUT', headers, body: JSON.stringify(sessionTypes) }); //envoie les donnees des types de matieres au back

const result1 = await res1.json();
const result2 = await res2.json();
const result3 = await res3.json();
console.log("Response semester:", result1);
console.log("Response: nom de matieres", result2);
console.log("Response: type de matieres", result3);
*/