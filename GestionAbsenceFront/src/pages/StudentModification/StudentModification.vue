<!--Page de modification d'informations ou d'ajout d'un étudiant-->
<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const students = ref([]);
const student = ref([]); 
const courses = ref([]);
const groups = ref([]);
const years = ref([]);
const route = useRoute();
const currentStudentNumber = route.params.id; 

onMounted(() => {
  fetch('/ListNamesStu.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      students.value = data.students;
    if (currentStudentNumber !== '0'){
        const studentData = students.value.find(
            (student)=>student.studentNumber === Number(currentStudentNumber)
        )
        if (studentData){
            student.value = {...studentData}
        }
    }
    })
    .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
  fetch('/ListCourses.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      courses.value = data.courses;
    
    })
    .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
  fetch('/Groups.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      groups.value = data.groups;
    
    })
    .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
  fetch('/Years.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      years.value = data.years;
    
    })
    .catch((error) => console.error('Error loading data:', error));
});
</script>

<template>
    <div class="page-layout">
        <div class="left-column">
            <form class="container">
                <div>
                    <label for = "studentNumber">Numéro étudiant : </label>
                    <input type="text" id="studentNumber" v-model="student.studentNumber" :placeholder="student.studentNumber ? '' : 'Numéro de l\'étudiant'"/>
                </div>
                <div>
                    <label for = "name">Nom : </label>
                    <input type="text" id="surname" v-model="student.surname" :placeholder="student.surname ? '' : 'Nom de l\'étudiant'"/>
                </div>
                <div>
                    <label for = "surname">Prénom : </label>
                    <input type="text" id="name" v-model="student.name" :placeholder="student.name ? '' : 'Prénom de l\'étudiant'"/>
                </div>
                <div>
                    <label for = "mail">Mail : </label>
                    <input type="text" id="mail" v-model="student.mail" :placeholder="student.mail ? '' : 'Mail de l\'étudiant'"/>
                </div>

                <select name="inscriptionGroup" id="group-select">
                    <option v-for="group in groups" :key="group.number">{{group.name}}</option>
                </select>

                <select name="inscriptionYear" id="year-select">
                    <option v-for="year in years">{{ year.name }}</option>
                </select>
    
            </form> 
        </div>

        <div class="right-column">
            <form>
            <ul>
                <p style="font-size: 16px;">Sélectionnez les cours auquel l'étudiant est inscrit</p>
                <li v-for="course in courses" :key="course.name">
                    <div>
                        <input type="checkbox">
                            <label for="course.name">{{ course.name }}</label>
                        </input>
                    </div>
                </li>
            </ul>
        </form>
            <button>Enregistrer les changements</button>
        </div>
    </div>
</template>

<style scoped>
.page-layout{
    display : flex;
}

.left-column{
    flex : 1;
}

.right-column{
    flex : 1;
    padding-top: 12px;
}

.container{
    display : flex;
   flex-direction : column;
   gap: 15px;
   padding-left: 25px;
   padding-right: 25px;
   font-size: 20px;
   padding-top: 30px;
   box-sizing: border-box;
}


.container div{
    display : flex;
    align-items : center;
}

label{
    flex:1;
}

input {
    flex : 2;
    margin-left: 10px;
    padding: 5px;
    font-size: 16px;
}

li {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    font: 1rem "Fira Sans", sans-serif;
    position : relative;
    margin-right: 25px;
}

button {
    margin-left: 40px;
    margin-top: 100px;
} 

</style>
