# Buildstamp monorepo
[![CI](https://github.com/qiwi/buildstamp/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/qiwi/buildstamp/actions/workflows/ci.yaml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/test_coverage)](https://codeclimate.com/github/qiwi/buildstamp/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/maintainability)](https://codeclimate.com/github/qiwi/buildstamp/maintainability)

Utility for generating buildstamp file, which contains build meta info like gitcommit hash, timestamp, repo name and so on. This file could be a part of some release artifact (npm-package, docker-image) and makes it self-descriptive.
```json
{
  "git": {
    "commitId": "007b8f715eb5670662d90f90cd1916398d1dfe98",
    "repoUrl": "https://github.com/qiwi/buildstamp",
    "repoName": "qiwi/buildstamp"
  },
  "docker": {
    "imageTag": "foo"
  },
  "date": "2020-11-05T15:16:35.904Z"
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
Buildstamp generator executables for MacOS, Windows and Linux. No need Node.js (npx) to be installed.
```shell script
./buildstamp-macos --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
