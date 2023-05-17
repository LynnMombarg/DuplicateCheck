<!--Author(s): Marloes-->
<!--Jira-task: 132, 133, 134-->
<!--Sprint: 3-->
<!--Last modified: 16-05-2023-->

<template>
    <div class="flex pl-64 flex-col flex-1">
        <Navbar :token="token"/>
        <div class="h-36 2xl:h-48 bg-sky-400" style="background-color: rgb(56 189 248); height: 144px"></div>
        <div class="py-6 px-6" style="margin-top: -7rem">
            <div class="max-w-7xl mx-auto -mt-32">
                <div class="flex overflow-hidden ml-2">
                    <div class="flex-none w-10 pr-1">
                        <img alt="Plauti Logo"
                             src="src/assets/plauti-white.svg"></div>
                    <div class="flex-initial w-64 text-left leading-9 text-lg font-semibold text-white">
                        <div class="animated">Duplicate Check ML <span
                                class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                                style="margin-top: -2px;"> beta </span></div>
                    </div>
                </div>
                <div class="rounded-lg bg-white shadow mt-6 mb-6">
                    <div class="flex justify-between" style="margin: 8px">
                        <div class="text-3xl font-medium flex items-center mt-2">
                            <div class="margin-logo">
                                <img src="src/assets/logo_duplicatecheck.png">
                            </div>
                            <div>
                                Train model 1
                            </div>
                        </div>
                    </div>
                    <TrainWindow v-if="trainingActive" :token="token" :records="records"/>
                    <button v-if="!trainingActive" @click="selectJob">Start training for job</button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import RecordModel from "@/pages/training/components/RecordModel.vue";
import TrainWindow from "@/pages/training/components/TrainWindow.vue";
import Navbar from "@/pages/overview/components/Navbar.vue";
import Footer from "@/pages/overview/components/Footer.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
import CreateModelButton from "@/pages/overview/components/CreateModelButton.vue";
import {getRecords, giveAnswer, saveTraining, selectJob} from "./services/TrainService";

export default {
    name: "TrainingPage",
    components: {
        CreateModelButton, OverviewModelComponent,
        Footer,
        Navbar,
        TrainWindow,
        RecordModel,
    },
    data() {
        return {
            token: null,
            jobId: 'testJobId', //TODO: Set to null once fully integrated.
            trainingId: null,
            records: [],
            trainingActive: false,
        }
    },
    async mounted() {
        this.token = await this.$store.state.token;
    },
    methods: {
        async selectJob() {
            //this.trainingId = await selectJob(this.jobId, this.token);
            console.log(await selectJob(this.jobId, this.token));
            await this.getRecords();
            this.trainingActive = true;
            console.log('Records: ' + this.records);
        },
       async getRecords() {
            this.records = await getRecords(this.trainingId, this.token);
            if (this.records === null) {
                this.saveTraining();
            }
        },
        giveAnswer(answer) {
            giveAnswer(answer, this.trainingId, this.token);
            this.getRecords();
        },
        saveTraining() {
            this.trainingActive = false;
            saveTraining(this.trainingId, this.token);
        }
    },
};
</script>
