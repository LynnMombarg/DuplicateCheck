<template>


  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="model in models" :key="model.Information" class="flex py-5">
      <div class="bg-white shadow w-full">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <div class="flex gap-x-4">
            <div class="min-w-0 flex-auto">
              <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page"> {{model.name}}</a>
            </div>
            <div class="min-w-0 flex-auto">
              <p class="text-sm  leading-6 text-gray-900">  {{model.Information}}</p>
            </div>
          </div>
          <p class="text-xs leading-5 text-gray-500"> created on: {{model.createdOn}}</p>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <model-options-dropdown/>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-middle">
          <p class="text-sm leading-6 text-gray-900">{{ model.details}}</p>
        </div>

      </div>
    </li>
  </ul>

</template>

<script setup>
import ModelOptionsDropdown from "@/components/ModelOptionsDropdown.vue";

const models = [
  {
    name: 'model1',
    Information: 'informatie over model1',
    details: 'extra informatie over model1',
    createdOn: '2023-01-23',
  },
  {
    name: 'model2',
    Information: 'informatie over model2',
    details: 'extra informatie over model2',
    createdOn: '2023-01-23',
  }
]
</script>



<style>
.dropdown:focus-within .dropdown-menu {
  opacity:1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>


