# buildstamp
Utility for gathering build details
# Installation
```shell script
yarn add buildstamp
```
```shell script
npm i buildstamp
```
# Usage
## CLI
```shell script
buildstamp --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
Output in `some/path/b.json`:
```json
{
  "git": {
    "commitId": "007b8f715eb5670662d90f90cd1916398d1dfe98",
    "repoUrl": "https://github.com/qiwi/buildstamp.git",
    "repoName": "qiwi/buildstamp"
  },
  "docker": {
    "imageTag": "foo"
  },
  "date": "2020-11-05T15:16:35.904Z"
}
```
### Flags
Output is always printed to stdout

| Option              | Description                                             | Default                                |
|:--------------------|:--------------------------------------------------------|:---------------------------------------|
| --out.path          | path to generated file                                  | output is not written to a file        |
| --out.jsonSeparator | one of `tab`, `space`, `double-space`, `no-space`       | `tab`                                  |
| --git               | add git data to output                                  | git data is omitted                    |
| --docker.imageTag   | docker image tag, will be added to output, if exists    | docker info is omitted                 |
| --date.format       | add date to output, one of `iso` or `instant`           | date is omitted                        |
| --date.value        | any valid input for Date constructor                    | `Date.now()`                           |
| --cwd               | working directory                                       | `process.cwd()`                        |

## API
API functions accept the same options as cli
### execute(options, env)
Creates and returns buildstamp

Get buildstamp
```javascript
import { execute } from 'buildstamp'

const stamp = execute({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo', bar: 'bar'}
})
/*
{
  "git": {
    "commitId": "007b8f715eb5670662d90f90cd1916398d1dfe98",
    "repoUrl": "https://github.com/qiwi/buildstamp.git",
    "repoName": "qiwi/buildstamp"
  },
  "docker": {
    "imageTag": "foo".
    "bar": "bar"
  },
  "date": "2020-11-05T15:16:35.904Z"
}
*/
```
Write buildstamp to file
```javascript
import { execute } from 'buildstamp'

execute({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo', bar: 'bar'},
    out: {
      path: 'some/path/stamp.json'
    }
})
```
Output in `some/path/stamp.json`:
```json
{
	"git": {
		"commitId": "19128459495e461b3c2b64704566f6aaac193ce1",
		"repoUrl": "https://github.com/qiwi/buildstamp.git",
		"repoName": "qiwi/buildstamp"
	},
	"docker": {
		"imageTag": "foo",
		"bar": "bar"
	},
	"date": "2020-09-04T19:53:03.790Z"
}
```
### readBuildstamp(path)
Safely parses and returns buildstamp by given path. Returns `undefined` on error.
```javascript
import { readBuildstamp } from 'buildstamp'

const stamp = getBuildstamp('some/path')
```
