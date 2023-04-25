<template>
  <button
    @click="login"
    class="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3"
      ><i class="fa-brands fa-salesforce text-white mr-1"></i
    ></span>
    Salesforce Sign-in
  </button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SignInButton",
  methods: {
    login() {
      let popupWindow = window.open(
        "http://localhost:8001/auth/login",
        "Login",
        "width=800,height=600"
      );
      window.addEventListener("message", (event) => {
        console.log(event);
        if (event.origin !== "http://localhost:8001") return;
        if (event.data.message === "success") {
            popupWindow.close();
            console.log(event.data.token);
        }
      });
    },
  },
};
</script>

<style scoped></style>
