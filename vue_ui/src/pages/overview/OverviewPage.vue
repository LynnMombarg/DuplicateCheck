<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <OverviewBannerComponent/>
  <OverviewModelComponent :models="models"/>
</template>

<script>

import {onMounted} from "vue";
import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
export default {
  name: 'OverviewPage',
  components: {
    OverviewBannerComponent,
    OverviewModelComponent,
  },
  data() {
    return {
      models: [
        {
          modelId: 1,
          modelName: 'model1',
          tableName: 'table1',
          modelDescription: 'extra informatie over model1',
        },
        {
          modelId: 4,
          modelName: 'model2',
          tableName: 'table2',
          modelDescription: 'extra informatie over model2',
        },
      ]
    }
  },
  // methods:{

//     onMounted(() => {
//   console.log("loading page");
//   getData();
// })
//   }
};

// hardcoded models for testing

</script>



