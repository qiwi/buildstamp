# buildstamp
> A small utility for gathering build details

# Install
```bash
yarn add buildstamp
# or
npm i buildstamp
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
```shell
npx buildstamp --output='buildstamp.json' --extra='{"foo": "bar"}'
```

| Flag             | Description                 | Default           | 
|------------------|-----------------------------|-------------------|
| `--output`, `-o` | Duildstamp file destination | `buildstamp.json` |
| `--cwd`          | Directory to apply          | `process.cwd()`   |
| `--git`          | Collect git info            | `true`            |
| `--date`         | Attach ISO8601 date         | `true`            |
| `--extra`        | JSON mixin to inject        |                   |
| `--help`         | Print help info             |                   |               


# License
[MIT](./LICENSE)
