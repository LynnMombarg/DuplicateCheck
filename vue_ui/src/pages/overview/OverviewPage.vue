<!--Author(s): Silke Bertisen, Roward-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 11-05-2023-->

<template>
  <OverviewBannerComponent :token="token"/>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="model in models" :key="model.information">
      <OverviewModelComponent :model="model" :token="token"/>
    </li>
  </ul>
</template>

<script>

import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
import { getModels } from "./services/GetModels";
import { createModel } from "./services/CreateModel";
import { deleteModel } from "./services/DeleteModel";

export default {
  name: 'OverviewPage',
  components: {
    OverviewBannerComponent,
    OverviewModelComponent
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      models: [],
      token: null
    }
  },
  async mounted() {
      this.token = await this.$store.state.token;
      this.models = await getModels(this.token);
  },
  methods: {
    async deleteModel(modelId) {
      this.models = await deleteModel(modelId, this.token);
    },
    async createModel(modelName, tableName, description) {
      this.models = await createModel(modelName, tableName, description, this.token);
    }
  },
};
</script>

<style>
body {
  background-image: url("../../assets/lightning_blue_background.png");
  background-repeat: repeat-x;
  background-size: 50% 30%;
}
</style>



