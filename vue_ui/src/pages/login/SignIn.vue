<template>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <SignInHeader />
        <SignInBody />
        <SignInFooter />
    </div>
</template>

<script>
import SignInHeader from "@/pages/login/components/SignInHeader.vue";
import SignInBody from "@/pages/login/components/SignInBody.vue";
import SignInFooter from "@/pages/login/components/SignInFooter.vue";
import SignInButton from "@/pages/login/components/SignInButton.vue";

export default {
    name: "SignIn",
    components: { SignInFooter, SignInBody, SignInHeader, SignInButton },
};
</script>

<style></style>

