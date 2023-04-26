<!--Authors: Marloes-->
<!--Jira-task: 106 - Front-end maken-->
<!--Sprint: 2-->
<!--Last modified: 26-04-2023-->

<template>
    <button @click="startCreateModel">
        Create model
    </button>

    <div v-if="inputVisible">
        <p v-if="warningVisible">Please fill in all fields.</p>
        <label for="model">Model name*: </label>
        <input v-model="modelName" placeholder="Model name" id="model"/> <br>

        <label for="table">Table name*: </label>
        <select v-model="tableName" name="table" id="table">
            <option value="accounts">Accounts</option>
            <option value="contacts">Contacts</option>
            <option value="leads">Leads</option>
        </select> <br>

        <label for="description">Description: </label>
        <textarea v-model="description" id="description" name="description"></textarea> <br>

        <button @click="createModel">
            Submit model
        </button>
    </div>
</template>

<script>
export default {
    name: "CreateModel",
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
            console.log(this.modelName + ' ' + this.tableName);
            if (this.modelName !== '' && this.tableName !== '') {
                await this.handleRequest();
            } else {
                this.warningVisible = true;
            }
        },
        async handleRequest() {
            console.log('reached');
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    modelName: this.modelName,
                    tableName: this.tableName,
                    description: this.description,
                    token: 'ee8612ad-8ad3-489b-9982-33c15a6cc0a4',
                })
            };
            fetch("https://7c94f741-4a17-41d2-92bd-59226ad5be55.mock.pstmn.io/create", requestOptions)
                .then(response => response.json())
                .then(data => (this.postId = data.id));

            this.inputVisible = false;
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