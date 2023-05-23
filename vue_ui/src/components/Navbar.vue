<!--Authors: Diederik-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
    <div class="sticky top-0 z-10 flex-shrink-0 flex bg-white shadow">
        <div class="flex-1 pl-4 flex justify-between">
            <div class="flex items-center flex-shrink-0 px-4">
                <div class="flex overflow-hidden">
                    <div class="flex-none w-10 pr-1"><img alt="Plauti Logo" src="@/assets/plauti.svg">
                    </div>
                    <div class="flex-initial w-64 text-left leading-9 text-lg font-semibold text-slate-500">
                        <div class="animated">DCML <span
                                class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                                style="margin-top: -2px;"> beta </span></div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <Menu as="div" tabindex="-1"
                      class="px-4 py-4 border-l border-gray-300 cursor-pointer select-none hover:bg-gray-50 active:bg-sky-100">
                    <div>
                        <MenuButton class="flex items-center">
                            <div>
                                <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                                     data-v-d1d6a974="">
                                    <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAo1JREFUWAntmG1r01AUx//puifX1bW2q62bttvoNlHoGAxfTEFBEPTd8M0+gH6OfQw/hSD62gc2JvhA58Bqrbp1k67DVVrrJtiH5VxZQzEmubk3hUIOFJKck//55Z97by5VVh48bKLLwtNlvAzXhe7UW3Oddp02cMAdHgbmSE25Tku100DMa5CzlUqeP4uZRBS+UwOoHv7Gh68FZPN7trT+d5M06F5vD+5cS+Hy1Hhbr9T0BWzmdvD4RRp/avW2nN0TaWP67s2Ff4BPoOhBKC8rpEDPJmKYGo8YMlGe6mSEFOj5i3FLLPOz1urMxKRAR4KnzfqwfOSMtTozMWForzoBhwb7zfqwPNVRvWgIQ9fUFaHy68gSB9VRvWgIQxPA3kHZEofVOjMxKdDrGzmzPixvtc5MTAr0duE7NrJ5w16UpzoZIe2L+Oj5Wza2F1NJKIrSYms2m1hNZ/HsdaZ1TfRAGrTKhqevMnj/+Rum41EMq3uPn+re4+NWAcVSRZSz7X4p0IlYWF3KPPiULzJAPch4LIRavYHdYqkNwM6JEDR9lhfnkoiGRljvg3IVbzJb2C+VUakewe8bxGjAj7mZOMKBYVazo0KvqcMlu21/56fY+Ycp6B/C7aspJM6F7RjF7vmyu48nq2n8qBxya3CvHmORIO4tXRcCJsqJsVHcX7oB0uMNLmhyePnWFfT1Co2qFiPpkB7p8gQX9MKlSQz09/Hom9aSHunyBBd0KODj0bZcy6vLBU1rsRPBq8sFTTPeieDV5ZpRLzf/boxo5vd4uJ5X91nrjQYI+ERXt0jnIhc0vcb1dzn209Hq2CVxuzqGqjVyoTUvnD1ynXbWX03ddVrzwtkj12ln/dXUu9LpY+3RqpY1suktAAAAAElFTkSuQmCC"
                                            class="w-8 h-8 relative" alt="Profile picture">
                                </div>
                            </div>
                            <div class="ml-2">
                                <p
                                        class="text-sm font-medium text-gray-700 group-hover:text-gray-900 leading-none">
                                    {{ this.username }}</p>
                                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">{{
                                    this.email
                                    }}</p></div>
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                                class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">

                                <MenuItem>
                                    <button @click="signOut"
                                            class="bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm">
                                        Sign out
                                    </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";

export default {
    name: "Navbar",
    components: {Menu, MenuItem, MenuItems, MenuButton},
    data() {
        return {
            username: '',
            email: ''
        }
    },
    async mounted() {
        const user = await this.$store.state.user;
        this.username = user.username;
        this.email = user.email;
    },
    methods: {
        signOut() {
            this.$parent.signOut();
        }
    },
}
</script>

<style scoped>

</style>