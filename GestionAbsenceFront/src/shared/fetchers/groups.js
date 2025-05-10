export function getAllGroups() {
    return fetch('http://localhost:3000/group/by-semester')
}

export function getGroupById(id) {
    return fetch(`http://localhost:3000/group/${id}`)
}

export function getAllGroupsAndSemester() {

}