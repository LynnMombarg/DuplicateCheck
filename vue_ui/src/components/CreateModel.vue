<template>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <CreateModelButton/>
    </div>
</template>

<script>

import CreateModelButton from "@/components/CreateModelButton.vue";

export default {
    name: "CreateModel",
    components: {CreateModelButton},
};
</script>