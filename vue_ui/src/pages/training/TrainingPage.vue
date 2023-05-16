<!-- 
Authors: Roward
Jira-task: 131 - Vue 3 - na klikken op "train model" jobs tonen
Sprint: 3
Last modified: 16-05-2023 
-->

<template>
	<div class="flex pl-64 flex-col flex-1">
		<Navbar :token="token" />
		<TrainingBannerComponent :jobs="jobs"/>
	</div>
</template>
  
<script>
import { getJobs } from './services/GetJobs';
import Navbar from '../../components/Navbar.vue';
import TrainingBannerComponent from './components/TrainingBannerComponent.vue';

export default {
	name: 'TrainingPage',
	components: {
    TrainingBannerComponent,
    Navbar,
},
	props: {
		token: {
			type: String,
			required: true,
		},
		tableName: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			jobs: [],
			token: null
		}
	},
	async mounted() {
		this.token = await this.$store.state.token;
		this.jobs = await getJobs(this.token, "leads");
		console.log(this.jobs);
	},
	methods: {
		async signOut() {
			await signOut(this.token)
			this.$store.commit('removeUser');
			this.$store.commit('removeToken');
			this.$router.push({ name: 'SignIn' });
		},
		selectJob(jobId){
			console.log(jobId);
		}
	}
};
</script>

<style>

</style>
 
  
  
  
  