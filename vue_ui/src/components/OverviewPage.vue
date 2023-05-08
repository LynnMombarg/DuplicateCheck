<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <Banner/>
  <OverviewModelComponent :models="models"/>
</template>

<script setup>
// hardcoded models for testing
let models = [
  {
    modelId: 1,
    modelName: 'model1',
    tableName: 'table1',
    modeldescription: 'extra informatie over model1',
  },
  {
    modelId: 4,
    modelName: 'model2',
    tableName: 'table2',
    modeldescription: 'extra informatie over model2',
  },
]

// code to get models from backend
// let models = [];
//
// async function getData() {
//   const response = await fetch('http://localhost:8001/model/models', {
//     method: 'GET',
//     headers: {
//       'Authorization': "test",
//       'Content-Type': 'application/json'
//     },
//   });
//
//   models = await response.json();
//   console.log(models);
// }



</script>

<script>
import Banner from "@/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/components/OverviewModelComponent.vue";
export default {
  name: "OverviewPage",
  components: {
    Banner,
    OverviewModelComponent,
  }
};
</script>


