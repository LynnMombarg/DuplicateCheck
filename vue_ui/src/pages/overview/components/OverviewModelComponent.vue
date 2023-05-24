<!--Author(s): Silke Bertisen, Roward Dorrestijn, Diederik-->
<!--Jira-task: Dashboard realiseren 104, 162 -->
<!--Sprint: 2,3 -->
<!--Last modified: 23-05-2023-->

<template>
  <div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
    <div class="flex items-center w-50">
      <div class="flex items-center w-50 px-2 rounded-md"
        :class="{ bgContacts: isContacts(this.model.tableName), bgLeads: isLeads(this.model.tableName), bgAccounts: isAccounts(this.model.tableName) }">
        <div class="flex flex-row">
          <svg v-if="isContacts(this.model.tableName)" fill="white" view-box="0 0 24 24" stroke-width="1.5" stroke="white" style="posistion: absolute; top: 0; left: 0; width: 2rem; height: 2rem;">
            <use xlink:href="@/assets/symbols.svg#contact"></use>

          </svg>

          <svg v-if="isLeads(this.model.tableName)" fill="white" view-box="0 0 24 24" stroke-width="1.5" stroke="white" style="posistion: absolute; top: 0; left: 0; width: 2rem; height: 2rem;">
            <use xlink:href="@/assets/symbols.svg#lead"></use>
          </svg>

          <svg v-if="isAccounts(this.model.tableName)" fill="white" view-box="0 0 24 24" stroke-width="1.5" stroke="white" style="posistion: absolute; top: 0; left: 0; width: 2rem; height: 2rem;">
            <use xlink:href="@/assets/symbols.svg#account"></use>
          </svg>

        </div>
        <div class="text-sm text-white capitalize-first">
          {{ this.model.tableName }}
        </div>
      </div>
      <div class="px-3">

        {{ this.model.modelName }}
      </div>
    </div>
    <div style="overflow: overlay">
      <p class="text-lg">
        {{ this.model.modelDescription }}
      </p>
    </div>
    <div class="select-none" style="margin-left: 1rem;">
      <OverviewDropdownComponent :modelId="this.model.modelId" />
    </div>
  </div>
</template>

<script>
import OverviewDropdownComponent from "@/pages/overview/components/OverviewDropdownComponent.vue";

export default {
  name: "OverviewModelComponent",
  components: { OverviewDropdownComponent },
  props: {
    model: Array,
  },
  methods: {
    deleteModel(modelId){
      this.$parent.deleteModel(modelId);
    },
    isContacts(tableName) {
      return tableName === 'contacts';
    },
    isLeads(tableName) {
      return tableName === 'leads';
    },
    isAccounts(tableName) {
      return tableName === 'accounts';
    },
  },
};
</script>


<style>
.bgContacts {
  background-color: rgb(160 148 237);
}

.bgLeads {
  background-color: rgb(248 137 98);
}

.bgAccounts {
  background-color: rgb(127 141 225);
}
.capitalize-first::first-letter {
  text-transform: uppercase;
}
::-webkit-scrollbar {width: 5px; height: 5px;}
::-webkit-scrollbar-track {background: #f1f1f1;}
::-webkit-scrollbar-thumb {background: #888; border-radius: 5px;}
::-webkit-scrollbar-thumb:hover {background: #555;}
</style>
