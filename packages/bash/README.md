# buildstamp
> poor implementation in bash

# Install
```bash
curl -L "https://raw.githubusercontent.com/qiwi/buildstamp/master/packages/bash/src/main/sh/buildstamp.sh" -o buildstamp.sh
```

## Usage
### CLI
```shell
sh .buildstamp.sh --output='buildstamp.json'
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

| Flag        | Description                 | Default           | 
|-------------|-----------------------------|-------------------|
| `--output`  | Duildstamp file destination | `buildstamp.json` |
| `--git`     | Collect git info            | `true`            |
| `--ci`      | Capture CI digest           | `true`            |
| `--date`    | Attach ISO8601 date         | `true`            |


# License
[MIT](LICENSE)
