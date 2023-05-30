<!--Author(s): Marloes-->
<!--Jira-task: 132, 133, 134-->
<!--Sprint: 3-->
<!--Last modified: 16-05-2023-->

<template>
    <div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
        <div class="flex items-center w-full">
            <div class="flex items-center w-full px-2 rounded-md">
                    <table class="w-full">
                        <tbody class="flex flex-col w-full">
                            <tr v-for="column in this.record1.columns"
                            style="border-top-width: 1px; border-bottom-width: 1px; border-color: white;"
                            class="flex justify-between w-full rounded-md" :class="getRowColor(column)">
                                <td class="column-cell">
                                    {{ column }}
                                </td>
                                <td class="column-cell">
                                    {{ this.record1.values[this.record1.columns.indexOf(column)] }}
                                </td>
                                <td class="column-cell">
                                    {{ this.record2.values[this.record2.columns.indexOf(column)] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</template>

<script>
import OverviewDropdownComponent from "@/pages/overview/components/OverviewDropdownComponent.vue";

export default {
    name: "RecordModel",
    components: {OverviewDropdownComponent},
    props: {
        record1: {
            columns: Array,
            values: Array,
        },
        record2: {
            columns: Array,
            values: Array,
        },
    },
    methods: {
        getRowColor(column) {
            if (this.record1.values[this.record1.columns.indexOf(column)] !== this.record2.values[this.record2.columns.indexOf(column)]) {
                return "record-different";
            } else {
                return "bg-gray-100";
            }
        }
    },
};
</script>

<style>
.column-cell {
    width: 33%;
    margin: 0.25rem;
}
.record-different {
    background-color: rgb(249, 105, 0); /* Replace 0.2 with your desired opacity value (range: 0 to 1) */
}
.record-same {
    background-color: rgb(137, 147, 124); /* Replace 0.2 with your desired opacity value (range: 0 to 1) */
}
</style>
