<template>
    <ul>
        <li  v-for="student in studentList" :key="student"  class="list-presence">
            <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
            {{ student }}
        </label>
        </li>
    </ul>

</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    studentList : Array
})
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

/*hide the default checkboc*/
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

</style>