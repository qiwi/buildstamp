# @qiwi/buildstamp-cli
> golang ported Buildstamp CLI

## Install
**Precompiled**
```shell
# fill the required tag and platform
# like 2023.6.27-qiwi.buildstamp-bin.1.0.2-f0 and darwin-amd64
curl 'https://github.com/qiwi/buildstamp/releases/download/2023.6.27-qiwi.buildstamp-bin.1.0.2-f0/buildstamp-darwin-amd64.tar.gz' | tar -xvz --strip-components=1 -С . && ./buildstamp && rm ./buildstamp
```

**Build locally**  

```shell
GOBIN=$(pwd) go install github.com/qiwi/buildstamp/packages/bin/src/main/go@$(curl 'https://api.github.com/repos/qiwi/buildstamp/commits/2023.7.2-qiwi.buildstamp-bin.1.6.0-f0' | jq -r '.sha')
```

**As a module**
```shell
go get github.com/qiwi/buildstamp/packages/bin@$(curl 'https://api.github.com/repos/qiwi/buildstamp/commits/2023.7.2-qiwi.buildstamp-bin.1.6.0-f0' | jq -r '.sha')
```

## Usage
### CLI
```shell
buildstamp [opts]
```
```json
{
 "date": "2023-06-30T18:09:59+0300",
 "git_commit_id": "6f355e0a346e9d09786f528cd7c869f9840a2150",
 "git_repo_url": "git@github.com:qiwi/buildstamp.git",
 "git_repo_name": "qiwi/buildstamp"
}
```

| Flag        | Description                 | Default           | 
|-------------|-----------------------------|-------------------|
| `--output`  | Buildstamp file destination | `buildstamp.json` |
| `--cwd`     | Working directory           | `process.cwd()`   |
| `--git`     | Collect git info            | `true`            |
| `--ci`      | Capture CI digest           | `true`            |
| `--date`    | Attach ISO8601 date         | `true`            |
| `--extra`   | JSON mixin to inject        | `{}`              |

### Go API
```go
package main

import (
	"github.com/qiwi/buildstamp/packages/bin/src/main/go/buildstamp"
	"log"
)

func main() {
	var opts = buildstamp.BuildstampOpts{
		true,
		true,
		true,
		"{}",
		"/Users/antongolub/projects/test",
	}
	log.Print(buildstamp.GetBuildstamp(opts))
}
```

## License
[MIT](./LICENSE)
