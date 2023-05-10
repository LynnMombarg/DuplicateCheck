<!--Author(s): Silke Bertisen-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 26-4-2023-->
<!--Description: This component is used to display the dropdown menu for the model options. -->

<template>
  <!-- <div class=" relative inline-block text-left dropdown">
    <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
             type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
        <span>Options</span>
        <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
        <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
          <div class="py-1">
            <a @click="trainModel"  tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" > Train </a>
            <a @click="executeModel"  tabindex="1" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" > Execute </a>
            <a @click='confirmDelete(model.modelId)' class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" > Delete </a>
          </div>
        </div>
      </div>
    </div> -->
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Options
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a @click="trainModel"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Train model</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a @click="executeModel"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Execute model</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a @click="confirmDelete(modelId)"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete model</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>

export default {
  name: "OverviewDropdownComponent",
  methods: {
    confirmDelete(modelId) {
      if (window.confirm("Are you sure you want to delete this model?")) {
        console.log("Delete model pressed");
        console.log("id of model:" + modelId);
        // code delete model from backend
        // deleteModel(modelId);
        // code to refresh page
        this.$parent.deleteModel(modelId);
      }
    },

    trainModel() {
      // window.location.href = "/Trainmodel";
      console.log("train model pressed");
    },

    executeModel() {
      // window.location.href = "/Execute";
      console.log("execute model pressed");
    },
  }
};

</script>
<script setup>

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps({
    modelId: {
      type: String,
    },
  });

</script>


<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>