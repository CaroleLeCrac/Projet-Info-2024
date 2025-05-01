import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { parseStringPromise } from 'xml2js';


const app = express();
const PORT = 3001;


app.use(cors());


// Fonction pour récupérer la session ID
async function getSessionId() {
   const response = await fetch('https://ade-uga-info-ro.grenet.fr/jsp/webapi?data=d492b20c0c7f48f27fcf0491e9607cfd0aceb141e80ec5a2743c822702d89226b802c20c0bac3aa39dac749c7a5ea85dc58e26c66dcf6a0d4cf9b27b6336cb66,1');
   const xmlText = await response.text();
   const json = await parseStringPromise(xmlText);
   return json.session.$.id;
}




app.get('/api/recupMatieres', async (req, res) => {
   try {
       const sessionId = await getSessionId();


       // Fixer le projet
       await fetch(`https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=setProject&projectId=8`);


       const activitiesResponse = await fetch(`https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getActivities&tree=TRUE`);
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
       await fetch(`https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=setProject&projectId=8`);


       // Récup des matières
       const activitiesResponse = await fetch(`https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getActivities&tree=TRUE`);
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


       // Récup des créneaux du jour (date forcée ici)
       const formattedDate = new Date(2024, 0, 31); // janvier = 0 !!! ici 31 janvier
       const formattedString = formattedDate.toLocaleDateString('en-US'); //en format mm/dd/yyyy
       //on pourra mettre le jour today


       const eventsResponse = await fetch(`https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getEvents&date=${formattedString}`);
       const eventsXml = await eventsResponse.text();
       const eventsData = await parseStringPromise(eventsXml);


       const events = [];


       if (eventsData.events?.event) {
           for (const event of eventsData.events.event) {
               const activityId = event.$.activityId;


               const matiere = activities.find(a => a.activity_id === activityId);
               if (matiere) {
                   events.push({
                       activity_id: activityId,
                       matiere_name: matiere.name,
                       type: matiere.type
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
   console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
