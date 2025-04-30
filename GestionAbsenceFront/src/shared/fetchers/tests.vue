<script setup>
/* SelectStudentModification */
onMounted(() => {
    fetch('http://localhost:3000/student')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            students.value = data;
        })
        .catch(error => console.error('Error loading data:', error));
});

/* StudentModification */
onMounted(() => {
    fetch('http://localhost:3000/student')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            students.value = data;
            if (currentStudentNumber !== '0') {
                const studentData = students.value.find(
                    (student) => student.student_number === Number(currentStudentNumber)
                )
                if (studentData) {
                    student.value = { ...studentData }
                }
            }
        })
        .catch((error) => console.error('Error loading data:', error));
});

/* SlotPage */
onMounted(() => {
    fetch('http://localhost:3000/slot')
        .then((response) => response.json())
        .then((data) => {
            courses.value = data
        })
        .catch((error) => console.error('Error loading courses data:', error))
});
</script>