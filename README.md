# @qiwi/buildstamp
Utility for gathering build-time data
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
buildstamp --out=some/path/b.json --git docker.imageTag=foo --date.format=iso
```
Output in `some/path/b.json`:
```json
{
	"timestamp": "2020-08-27T15:12:07.699Z",
	"gitInfo": {
		"commitId": "cd9660293d69a5ca7559197aedd1fa5de1a939fe",
		"repoName": "qiwi/buildstamp.gitInfo"
	}
}
```
###Options

- `--out` path to generated file, default is stdout
- `--git` add git data to output
- `--cwd` a working directory, default is process.cwd()
- `--docker.imageTag` image tag
- `--date.format` adds date info to stamp, iso or instant
- `--date.value` any valid input for Date constructor, default is current time

## API
API functions accept the same options as cli
### create(options, env)
Returns buildstamp
```javascript
import { create } from '@qiwi/buildstamp'

const stamp = create({ git: true, date: { format: 'iso' }, docker: { imageTag: 'foo', bar: 'bar'}}, { SEP: '/' })
console.log(stamp)
/*
{
  gitInfo: {
    commitId: 'fc6e78b11ef4c7db1c8b89fa6b0d9b3ad4ad481d',
    repoName: 'qiwi/buildstamp.git'
  },
  dockerInfo: { imageTag: 'foo', bar: 'bar' },
  timestamp: '2020-08-27T20:47:41.958Z'
}
*/
```
### print(options, env)
```javascript
import { print } from '@qiwi/buildstamp'

print({ git: true, date: { format: 'iso' }, docker: { imageTag: 'foo', bar: 'bar'}}, { SEP: '/' })
/*
{
  gitInfo: {
    commitId: 'fc6e78b11ef4c7db1c8b89fa6b0d9b3ad4ad481d',
    repoName: 'qiwi/buildstamp.git'
  },
  dockerInfo: { imageTag: 'foo', bar: 'bar' },
  timestamp: '2020-08-27T20:47:41.958Z'
}
*/
```

