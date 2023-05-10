<template>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <SignInHeader/>
        <SignInBody/>
        <SignInFooter/>
    </div>
</template>

<script>
import SignInHeader from "@/components/SignInHeader.vue";
import SignInBody from "@/components/SignInBody.vue";
import SignInFooter from "@/components/SignInFooter.vue";
import SignInButton from "@/components/SignInButton.vue";

export default {
    name: "SignIn",
    components: {SignInFooter, SignInBody, SignInHeader, SignInButton},
};
</script>