<template>
	<button @click="selectJob" class="rounded-md bg-white px-3 py-2 text-xl">
		Start training
	</button>
</template>
  
<script>
import TrainingPage from '../TrainingPage.vue';

export default {
	components: {
		TrainingPage
	},
	props: {
		jobId: String,
	},
	methods:{
		selectJob(){
			this.$refs.trainingPage.selectJob(this.jobId);
		}
	}
};
</script>