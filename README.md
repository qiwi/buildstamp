# Buildstamp monorepo
[![Build Status](https://travis-ci.com/qiwi/buildstamp.svg?branch=master)](https://travis-ci.com/qiwi/buildstamp)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/test_coverage)](https://codeclimate.com/github/qiwi/buildstamp/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/maintainability)](https://codeclimate.com/github/qiwi/buildstamp/maintainability)

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
### [buildstamp](https://github.com/qiwi/buildstamp/tree/master/packages/core)
Buildstamp generator utility supporting native JS and CLI API
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
###  [buildstamp-bin](https://github.com/qiwi/buildstamp/tree/master/packages/bin)
Buildstamp generator executables for MacOS, Windows and Linux. They don't need Node.js for executing.
```shell script
./buildstamp-macos --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
