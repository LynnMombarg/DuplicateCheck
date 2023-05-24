module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
      },
  };