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


