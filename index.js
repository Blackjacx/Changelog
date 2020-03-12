const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec');
const io = require('@actions/io');

async function run() {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload
  console.log(`The event payload: ${JSON.stringify(payload, undefined, 2)})`)

  if (payload.pull_request == null || payload.action != "opened")
    throw Error(`The trigger for this action was not a pul request opened event.`)

  const prNumber = `${payload.number}`
  const changelogFolderPath = core.getInput('changelog-folder-path')

  console.log(`prNumber: ${prNumber}`)
  console.log(`changelogFolderPath: ${changelogFolderPath}`)

  await io.mkdirP('./changelog');
  await exec.exec('ls -la')
  await exec.exec('git add *')
  await exec.exec('git config --global user.email \"github-bot@ioki.com\"')
  await exec.exec('git commit -am \"Update Changelog\"')
  await exec.exec('git push')
}

try {
  run().then(function (result) {
    console.log('Done 🎉')
  }).catch(function (err) {
    // Whoops, something went wrong!
    console.error(err)
  })  
} catch (error) {
  core.setFailed(error.message)
}