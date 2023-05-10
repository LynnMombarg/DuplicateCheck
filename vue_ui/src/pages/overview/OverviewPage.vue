<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <OverviewBannerComponent />
  <OverviewModelComponent />
</template>

<script>

import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";

export default {
  name: 'OverviewPage',
  components: {
    OverviewBannerComponent,
    OverviewModelComponent,
  }
};
</script>

<style>
body {
  background-image: url("../../assets/lightning_blue_background.png");
  background-size: cover;
}
</style>



