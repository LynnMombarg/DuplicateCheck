<!--Authors: Marloes-->
<!--Jira-task: 106 - Front-end maken-->
<!--Sprint: 2-->
<!--Last modified: 08-05-2023-->

<template>
    <button @click="startCreateModel" class="rounded-md bg-white px-3 py-2 text-xl">
        + Add model
    </button>

    <div v-if="inputVisible">
        <p v-if="warningVisible">Please fill in all fields.</p>
        <label for="model">Model name*: </label>
        <input v-model="modelName" placeholder="Model name" id="model" /> <br>

        <label for="table">Table name*: </label>
        <select v-model="tableName" name="table" id="table">
            <option value="accounts">Accounts</option>
            <option value="contacts">Contacts</option>
            <option value="leads">Leads</option>
        </select> <br>

        <label for="description">Description: </label>
        <textarea v-model="description" id="description" name="description" placeholder="Model description"></textarea> <br>

        <button @click="createModel">
            Submit model
        </button>
    </div>
</template>

<script>
import { handleRequest } from "@/pages/overview/services/CreateModel";

export default {
    name: "CreateModelButton",
    data() {
        return {
            modelName: '',
            tableName: '',
            description: '',
            inputVisible: false,
            warningVisible: false,
        }
    },
    methods: {
        async createModel() {
            if (this.modelName !== '' && this.tableName !== '') {
                await handleRequest(this.modelName, this.tableName, this.description);
                this.inputVisible = false;
                this.$parent.getData();
            } else {
                this.warningVisible = true;
            }
        },
        startCreateModel() {
            this.inputVisible = !this.inputVisible;
            this.resetValues()
        },
        resetValues() {
            this.modelName = '';
            this.tableName = '';
            this.description = '';
            this.warningVisible = false;
        },
    }
};
</script>