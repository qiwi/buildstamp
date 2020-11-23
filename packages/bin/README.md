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

## Usage
If you use Windows, you can [download](#download-binaries-without-installation) package and find executable in `package/target/bin/buildstamp-win.exe`.

Installation on Linux or MacOS (requires [jq](https://github.com/stedolan/jq)).
```shell script
curl -o- https://raw.githubusercontent.com/qiwi/buildstamp/master/packages/bin/scripts/sh/install.sh | bash
```
Utility call
```shell script
buildstamp --out.path=some/path/b.json --git --docker.imageTag=foo --date.format=iso
```
Using without installation
```shell script
curl -o- https://raw.githubusercontent.com/qiwi/buildstamp/master/packages/bin/scripts/sh/install.sh | bash -s -- --run --git --out.path=./buildstamp.json --docker.imageTag=foo
```
Pass necessary arguments after `--run`
