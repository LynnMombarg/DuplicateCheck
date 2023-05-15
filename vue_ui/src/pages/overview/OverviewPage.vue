<!--Author(s): Silke Bertisen, Roward, Diederik-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2, 3 -->
<!--Last modified: 15-05-2023-->

<template>
    <div class="flex pl-64 flex-col flex-1">
        <Navbar :token="token"/>
        <OverviewBannerComponent :models="models"/>
    </div>
</template>

<script>

import OverviewBannerComponent from "@/pages/overview/components/OverviewBannerComponent.vue";
import OverviewModelComponent from "@/pages/overview/components/OverviewModelComponent.vue";
import {getModels} from "./services/GetModels";
import {createModel} from "./services/CreateModel";
import {deleteModel} from "./services/DeleteModel";
import Navbar from "@/pages/overview/components/Navbar.vue";
import {signOut} from "@/pages/overview/services/SignOut";

export default {
  name: 'OverviewPage',
  components: {
      Navbar,
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
      console.log(this.models);
  },
  methods: {
    async deleteModel(modelId) {
      this.models = await deleteModel(modelId, this.token);
    },
    async createModel(modelName, tableName, description) {
      this.models = await createModel(modelName, tableName, description, this.token);
    },
    async signOut() {
      await signOut(this.token)
      this.$store.commit('removeUser');
      this.$store.commit('removeToken');
      this.$router.push({name: 'SignIn'});
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
</style>



