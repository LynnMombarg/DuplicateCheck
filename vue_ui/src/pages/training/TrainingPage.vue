<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
    <div class="h-screen flex-row items-center justify-center p-12">
        <TrainWindow v-if="trainingActive" :token="token" :records="records"/>
        <button @click="getRecords">Start training for job</button>
    </div>
</template>

<script>
import RecordModel from "@/pages/training/components/RecordModel.vue";
import TrainWindow from "@/pages/training/components/TrainWindow.vue";
import {getStub} from "@/pages/training/services/TrainService";

export default {
    name: "TrainingPage",
    components: {
        TrainWindow,
        RecordModel,
    },
    props: {
        token: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            token: null,
            records: [],
            trainingActive: false,
        }
    },
    async mounted() {
        this.token = await this.$store.state.token;
    },
    methods: {
        getRecords() {
            this.records = getStub();
            this.trainingActive = true;
        },
    },
};
</script>