import express from 'express';
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

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});