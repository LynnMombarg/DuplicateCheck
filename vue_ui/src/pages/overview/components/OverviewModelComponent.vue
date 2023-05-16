<!--Author(s): Silke Bertisen, Roward Dorrestijn-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 11-05-2023-->

<template>
  <div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
    <div class="flex items-center w-50">
      <div class="flex items-center w-50 px-2 rounded-md"
        :class="{ bgContacts: isContacts(this.model.tableName), bgLeads: isLeads(this.model.tableName), bgAccounts: isAccounts(this.model.tableName) }">
        <div class="w-10">
          <svg v-if="isContacts(this.model.tableName)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>

          <svg v-if="isLeads(this.model.tableName)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>

          <svg v-if="isAccounts(this.model.tableName)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

        </div>
        <div class="">
          {{ this.model.tableName }}
        </div>
      </div>
      <div class="px-3">

        {{ this.model.modelName }}
      </div>
    </div>
    <div>
      <p class="text-lg">
        {{ this.model.modelDescription }}
      </p>
    </div>
    <div>
      <OverviewDropdownComponent :modelId="this.model.modelId" :token="token" />
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
    token: {
        type: String,
        required: true,
    },
  },
  methods: {
    deleteModel(modelId){
      this.$parent.deleteModel(modelId, this.token);
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
  }
};
</script>


<style>
.bgContacts {
  background-color: rgb(132 204 22);
}

.bgLeads {
  background-color: rgb(240, 171, 12);
}

.bgAccounts {
  background-color: rgb(11, 145, 212);
}
</style>
