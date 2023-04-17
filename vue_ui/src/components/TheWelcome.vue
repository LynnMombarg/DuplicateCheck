<script setup>
import { ref } from 'vue'

let message = ref("No API call has been made yet");

function fetchResults() {
  fetch('http://localhost:3000/')
    .then(async response => {
      // console.log(response.json())
      message.value = (await response.json()).message
      console.log(message.value)
    })
}
</script>


<template>
  <h1>Vue 3 Prototype</h1>
  <p> Welcome to the vue prototype (: </p>

  <button @click="fetchResults"> Do an API call </button>
  <p> {{ message }} </p>

</template>