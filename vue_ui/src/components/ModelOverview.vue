<template>
 <p> test</p>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="model in models" :key="model.information" class="flex py-2">
      <div class="bg-white shadow w-full ">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between ">
          <div class="flex gap-x-4">
            <div class="min-w-0 flex-auto">
              <a href="#" class="bg-violet-400 text-white rounded-md px-3 py-1 text-sm font-medium" aria-current="page">
                {{model.name}}</a>
            </div>
          </div>
          <p class="text-xs leading-5 text-gray-500"> {{model.table}}</p>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <model-options-dropdown/>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-middle">
          <p class="text-sm leading-6 text-gray-900">{{ model.description}}</p>
        </div>

      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps(['models'])
</script>

<script>
import ModelOptionsDropdown from "@/components/ModelOptionsDropdown.vue";

export default {
  name: 'ModelOverview',
  components: {ModelOptionsDropdown}
}
</script>