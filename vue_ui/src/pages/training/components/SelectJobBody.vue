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
							class="w-full border border-gray-200 rounded-lg" style="margin-bottom: 10px;"
							:class="{'bg-sky-400': jobId === job.jobId}">
							<div class="flex items-center px-3 pr">
								<input :id="'list-radio-license-' + job.jobId" type="radio" v-model="jobId"
									:value="job.jobId" name="list-radio" style="width: 0; height: 0; visibility: hidden;"
									class="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600
									dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2
									dark:bg-gray-600 dark:border-gray-500">
								<label :for="'list-radio-license-' + job.jobId"
									class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									:class="{'text-white': jobId === job.jobId}">{{
                    job.jobName }}</label>
							</div>
						</li>
					</ul>

				</div>
			</div>
			<div class="flex">
				<button @click="selectJob" class="rounded-md bg-white px-3 py-2 text-xl transition duration-300 ease-in-out hover:bg-sky-400 hover:text-white">
					Start training
				</button>
			</div>
		</div>
	</div>
	<TransitionRoot as="template" :show="open" class="fixed inset-0 overflow-y-auto select-none">
        <Dialog as="div" class="relative z-50 flex justify-center items-center">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                                class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500 z-50">
								<div class="flex flex-row items-center">
									<svg class="animate-spin -ml-1 mr-3 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="rgb(56 189 248)" stroke-width="4"></circle>
										<path class="opacity-75" fill="rgb(255 255 255)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								</div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue';

export default {
    components: {DialogTitle, DialogPanel, Dialog, TransitionChild, TransitionRoot},
	data() {
		return {
			jobId: null,
			open: false,
		};
	},
	props: {
		jobs: Array,
	},
	methods: {
		selectJob() {
			this.open = true;
			this.$parent.selectJob(this.jobId);
		}
	}
};
</script>

<style>

label {
	cursor: pointer;
}

</style>
