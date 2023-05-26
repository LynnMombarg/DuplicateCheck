<!--Author(s): Silke Bertisen, Roward, Diederik, Lynn Mombarg-->
<!--Jira-task: Dashboard realiseren 104, 172 -->
<!--Sprint: 2, 3, 4 -->
<!--Last modified: 25-05-2023-->

<template>
    <div class="flex pl-64 flex-col flex-1">
        <Navbar />
        <OverviewBannerComponent :models="models"/>
        <Footer />
    </div>
</template>

<script>

import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
import {getModels} from "./services/GetModels";
import {createModel} from "./services/CreateModel";
import {deleteModel} from "./services/DeleteModel";
import { executeModel } from "./services/ExecuteModel";
import Navbar from "../../components/Navbar.vue";
import {signOut} from "@/pages/overview/services/SignOut";
import Footer from "../../components/Footer.vue";

export default {
  name: 'OverviewPage',
  components: {
      Footer,
      Navbar,
    OverviewBannerComponent,
    OverviewModelComponent
  },
  data() {
    return {
      models: [],
    }
  },
  async mounted() {
      this.models = await getModels();
      this.$store.commit('setModels', this.models);
  },
  methods: {
    async deleteModel(modelId) {
      this.models = await deleteModel(modelId);
    },
    async createModel(modelName, tableName, description) {
      this.models = await createModel(modelName, tableName, description);
      this.$store.commit('setModels', this.models);
    },
    async executeModel(tableName, modelId, recordId1, recordId2) {
      return await executeModel(tableName, modelId, recordId1, recordId2);
    }
  },
};
</script>

<style>
/*body {*/
/*  background-image: url("../../assets/lightning_blue_background.png");*/
/*  background-repeat: repeat-x;*/
/*  background-size: 50% 30%;*/
/*}*/
#headlessui-portal-root {
    position: fixed;
    z-index: 9999;
    inset: 0px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
