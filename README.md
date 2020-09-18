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
buildstamp --out=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
Output in `some/path/b.json`:
```json
{
	"timestamp": "2020-08-27T15:12:07.699Z",
	"gitInfo": {
		"commitId": "cd9660293d69a5ca7559197aedd1fa5de1a939fe",
		"repoName": "qiwi/buildstamp.git"
	}
}
```
### Flags
Output is always printed to stdout

| Option              | Description                                             | Default                                |
|:--------------------|:--------------------------------------------------------|:---------------------------------------|
| --out.path          | path to generated file                                  | output is not written to a file        |
| --out.jsonSeparator | one of `tab`, `space`, `double-space`                   | `tab`                                  |
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
  git: {
    commitId: 'fc6e78b11ef4c7db1c8b89fa6b0d9b3ad4ad481d',
    repoName: 'qiwi/buildstamp.git'
  },
  docker: { imageTag: 'foo', bar: 'bar' },
  date: '2020-08-27T20:47:41.958Z'
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
