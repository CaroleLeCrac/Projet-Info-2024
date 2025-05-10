export function getStudentsByGroupId(id) {
    return fetch(`http://localhost:3000/student/by-group/${id}`)
}

export function getAllStudents() {
    return fetch('http://localhost:3000/student')
}

export function getStudentById(id) {
    return fetch(`http://localhost:3000/student/${id}`)
}

export function getStudentsSameOtherGroup(id) {
    return fetch(`http://localhost:3000/student/same-other-group/${id}`)
}