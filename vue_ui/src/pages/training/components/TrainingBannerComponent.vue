<!--Author(s): Silke Bertisen, Roward, Diederik-->
<!--Jira-task: Dashboard realiseren 104 -->
<!--Sprint: 2, 3 -->
<!--Last modified: 15-05-2023-->

<template>
	<div class="h-36 2xl:h-48 bg-sky-400" style="background-color: rgb(56 189 248); height: 144px"></div>
	<div class="py-6 px-6" style="margin-top: -7rem">
		<div class="max-w-7xl mx-auto -mt-32">
			<div class="flex overflow-hidden ml-2">
				<div class="flex-none w-10 pr-1">
					<img alt="Plauti Logo" src="src/assets/plauti-white.svg">
				</div>
				<div class="flex-initial w-64 text-left leading-9 text-lg font-semibold text-white">
					<div class="animated">Duplicate Check ML <span
							class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
							style="margin-top: -2px;"> beta </span></div>
				</div>
			</div>
			<div class="flex justify-center">
				<div class="selectJob rounded-lg bg-white shadow mt-6 mb-6">
					<div class="flex justify-between" style="margin: 8px">
						<div class="text-3xl font-medium flex items-center mt-2">
							<div class="margin-logo">
								<img src="src/assets/logo_duplicatecheck.png">
							</div>
							<div>
								Select Job
							</div>
						</div>
					</div>
					<SelectJobBody :jobs="this.jobs" />
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<script>

import Footer from "../../../components/Footer.vue";
import SelectJobBody from "./SelectJobBody.vue";

export default {
	name: "OverviewBannerComponent",
	components: {
		Footer,
		SelectJobBody,
	},
	props: {
		jobs: {
			type: Array,
			required: true,
		}
	},
};
</script>

<style>
.bg-violet-400 {
	background-color: #ad69e2;
}

.margin-logo {
	margin-right: 10px;
}

.selectJob {
	width: 30%;
}
</style>