<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->

<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="model in models" :key="model.information">
      <div class="flex justify-between bg-gray rounded-md px-3 py-5 text-xl font-medium model">
        <div class="flex items-center w-50">
          <div class="flex items-center w-50 px-3 bg-green rounded-md">
            <div class="w-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div class="">
              {{ model.tableName }}
            </div>
          </div>
          <div class="px-3">

            {{ model.modelName }}
          </div>
        </div>
        <div>
          <p class="text-lg">
            {{ model.modelDescription }}
          </p>
        </div>
        <div>
          <OverviewDropdownComponent :modelId="model.modelId"/>
          <!-- <button @click="viewdetails" class="rounded-md bg-white px-3 py-2 text-xl">
            <p class="text-sky-600"> Options </p>
          </button>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <OverviewDropdownComponent :model=model> </OverviewDropdownComponent>
          </div> -->
        </div>
      </div>
      <!-- <div class="bg-white shadow w-full ">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between ">
          <div class="flex gap-x-4 ">
            <div class="min-w-0 flex-auto">
              <a @click="viewdetails" href="#" class="bg-violet-400 text-white rounded-md px-3 py-1 text-sm font-medium"
                aria-current="page">
                {{ model.modelName }}</a>
            </div>
          </div>
          <p class="text-xs leading-5 text-gray-500"> {{ model.tableName }}</p>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <OverviewDropdownComponent :model=model> </OverviewDropdownComponent>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-middle">
          <p class="text-sm leading-6 text-gray-900">{{ model.modeldescription }}</p>
        </div>
      </div> -->
    </li>
  </ul>
</template>

<script>
import OverviewDropdownComponent from "@/pages/overview/components/OverviewDropdownComponent.vue";
import { getData } from "../services/GetModels";
import { deleteModel } from "../services/DeleteModel";

export default {
  name: "OverviewModelComponent",
  components: {OverviewDropdownComponent},
  data() {
    return { models: [] }
  },
  mounted() {
    this.getModels();  
  },
  methods: {
    async getModels(){
      this.models = await getData();
    },
    async deleteModel(modelId){
      this.models = await deleteModel(modelId);
    }
  }
};
</script>

<style>
.bg-green {
  background-color: rgb(132 204 22);
}

.model{
  margin-top: 2rem;
}
</style>
