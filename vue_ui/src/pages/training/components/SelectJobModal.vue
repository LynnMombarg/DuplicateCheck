<template>
	<div class="container mx-auto">
		<div class="flex justify-center">
			<div v-show="isOpen" class="
			absolute
			inset-0
			flex
			items-center
			justify-center
			bg-gray-700 bg-opacity-50
		  ">
				<div class="max-w-2xl  p-6 bg-white rounded-md shadow-xl">
					<div class="flex items-center justify-between">
						<h3 class="text-3xl px-3">Select Job</h3>
					</div>
					<div class="mt-4 px-3 py-3">
						<p class="mb-4 text-sm">

						<h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Identification</h3>
						<ul
							class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
							<li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
								<div class="flex items-center pl-3">
									<input id="list-radio-license" type="radio" value="" name="list-radio"
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
									<label for="list-radio-license"
										class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Driver
										License </label>
								</div>
							</li>
						</ul>

						</p>
						<button @click="isOpen = false" class="px-2 py-2 text-blue-800 border border-blue-600 rounded">
							Cancel
						</button>
						<button class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded">
							Start training
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
export default {
	data() {
		return {
			isOpen: true,
		};
	},
};
</script>