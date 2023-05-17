<!--Author(s): Roward-->
<!--Jira-task: 131-->
<!--Sprint: 3-->
<!--Last modified: 16-05-2023-->

<template>
	<div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
		<div class="flex flex-col items-center w-full">
			<div class="flex w-full px-2 rounded-md">
				<div class="w-full">
					<ul
						class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
						<li v-for="job in jobs" :key="job.information"
							class="w-full border border-gray-200 rounded-lg" style="margin-bottom: 10px;">
							<div class="flex items-center px-3 pr">
								<input :id="'list-radio-license-' + job.jobId" type="radio" v-model="jobId"
									:value="job.jobId" name="list-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
								<label :for="'list-radio-license-' + job.jobId"
									class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
										job.jobName }}</label>
							</div>
						</li>
					</ul>

				</div>
			</div>
			<div class="flex">
				<button @click="selectJob" class="rounded-md bg-white px-3 py-2 text-xl">
					Start training
				</button>
			</div>
		</div>
	</div>
</template>
  
<script>

export default {
	data() {
		return {
			jobId: null,
		};
	},
	props: {
		jobs: Array,
	},
	methods: {
		selectJob() {
			this.$parent.selectJob(this.jobId);
		}
	}
};
</script>