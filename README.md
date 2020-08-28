# @qiwi/buildstamp
Utility for gathering build details
# Installation
```shell script
yarn add @qiwi/buildstamp
```
```shell script
npm i @qiwi/buildstamp
```
# Usage
## CLI
You should specify path separator of your system in environment variable SEP before using
```shell script
export CI=/
```
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
| Option            | Description                           | Default                         |
|:------------------|:--------------------------------------|:--------------------------------|
| --out             | path to generated file                | stdout                          |
| --git             | add git data to output                | output doesn't contain git data |
| --docker.imageTag | working directory                     | process.cwd()                   |
| --date.format     | iso or instant                        | output doesn't contain date     |
| --date.value      | any valid input for Date constructor  | current timestamp               |

## API
API functions accept the same options as cli
### create(options, env)
Returns buildstamp
```javascript
import { create } from '@qiwi/buildstamp'

const stamp = create({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo', bar: 'bar'}
})
console.log(stamp)
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
### write(options, env)
Creates and writes buildstamp to a file. Parameter `out` is required.
```javascript
import { write } from '@qiwi/buildstamp'

write({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo', bar: 'bar'},
    out: 'some/path/stamp.json'
})
```
Output in `some/path/stamp.json`:
```json
{
  "git": {
    "commitId": "fc6e78b11ef4c7db1c8b89fa6b0d9b3ad4ad481d",
    "repoName": "qiwi/buildstamp.git"
  },
  "docker": { "imageTag": "foo", "bar": "bar" },
  "date": "2020-08-27T20:47:41.958Z"
}
```
### print(options, env)
Creates and prints buildstamp to stdout.
```javascript
import { print } from '@qiwi/buildstamp'

print({
    git: true,
    date: { format: 'iso' },
    docker: { imageTag: 'foo', bar: 'bar'},
    out: 'some/path/stamp.json'
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

