<template>
	<div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
		<div class="flex items-center w-50">
			<div class="flex items-center w-50 px-2 rounded-md">
				<div class="w-10">
					<ul
						class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
						<li v-for="job in jobs" :key="job.information"
							class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
							<div class="flex items-center pl-3">
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
				<SelectJobButton :jobId="jobId"/>
			</div>
		</div>
	</div>
</template>
  
<script>
import SelectJobButton from './SelectJobButton.vue';

export default {
	components: {
		SelectJobButton,
	},
    data() {
        return {
            jobId: null,
        };
    },
    props: {
        jobs: Array,
    },
    components: { SelectJobButton }
};
</script>