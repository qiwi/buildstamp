# Buildstamp monorepo
Utility for generating buildstamp file, which contains build meta info like gitcommit hash, timestamp, repo name and so on. This file could be a part of some release artifact (npm-package, docker-image) and makes it self-descriptive.
```json
{
  "git": {
    "commitId": "fc6e78b11ef4c7db1c8b89fa6b0d9b3ad4ad481d",
    "repoName": "qiwi/buildstamp.git",
    "repoUrl": "https://github.com/qiwi/buildstamp.git"
  },
  "docker": {
    "imageTag": "foo"
  },
  "date": "2020-08-27T20:47:41.958Z"
}
```
## Packages
### [core](https://github.com/qiwi/buildstamp/tree/master/packages/core)
Package with buildstamp CLI and API
```javascript
import { execute } from 'buildstamp'

const stamp = execute({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo' }
})
```
```shell script
buildstamp --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
###  [bin](https://github.com/qiwi/buildstamp/tree/master/packages/bin)
Buildstamp utility executables for MacOS, Windows and Linux. They don't need Node.js for executing.
```shell script
./buildstamp-macos --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
