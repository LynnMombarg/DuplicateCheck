<!--Authors: Marloes, Diederik-->
<!--Jira-task: 106 - Front-end maken-->
<!--Sprint: 2, 3-->
<!--Last modified: 15-05-2023-->

<template>
    <button @click="startCreateModel" class="rounded-md bg-white px-3 py-2 text-xl transition duration-300 ease-in-out hover:bg-sky-400 hover:text-white select-none" style="margin: 0.75rem;">
        + Add model
    </button>


    <TransitionRoot as="template" :show="open" class="fixed inset-0 overflow-y-auto select-none">
        <Dialog as="div" class="relative z-50 flex justify-center items-center" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                                class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500 z-50">
                            <div class="px-4 py-6 bg-white sm:p-6 rounded-lg">
                                <DialogTitle class="text-lg leading-6 font-medium flex" style="margin-bottom: 1.5rem; justify-content: space-around;">
                                    <div class="flex flex-row">
                                        <img alt="ML image" src="@/assets/machine-learning-model.svg" class="mr-1">
                                        <div class="text-lg">Create a new model</div>
                                    </div>
                                </DialogTitle>
                                <p v-if="warningVisible">Please fill in all fields.</p>
                                <div class="mt-2 flex flex-row">
                                    <label for="model" style="margin-right: 2rem; width: 6rem;" class="text-medium flex flex-start items-center">Model name: </label>
                                    <input v-model="modelName" placeholder="Model name" id="model" class="p-1 focus-visible:border-sky-400"/>
                                </div>
                                <div class="mt-2 flex flex-row">
                                    <label for="table" style="margin-right: 2rem; width: 6rem;" class="text-medium flex flex-start items-center">Table name: </label>
                                    <select v-model="tableName" name="table" id="table" class="focus-visible:border-sky-400">
                                        <option value="accounts">Accounts</option>
                                        <option value="contacts">Contacts</option>
                                        <option value="leads">Leads</option>
                                    </select>
                                </div>
                                <div class="mt-2 flex flex-row">

                                    <label for="description" style="margin-right: 2rem; width: 6rem;" class="text-medium flex flex-start">Description: </label>
                                    <textarea v-model="description" id="description" name="description" class="p-1 focus-visible:border-sky-400"
                                              placeholder="Model description" style="max-height: 10rem; min-height: 2rem;"></textarea>
                                </div>

                                <button @click="createModel" class="rounded-md px-3 py-2 text-xl transition duration-300 ease-in-out
                                    hover:bg-sky-400 hover:text-white mt-2">
                                    Submit
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue';


export default {
    name: "CreateModelButton",
    components: {DialogTitle, DialogPanel, Dialog, TransitionChild, TransitionRoot},
    data() {
        return {
            modelName: '',
            tableName: '',
            description: '',
            warningVisible: false,
            open: false,
        }
    },
    methods: {
        async createModel() {
            if (this.modelName !== '' && this.tableName !== '') {
                this.$parent.createModel(this.modelName, this.tableName, this.description);
                this.open = false;
            } else {
                this.warningVisible = true;
            }
        },
        startCreateModel() {
            this.open = true;
            this.resetValues();
        },
        resetValues() {
            this.modelName = '';
            this.tableName = '';
            this.description = '';
            this.warningVisible = false;
        },
    },
};
</script>