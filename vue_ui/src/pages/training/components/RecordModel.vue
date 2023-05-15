<!--Author(s): Marloes-->
<!--Jira-task: 132-->
<!--Sprint: 3-->
<!--Last modified: 15-05-2023-->

<template>
  <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Value 1</th>
        <th>Value 2</th>
        <th>Value 3</th>
        <th>Value 4</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "RecordModel",
  components: {},
  data() {
    return {
      columns: [],
      values: [],
    };
  },
  methods: {},
};
</script>
