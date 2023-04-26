<template></template>

<!-- Test only -->
<script setup>
import { ref } from 'vue';
let models;

async function getData() {
  const response = await fetch('http://localhost:8001/model/models', {
    method: 'GET',
    headers: {
      'Authorization': "test",
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  models = data;
}

await getData();
console.log(models[0]["modelName"]);


</script>

<script>

</script>

<style scoped></style>