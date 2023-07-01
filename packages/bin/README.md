# @qiwi/buildstamp-cli
> golang ported Buildstamp CLI

## Usage
```shell
curl 'https://github.com/qiwi/buildstamp/releases/download/2023.6.27-qiwi.buildstamp-bin.1.0.2-f0/buildstamp-darwin-amd64.tar.gz' | tar -xvz --strip-components=1 -С . && ./buildstamp && rm ./buildstamp
```
Output:
```json
{
 "date": "2023-06-30T18:09:59+0300",
 "git_commit_id": "6f355e0a346e9d09786f528cd7c869f9840a2150",
 "git_repo_url": "git@github.com:qiwi/buildstamp.git",
 "git_repo_name": "qiwi/buildstamp"
}
```

### CLI
```shell
buildstamp [opts]
```
| Flag        | Description                 | Default           | 
|-------------|-----------------------------|-------------------|
| `--output`  | Buildstamp file destination | `buildstamp.json` |
| `--git`     | Collect git info            | `true`            |
| `--date`    | Attach ISO8601 date         | `true`            |
| `--extra`   | JSON mixin to inject        | `{}`              |


## License
[MIT](./LICENSE)
