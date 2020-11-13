# buildstamp-binaries
Buildstamp binaries for MacOS, Linux and Windows

## Download binaries without installation
Get download links
```shell script
curl https://registry.npmjs.org/buildstamp-bin | grep -E -o 'https://registry.npmjs.org/buildstamp-bin/-/buildstamp-bin-\d+.\d+.\d+.tgz'
```
Download package by one of the links
```shell script
curl -o buildstamp.tgz https://registry.npmjs.org/buildstamp-bin/-/buildstamp-bin-1.0.0.tgz
```
Extract binaries
```shell script
tar --extract --file buildstamp.tgz
```

## Installation
Installation script requires [jq](https://github.com/stedolan/jq).

Linux and MacOS
```shell script
curl -o- https://raw.githubusercontent.com/qiwi/buildstamp/feat/bin-install/packages/bin/scripts/sh/install.sh | bash
```

If you use Windows, you can [download](#download-binaries-without-installation) package and find executable in `package/target/bin/buildstamp-win.exe`.
