<!--Page de sélection des absences pour un créneau-->
<template>
    <div>
        <h1>Appel</h1>
        <ul>
            <li  v-for="student in studentList" :key="student"  class="list-presence">
                <label class="container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    {{ student.studentNumber }} {{ student.surname }} {{ student.name }}
                </label>
            </li>
        </ul>
        <!--dans le composant, afficher présent.e et absent.e dans la liste à côté du nom ?-->
        <!--dans le composant, ajouter un bouton voir le récap de l'étudiant lorsqu'on le survole ?-->
        <button
            v-if="!callSaved" 
            class="button-save" 
            @click="saveCallAndGoBack"
        >Sauvegarder l'appel</button>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const studentList = ref([])
const buttonStates = ({})
onMounted(() => {
    fetch('/ListNamesStu.json')
    .then((response)=>response.json())
    .then ((data)=> {
      console.log("Données JSON récupérées : ", data)
      studentList.value = data.students;
      buttonStates.value = studentList.value.reduce((acc, student) => {
    acc[student.studentNumber] = true
    return acc
  }, {})
  console.log("Etat actuel des boutons : ", buttonStates.value)
    })
    .catch(error => console.error('Error loading data:', error))
});
const props = defineProps({
    studentList : Array
})

const callSaved = ref(false);

function saveCall() {
    /* Sauvegarder l'appel */
    callSaved.value = true;
}

const router = useRouter();

function saveCallAndGoBack() {
    saveCall();
    router.go(-1);
}

</script>

<style scoped>
.list-presence {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    width: 40%;
    font: 1rem "Fira Sans", sans-serif;
    position : relative;

}


.container{
    display : block;
    position :relative; 
    cursor: pointer;
    padding-left: 40px;
    margin-bottom: 12px;
    font-size: 20px;
    user-select: none;
}

/*hide the default checkbox*/
.container input{
    position : absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

}
.checkmark{
    position : absolute;
    top: 4px;
    left: 7px;
    height: 25px;
    width: 25px;
    background-color: #eee
}

.container:hover input ~.checkmark{
    background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #E64F11;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark::after{
    left:9px;
    top: 5px;
    width : 5px;
    height: 10px;
    border : solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.button-save {
    text-decoration: none;
    background-color: rgb(94, 216, 94);
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.button-save:hover {
    background-color: rgb(99, 201, 99);
}
</style>