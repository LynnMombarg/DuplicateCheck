<!--Author(s): Silke Bertisen, Roward, Diederik, Lynn Mombarg-->
<!--Jira-task: Dashboard realiseren 104, 162, 172, 174 -->
<!--Sprint: 2, 3, 4 -->
<!--Last modified: 25-05-2023-->
<!--Description: This component is used to display the dropdown menu for the model options. -->

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm
        font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Options
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a @click="trainModel(modelId)" style="cursor: pointer;"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Train model</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a @click="startExecuteModel()" style="cursor: pointer;"
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

  <TransitionRoot as="template" :show="dialog" class="fixed inset-0 overflow-y-auto select-none">
    <Dialog as="div" class="relative z-50 flex justify-center items-center" @close="dialog = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500 z-50">
              <div class="px-4 py-6 bg-white sm:p-6 rounded-lg">
                <DialogTitle class="text-lg leading-6 font-medium flex"
                  style="margin-bottom: 1.5rem; justify-content: space-around;">
                  <div class="flex flex-col">
                    <div class="text-lg">Execute model</div>
                  </div>
                </DialogTitle>
                <p v-if="warningVisible">Please fill in all fields.</p>

                <div class="mt-2 flex flex-col">
                  <label for="recordid1" style="margin-right: 2rem; width: 10rem; cursor: default;"
                    class="text-medium flex flex-start items-center">Record id 1</label>
                  <input v-model="recordid1" placeholder="id" id="record1"
                    class=" rounded-lg p-1 focus-visible:border-sky-400 border" />
                </div>
                <div class="mt-2 flex flex-col">
                  <label for="recordid2" style="margin-right: 2rem; width: 10rem; cursor: default;"
                    class="text-medium flex flex-start items-center">Record id 2</label>
                  <input v-model="recordid2" placeholder="id" id="record2"
                    class="rounded-lg p-1 focus-visible:border-sky-400 border" />
                </div>

                <div v-if="showResult" class="mt-2">

                  <div class="text-medium flex flex-start items-center" v-if="is_match == null"> Something went wrong
                  </div>

                  <div class="mt-2" v-if="is_match != null">
                    <div class="flex justify-between mb-1">
                    </div>
                    <table class="table-auto w-full mt-2">
                      <tr>
                        <td class="py-2 px-4 border border-blue-700 dark:border-white"> Is a match: {{ is_match }}
                        </td>
                      </tr>
                      <tr>
                        <td class="py-2 px-4 border border-blue-700 dark:border-white">Probability: {{ percentage }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <button @click="executeModel(modelId, tableName)" class="rounded-md px-3 py-2 text-xl transition duration-300 ease-in-out
                                      hover:bg-sky-400 hover:text-white mt-2" v-if="!open">
                  Execute
                </button>
                <div class="flex justify-center px-3 py-2 mt-2" v-if="open">
                  <svg class="animate-spin -ml-1 mr-3 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="rgb(56 189 248)" stroke-width="4"></circle>
                    <path class="opacity-75" fill="rgb(255 255 255)"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>

export default {
  name: "OverviewDropdownComponent",
  components: { DialogTitle, DialogPanel, Dialog, TransitionChild, TransitionRoot },
  data() {
    return {
      recordid1: '',
      recordid2: '',
      warningVisible: false,
      dialog: false,
      showResult: false,
      percentage: 0,
      is_match: null,
      open: false,
    }
  },
  methods: {
    confirmDelete(modelId) {
      if (window.confirm("Are you sure you want to delete this model?")) {
        this.$parent.deleteModel(modelId);
      }
    },

    trainModel(modelId) {
      this.$router.push({ name: 'TrainingPage', params: { modelId: modelId } });
    },

    startExecuteModel() {
      this.dialog = true;
      this.showResult = false;
      this.resetValues();
    },

    async executeModel(modelId, tableName) {
      if (this.recordid1 !== '' && this.recordid2 !== '') {
        this.open = true;
        this.showResult = false;
        let result = await this.$parent.executeModel(tableName.slice(0, -1), modelId, this.recordid1, this.recordid2);
        this.open = false;
        this.is_match = result.is_match;
        this.percentage = parseFloat(result.percentage).toFixed(2);
        this.showResult = true;
      } else {
        this.warningVisible = true;
      }
    },

    resetValues() {
      this.recordid1 = '';
      this.recordid2 = '';
      this.warningVisible = false;
      this.percentage = 0;
      this.is_match = null;
    }
  },
};

</script>
<script setup>

import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps({
  modelId: {
    type: String,
  },
  tableName: {
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