<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <div class="flex justify-between bg-gray rounded-md px-3 py-5 text-3xl font-medium">
    <div class="flex items-center w-50">
      <div class="margin-logo">
        <img src="../../../assets/logo_duplicatecheck.png">
      </div>
      <div>
        Overview
      </div>
    </div>
    <div>
      <CreateModelButton/>
    </div>
  </div>
</template>

<script>

import CreateModelButton from "@/pages/overview/components/CreateModelButton.vue";

export default {
  name: "OverviewBannerComponent",
  components: {
    CreateModelButton,
  },    
};
</script>

<style>
.bg-violet-400 {
  background-color: #ad69e2;
}

.bg-gray {
  background-color: #F3F3F3;
}

.margin-logo{
  margin-right: 10px;
}
</style>