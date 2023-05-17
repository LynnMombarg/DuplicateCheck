<!--Author(s): Marloes, Roward-->
<!--Jira-task: 131, 132, 133, 134-->
<!--Sprint: 3-->
<!--Last modified: 16-05-2023-->

<template>
	<!-- <div class="flex pl-64 flex-col flex-1">
		<Navbar :token="token" />
		<TrainingBannerComponent :jobs="jobs"/>
	</div> -->
	<div class="flex pl-64 flex-col flex-1">
		<Navbar :token="token" />
		<div class="h-36 2xl:h-48 bg-sky-400" style="background-color: rgb(56 189 248); height: 144px"></div>
		<div class="py-6 px-6" style="margin-top: -7rem">
			<div class="max-w-7xl mx-auto -mt-32">
				<div class="flex overflow-hidden ml-2">
					<div class="flex-none w-10 pr-1">
						<img alt="Plauti Logo" src="@/assets/plauti-white.svg">
					</div>
					<div class="flex-initial w-64 text-left leading-9 text-lg font-semibold text-white">
						<div class="animated">Duplicate Check ML <span
								class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
								style="margin-top: -2px;"> beta </span></div>
					</div>
				</div>
				<div class="flex justify-center">
					<div class="rounded-lg bg-white shadow mt-6 mb-6"
						:class="{ selectJob: this.selectJobActive, training: this.trainingActive }">
						<div class="flex justify-between" style="margin: 8px">
							<div class="text-3xl font-medium flex items-center mt-2">
								<div class="margin-logo">
									<img src="@/assets/logo_duplicatecheck.png">
								</div>
								<div>
									{{ model && model.modelName }}
								</div>
							</div>
						</div>
						<SelectJobBody v-if="selectJobActive" :jobs="jobs" />
						<TrainWindow v-if="trainingActive" :token="token" :records="records" />
						<!-- <button v-if="!trainingActive" @click="selectJob">Start training for job</button> -->
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>
  
<script>
import { getJobs } from './services/GetJobs';
import SelectJobBody from './components/SelectJobBody.vue';
import RecordModel from "@/pages/training/components/RecordModel.vue";
import TrainWindow from "@/pages/training/components/TrainWindow.vue";
import { getRecords, giveAnswer, saveTraining, selectJob } from "@/pages/training/services/TrainService";
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

export default {
	name: 'TrainingPage',
	components: {
		Navbar,
		SelectJobBody,
		Footer,
		TrainWindow,
		RecordModel,
	},
	props: {
		token: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			jobs: [],
			token: null,
			model: null,
			trainingId: null,
			records: [],
			trainingActive: false,
			selectJobActive: true,
		}
	},
	async mounted() {
		const modelId = this.$route.params.modelId;
		this.model = await this.$store.getters.getModelById(modelId);
		if (!this.model) {
			this.$router.push({ name: 'OverviewPage' });
		}
		this.token = await this.$store.state.token;
		this.jobs = await getJobs(this.token, this.model.tableName);
	},
	methods: {
		async signOut() {
			await signOut(this.token)
			this.$store.commit('removeUser');
			this.$store.commit('removeToken');
			this.$store.commit('removeModels');
			this.$router.push({ name: 'SignIn' });
		},
		async selectJob(jobId) {
			const modelId = this.$route.params.modelId;
			this.model = await this.$store.getters.getModelById(modelId);
			this.trainingId = selectJob(jobId, this.model.tableName, this.token);
			this.selectJobActive = false;
			this.trainingActive = true;
			this.getRecords();
		},
		getRecords: function () {
			this.records = getRecords(this.trainingId, this.token);
			if (this.records === null) {
				this.saveTraining();
			}
		},
		giveAnswer(answer) {
			giveAnswer(answer, this.trainingId, this.token);
			this.trainingId++; // Delete this statement when fully implemented
			this.getRecords();
		},
		saveTraining() {
			this.trainingActive = false;
			saveTraining(this.trainingId, this.token);
			this.$router.push({ name: "OverviewPage" });
		},
	},
}
</script>
<style>
.selectJob {
	width: 30%;
}

.training {
	width: 100%;
}
</style>

