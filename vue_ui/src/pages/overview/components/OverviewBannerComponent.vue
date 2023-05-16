<!--Author(s): Silke Bertisen, Roward, Diederik-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2, 3 -->
<!--Last modified: 15-05-2023-->

<template>
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
                                Overview
                            </div>
                        </div>
                        <CreateModelButton/>
                    </div>
                    <ul role="list" class="divide-y divide-gray-100">
                        <li v-for="model in models" :key="model.information">
                            <OverviewModelComponent :model="model"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    <Footer/>
</template>

<script>

import CreateModelButton from "@/pages/overview/components/CreateModelButton.vue";
import Footer from "@/pages/overview/components/Footer.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";

export default {
    name: "OverviewBannerComponent",
    components: {
        OverviewModelComponent,
        Footer,
        CreateModelButton,
    },
    props: {
        models: {
            type: Array,
            required: true
        }
    },
    methods: {
        createModel(modelName, tableName, description) {
            this.$parent.createModel(modelName, tableName, description);
        },
        deleteModel(modelName) {
            this.$parent.deleteModel(modelName);
        }
    }
};
</script>

<style>
.bg-violet-400 {
  background-color: #ad69e2;
}

.margin-logo{
  margin-right: 10px;
}
</style>