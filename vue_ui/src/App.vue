<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>

</script>

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