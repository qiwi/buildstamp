# buildstamp-binaries
Buildstamp binaries for MacOS, Linux and Windows

## Downloading
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
