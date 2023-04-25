<template>
    <input v-model="modelName" placeholder="Model name" />
    <input v-model="tableName" placeholder="Table name" />
    <input v-model="token" placeholder="Token" />

    <button @click="createModel">
        Create model
    </button>
</template>

<script>
export default {
    name: "CreateModelButton",
    data() {
        return {
            modelName: '',
            tableName: '',
            token: '',
        }
    },
    methods: {
        async createModel() {
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({modelName: this.modelName, tableName: this.tableName, token: this.token,})
            };
            fetch("https://7c94f741-4a17-41d2-92bd-59226ad5be55.mock.pstmn.io/create", requestOptions)
                .then(response => response.json())
                .then(data => (this.postId = data.id));
        }
    }
};
</script>

<style scoped>

</style>