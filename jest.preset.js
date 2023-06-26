const nxPreset = require("@nx/jest/preset").default;

const globalConf = {
  collectCoverage: true,
  // show coverage for all files
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
  verbose: true,
  coverageDirectory: `${process.env.NX_WORKSPACE_ROOT}/coverage/${process.env["NX_TASK_TARGET_PROJECT"]}`,
};

module.exports = { ...nxPreset, ...globalConf };
