<!--Author(s): Silke Bertisen, Roward-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2,3 -->
<!--Last modified: 16-05-2023-->
<!--Description: This component is used to display the dropdown menu for the model options. -->

<template>
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
          <a @click="trainModel(modelId)" style="cursor: pointer;"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Train model</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a @click="executeModel" style="cursor: pointer;"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Execute model</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a @click="confirmDelete(modelId)" style="cursor: pointer;"
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
        this.$parent.deleteModel(modelId, this.token);
      }
    },

    trainModel(modelId) {
      this.$router.push({ name: 'TrainingPage', params: {modelId: modelId} });
    },

    executeModel() {
      // window.location.href = "/Execute";
      console.log("execute model pressed");
    },
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
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