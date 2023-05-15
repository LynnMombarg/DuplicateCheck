<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
    <TrainModal />
</template>

<script>
import RecordModel from "@/pages/training/components/RecordModel.vue";
import TrainModal from "@/pages/training/components/TrainModal.vue";

export default {
  name: "TrainingPage",
  components: {
      TrainModal,
    RecordModel,
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>