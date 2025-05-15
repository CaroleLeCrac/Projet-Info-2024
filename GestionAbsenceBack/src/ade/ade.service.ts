import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CourseMaterialService } from 'src/course_material/course_material.service';
import { SemesterService } from 'src/semester/semester.service';
import { SessionTypeService } from 'src/session_type/session_type.service';
import { parseStringPromise } from 'xml2js';

type FolderContext = {
  niveau?: string;
  semestre?: string | number;
  matiereName?: string;
  type?: string;
};

type Activity = {
  semestre: string | number | undefined;
  type: string | undefined;
  name: string | undefined;
};

@Injectable()
export class AdeService {
  constructor(
    private readonly semesterService: SemesterService,
    private readonly courseMaterialService: CourseMaterialService,
    private readonly sessionTypeService: SessionTypeService,
  ) {}

  async getSessionId(): Promise<string> {
    const response = await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?data=d492b20c0c7f48f27fcf0491e9607cfd0aceb141e80ec5a2743c822702d89226b802c20c0bac3aa39dac749c7a5ea85dc58e26c66dcf6a0d4cf9b27b6336cb66,1`,
    );
    const xmlText = await response.text();
    const json = await parseStringPromise(xmlText);
    return json.session.$.id;
  }

  async getMatieres() {
    const sessionId = await this.getSessionId();
    await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=setProject&projectId=8`,
    );

    const response = await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getActivities&tree=TRUE`,
    );
    const xml = await response.text();
    const json = await parseStringPromise(xml);

    const uniqueActivities = this.parseActivities(
      json.treeActivities?.folder ?? [],
    );
    return uniqueActivities;
  }

  private parseActivities(folders: any[]): any[] {
    const seen = new Set();
    const activities: Activity[] = [];

    function parcourirFolder(folder: any, context: FolderContext = {}): void {
      const name = folder.$?.name || '';
      const newContext = { ...context };

      const niveauMatch = name.match(/\bL[1-3]\b MIASHS/i);
      if (niveauMatch) {
        newContext.niveau = niveauMatch[0].match(/L[1-3]/)[0];
      }

      if (/Semestre/i.test(name)) {
        const match = name.match(/\d+/);
        if (match) {
          newContext.semestre = match[0].toString();
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
        folder.activity.forEach(() => {
          const key = `${newContext.matiereName}_${newContext.semestre}_${newContext.type}`;
          if (!seen.has(key)) {
            seen.add(key);
            activities.push({
              semestre: newContext.semestre,
              type: newContext.type,
              name: newContext.matiereName,
            });
          }
        });
      }

      if (folder.folder) {
        folder.folder.forEach((sub) => parcourirFolder(sub, newContext));
      }
    }

    folders.forEach((f) => parcourirFolder(f));
    return activities;
  }

  async getCreneaux(date: string): Promise<any[]> {
    const sessionId = await this.getSessionId();
    await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=setProject&projectId=8`,
    );

    const activitiesResponse = await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getActivities&tree=TRUE`,
    );
    const activitiesXml = await activitiesResponse.text();
    const activitiesJson = await parseStringPromise(activitiesXml);

    const activities: {
      activity_id: string;
      name: string | undefined;
      type: string | undefined;
    }[] = [];

    function parcourirFolder(folder: any, context: FolderContext = {}) {
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
        folder.activity.forEach((activity: any) => {
          activities.push({
            activity_id: activity.$.id,
            name: newContext.matiereName,
            type: newContext.type,
          });
        });
      }

      if (folder.folder) {
        folder.folder.forEach((sub: any) => parcourirFolder(sub, newContext));
      }
    }

    if (activitiesJson.treeActivities?.folder) {
      activitiesJson.treeActivities.folder.forEach((folder: any) =>
        parcourirFolder(folder),
      );
    }

    // Vérifie la date au format YYYY-MM-DD
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('Format de date invalide. Attendu: YYYY-MM-DD');
    }

    const [year, month, day] = date.split('-').map(Number);
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

    const eventsResponse = await fetch(
      `https://ade-uga-info-ro.grenet.fr/jsp/webapi?sessionId=${sessionId}&function=getEvents&date=${formattedDate}`,
    );
    const eventsXml = await eventsResponse.text();
    const eventsJson = await parseStringPromise(eventsXml);

    const result: {
      matiere_name: string | undefined;
      type: string | undefined;
      date: string;
    }[] = [];

    if (eventsJson.events?.event) {
      for (const event of eventsJson.events.event) {
        const activityId = event.$.activityId;
        const matchedActivity = activities.find(
          (a) => a.activity_id === activityId,
        );

        if (matchedActivity) {
          result.push({
            matiere_name: matchedActivity.name,
            type: matchedActivity.type,
            date,
          });
        }
      }
    }

    return result;
  }

  async refreshADEData(): Promise<void> {
    const matieres = await this.getMatieres(); // récupère depuis ADE

    // 1. Extraire les semestres
    const seenSemesters = new Set();
    const semesters = matieres
      .filter((item) => item.semestre)
      .map((item) => `S${item.semestre}`)
      .filter((name) => {
        if (seenSemesters.has(name)) return false;
        seenSemesters.add(name);
        return true;
      })
      .map((name) => ({ name: name }));

    const createdSemesters = await this.semesterService.postSemester(semesters);

    // 2. Extraire les matières avec semester_id
    const seenCourseMaterials = new Set();
    const courseMaterials = matieres
      .filter((item) => item.name && item.semestre)
      .map((item) => {
        const semesterName = `S${item.semestre}`;
        const semester = createdSemesters.find((s) => s.name === semesterName);

        if (!semester) {
          throw new Error(`Semestre non trouvé pour ${semesterName}`);
        }

        return {
          name: item.name,
          semester_id: semester.id,
        };
      })
      .filter((item) => {
        const key = `${item.name}-${item.semester_id}`;
        if (seenCourseMaterials.has(key)) return false;
        seenCourseMaterials.add(key);
        return true;
      });

    const createdCourseMaterials =
      await this.courseMaterialService.postCourse_Material(courseMaterials);

    // 3. Extraire les types de cours
    const sessionTypes = matieres
      .filter((item) => item.type && item.name)
      .map((item) => {
        const matched = createdCourseMaterials.find(
          (c) => c.name === item.name,
        );

        if (!matched) {
          throw new Error(
            `Matière non trouvée pour le type de cours : ${item.name}`,
          );
        }

        return {
          course_type_name: item.type,
          course_material_id: matched.id,
        };
      });

    await this.sessionTypeService.postSession_Type(sessionTypes);
  }
}
