<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <Banner/>
  <model-overview :models="models"/>
</template>

//<script setup>

// hardcoded models for testing
let models = [
  {
    modelname: 'model1',
    modeltable: 'table1',
    modeldescription: 'extra informatie over model2',
  },
  {
    modelname: 'model1',
    modeltable: 'table1',
    modeldescription: 'extra informatie over model2',
  },
]
// models from backend
//
// let models = [];
//
// async function getData() {
//
//   const response = await fetch('http://localhost:8001/model/models', {
//     method: 'GET',
//     headers: {
//       'Authorization': "test",
//       'Content-Type': 'application/json'
//     },
//   });
//
//   const data = await response.json();
//   models = data;
//
//   console.log(models);
// }
</script>

<script>
import Banner from "@/components/Banner.vue";
import ModelOverview from "@/components/ModelOverview.vue";

export default {
  name: "Dashboard",
  components: {
    Banner,
    ModelOverview,
  }
};
</script>


