<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 16-05-2023-->

<template>
    <div class="flex justify-between rounded-md px-3 py-5 text-xl font-medium">
        <div class="flex items-center w-50">
            <div class="flex items-center w-50 px-2 rounded-md">
                <div class="w-10">
                    <table class="border">
                        <thead>
                        <tr>
                            <th class="border" v-for="column in this.record.columns">{{ column }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="border" v-for="value in this.record.values">{{ value }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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
        record: {
            columns: Array,
            values: Array,
        },
    },
    methods: {},
};
</script>
