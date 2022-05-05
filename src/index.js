const { exec } = require("@actions/exec");
const core = require("@actions/core");
const github = require("@actions/github");

/** @type {string} */
const useremail = core.getInput("user-email");
/** @type {string} */
const username = core.getInput("user-name");
/** @type {string} */
const message = core.getInput("message");

async function run() {
  await exec("yarn build").catch((err) => {
    core.setFailed(err);
  });

  console.log("pushing to git!");

  await exec("git", ["config", "--global", "user.name", username]);
  await exec("git", ["config", "--global", "user.email", useremail]);
  await exec("git", ["add", "."]);
  await exec("git", ["commit", "-m", message]);
  await exec("git", ["push"]);
}

run();
