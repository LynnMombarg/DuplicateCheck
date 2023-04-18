<script setup>
import { ref } from 'vue'
import TheWelcome from './components/TheWelcome.vue'

let showwelcomecomponment = true
const user =  ref('Salesforce user')
const message = ref('Press the "Change message button" to change the message')


function toggleWelcomeComponent(){
    showwelcomecomponment = !showwelcomecomponment
    message.value = 'The button was pressed'
}
</script>

<template>

  <h1> Dashboard </h1>
  <p> logged in as {{ user }} </p>

  <h1> The component for doing a test API call: </h1>

  <button @click="toggleWelcomeComponent"> Toggle welcome component </button>
  <p> {{message}} </p>


  <div v-if="showwelcomecomponment"> <TheWelcome /> </div>
  <div v-else> Hidden </div>

</template>

<!--<template>-->
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
<!--</template>-->

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--}-->
<!--</style>-->
