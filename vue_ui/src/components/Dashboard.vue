<template>
  <Banner/>
  <model-overview :models="models"/>
</template>
<script setup>

const models = [
  {
    name: 'model1',
    table: 'table1',
    description: 'informatie over model1',
  },
  {
    name: 'model2',
    table: 'table',
    description: 'extra informatie over model2',
  },
  {
    name: 'model3',
    table: 'table',
    description: 'extra informatie over model3',
}
]
</script>

<script>
import Banner from "@/components/Banner.vue";
import ModelOverview from "@/components/ModelOverview.vue";

export default {
  name: "Dashboard",
  components: {
    Banner,
    ModelOverview,
  },
  props: {
    models: {
      type: Array,
      required: true
    }
  }
};
</script>


