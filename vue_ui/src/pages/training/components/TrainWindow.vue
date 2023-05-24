<!--Author(s): Marloes, Diederik-->
<!--Jira-task: 132, 133, 134, 162-->
<!--Sprint: 3-->
<!--Last modified: 23-05-2023-->

<template>
    <ul role="list" class="divide-y divide-gray-100">
        <RecordModel :record1="records[0]" :record2="records[1]" />
    </ul>
    <div>
        <button class="bg-green-400 text-black font-bold py-2 px-4 rounded" @click="giveAnswer(true)">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
            >
                <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                />
            </svg>
        </button>
        <button class="bg-red-400 text-black font-bold py-2 px-4 rounded" @click="giveAnswer(false)">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
            >
                <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
            </svg>
        </button>
        <button v-if="answerCounter > 1" class="bg-red-400 text-black font-bold py-2 px-4 rounded"
                @click="saveTraining">
            Finish early
        </button>
    </div>
</template>

<script>
import RecordModel from "./RecordModel.vue";
import OverviewModelComponent from "../../overview/components/OverviewModelComponent.vue";

export default {
    name: "TrainWindow",
    components: {
        OverviewModelComponent,
        RecordModel,
    },
    props: {
        records: Array,
    },
    data() {
        return {
            answerCounter: 0,
        }
    },
    methods: {
        giveAnswer(answer) {
            this.answerCounter++;
            this.$parent.giveAnswer(answer);
        },
        saveTraining() {
            this.answerCounter = 0;
            this.$parent.saveTraining();
        }
    },
};
</script>