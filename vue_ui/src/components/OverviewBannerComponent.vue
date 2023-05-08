<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <a class="bg-violet-400 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
    Overview
    <button @click="createModel" class="bg-violet-400 text-white rounded-md px-3 py-2 text-sm font-medium" > create new model </button>
  </a>

</template>

<script setup>
function createModel(){
  window.open(
      "http://localhost:3000/model/create",
      "Create Model",
      "width=500,height=500"
  );
}
</script>
<script>
export default {
  name: 'Banner'
}
</script>

<style>
.bg-violet-400 {
  background-color: #ad69e2;
}

</style>