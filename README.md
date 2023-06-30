# buildstamp
[![CI](https://github.com/qiwi/buildstamp/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/qiwi/buildstamp/actions/workflows/ci.yaml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/test_coverage)](https://codeclimate.com/github/qiwi/buildstamp/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b14a2a44e024ca0b2771/maintainability)](https://codeclimate.com/github/qiwi/buildstamp/maintainability)

A small utility for generating `buildstamp` file, which contains various build info like timestamp, repo name, git commit and so on. This file could be a part of some release artifact (npm-package, docker-image) and makes it self-descriptive.
```json
{
  "date":             "2020-11-05T15:16:35.904Z",
  "docker_image_tag": "foo",
  "git_commit_id":    "007b8f715eb5670662d90f90cd1916398d1dfe98",
  "git_rep_url":      "https://github.com/qiwi/buildstamp.git",
  "git_repo_name":    "qiwi/buildstamp"
}
```

## Usage
### JS/TS API
```ts
import {buildstamp} from '@qiwi/buildstamp'

await buildstamp({
  output: 'buildstamp.json',  // filepath or `console` or `false` to disable
  git: true,                  // to capture git digest
  ci: true,                   // to collect basic CICD info
  date: true,                 // to attach the current iso8601 date
  extra: {                    // Object.assign mixin
    foo: 'bar'
  }
})
// returns a plain object, so you're able to process it in any way
```

### CLI
There are a pair of options: with or w/o Node.js on board.
### npx
```shell
npx buildstamp --output='buildstamp.json'
```

### binary
```shell
# fetch and call golang-ported binary

curl 'https://github.com/qiwi/buildstamp/releases/download/2023.6.27-qiwi.buildstamp-bin.1.0.2-f0/buildstamp-darwin-amd64.tar.gz' | tar -xvz --strip-components=1 -С . && ./buildstamp && rm ./buildstamp
```

# License
[MIT](./LICENSE)
