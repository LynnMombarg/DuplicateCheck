<template>
	<button @click="deleteModel"
		class="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
		<span class="absolute left-0 inset-y-0 flex items-center pl-3"><i
				class="fa-brands fa-salesforce text-white mr-1"></i></span>
		Delete model test
	</button>
</template>
  
<script>
export default {
	name: "DeleteModelButton",
	methods: {
		deleteModel() {
			const modelId = 'id1';
			fetch("http://localhost:8001/model?modelId=" + modelId, {
				method: 'DELETE'
			})
			.then(response => {
				console.log(response);
			});
		}
	}
};
</script>
  
<style scoped></style>