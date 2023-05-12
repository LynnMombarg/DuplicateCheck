<!--Author(s): Silke Bertisen, Roward-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2 -->
<!--Last modified: 11-05-2023-->

<template>
	<SelectJobModal />
</template>
  
<script>
import SelectJobModal from './components/SelectJobModal.vue';

export default {
	name: 'TrainingPage',
	components: {
		SelectJobModal,
	},
	data() {
		return {
			models: [],
		}
	},
	async mounted() {

	},
	methods: {

	}
};
</script>
 
  
  
  
  