export function postAbsence(slotId, [idStudents]) {
    return fetch(`http://localhost:3000/presence/many/${slotId}`)
}

