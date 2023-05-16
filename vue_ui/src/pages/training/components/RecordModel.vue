<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
    <table>
        <thead>
        <tr>
            <th v-for="column in this.record.columns">{{ column }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td v-for="value in this.record.values">{{ value }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "RecordModel",
    components: {},
    props: {
        record: {
            columns: Array,
            values: Array,
        },
    },
    methods: {},
};
</script>
