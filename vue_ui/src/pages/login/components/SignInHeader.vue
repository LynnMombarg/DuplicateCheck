<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="flex overflow-hidden py-2 px-2 bg-white shadow sm:rounded-lg">
      <div class="flex-none w-10 pr-1">
        <img alt="Plauti Logo" src="/src/assets/plauti.svg" /><!--v-if-->
      </div>
      <div
        class="flex-initial w-64 text-left leading-9 text-lg font-semibold text-slate-500"
      >
        <div class="animated">
          Duplicate Check ML
          <span
            class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
            style="margin-top: -2px"
          >
            beta
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInHeader",
};
</script>
