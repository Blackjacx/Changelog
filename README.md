# Changelog Github Action (JS)

In our project we maintained a CHANGELOG.md file since the beginning. Now as we get more and more developers and have multiple pull requests the changelog entries produce merge conflicts for almost each PR and this multiple times. This means we hav to rebase a lot which is annoying. This GitHub action to the rescue. It writes the changelog entry in the format `* [#2070](https://github.com/<owner>/<repo>/pull/2070): My awesome feature - [@PRAuthor](https://github.com/PRAuthor).` into the text file `<project_root>/changelogs/<pr_number>.txt` on the PR branch and commits this change using a proper commit message. The file is named using the PR number. Due to the uniqueness of PR numbers, merge conflicts cannot happen anymore.

On release time these changelog files have to be collected and the entries extracted. We do this using our fastlane release script. In Fastlane we have access to the plugin [fastlane-plugin-changelog](https://github.com/pajapro/fastlane-plugin-changelog) which can easily modify the CHANGELOG.md file and stamp a new version there using the extracted changelog entries.

## Inputs

### `changelog-folder-path`

**Required** The folder, relative top the project path, where the changelog files are stored. Default `changelog`.

## Example usage

```
uses: blackjacx/changelog@master
with:
  changelog-folder-path: 'changelog'
```

## License

This software is available under the MIT license. See [LICENSE](LICENSE) for details.