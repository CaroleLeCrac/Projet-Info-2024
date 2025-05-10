export function getAllSemesters() {
    return fetch('http://localhost:3000/semester')
}

export function getSemesterById(id) {
    return fetch(`http://localhost:3000/semester/${id}`)
}