<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
    <div class="h-screen flex-row items-center justify-center p-12">
        <TrainWindow v-if="trainingActive" :token="token" :records="records"/>
        <button v-if="!trainingActive" @click="startTraining">Start training for job</button>
    </div>
</template>

<script>
import RecordModel from "@/pages/training/components/RecordModel.vue";
import TrainWindow from "@/pages/training/components/TrainWindow.vue";
import {getRecords, giveAnswer, selectJob} from "@/pages/training/services/TrainService";

export default {
    name: "TrainingPage",
    components: {
        TrainWindow,
        RecordModel,
    },
    data() {
        return {
            token: null,
            trainingId: null,
            records: [],
            trainingActive: false,
        }
    },
    async mounted() {
        this.token = await this.$store.state.token;
    },
    methods: {
        startTraining() {
            this.trainingId = selectJob();
            this.trainingActive = true;
            this.getRecords();
            console.log(this.trainingId);
            console.log(this.records);
        },
        getRecords: function () {
            this.records = getRecords(this.trainingId, this.token);
        },
        giveAnswer(answer) {
            giveAnswer(answer, this.trainingId, this.token)
            this.trainingId++;
            this.getRecords();
        }
    },
};
</script>
