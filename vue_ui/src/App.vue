<script setup>
import SignIn from "@/components/SignIn.vue";
import SignInHeader from "@/components/SignInHeader.vue";
import SignInFooter from "@/components/SignInFooter.vue";
import Dashboard from "@/components/Dashboard.vue";
</script>

<template>
  <main>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <router-view></router-view>
    </div>
  </main>
</template>

<style>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

:root {
  --v-onboarding-overlay-z: 30;
  --v-onboarding-step-z: 40;
}
</style>
