<template>
  <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-md relative">
    <div class="bg-white py-4 px-4 shadow sm:rounded-lg">
      <h2 class="text-left text-xl font-extrabold text-slate-800">
        Sign in to your account
      </h2>
      <p class="mt-1 block text-left text-sm text-slate-500">
        Sign in securely using your Salesforce Production account
      </p>
      <SignInButton />
    </div>
  </div>
</template>

<script>
import SignInButton from "@/pages/login/components/SignInButton.vue";

export default {
  name: "SignInBody",
  components: { SignInButton },
};
</script>