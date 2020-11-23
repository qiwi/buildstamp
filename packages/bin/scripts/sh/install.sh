#!/bin/bash

if [ "$OSTYPE" == linux-gnu ]; then
  OS=linux
elif [[ "$OSTYPE" == darwin* ]]; then
  OS=macos
else
  echo "Unsupported OS, only MacOS and Linux are supported"
  exit 1
fi

PACKAGE_ARCHIVE_NAME=buildstamp.tgz

echo Getting the latest version...
LATEST_VERSION=$(curl --progress-bar https://registry.npmjs.org/buildstamp-bin | jq -r '."dist-tags".latest')

echo Downloading package of the latest version...
curl --progress-bar -o "$PACKAGE_ARCHIVE_NAME" https://registry.npmjs.org/buildstamp-bin/-/buildstamp-bin-$LATEST_VERSION.tgz

echo Extracting...
tar --extract --file "$PACKAGE_ARCHIVE_NAME"

if [ "$1" == --run ]; then
  shift
  ./package/target/bin/buildstamp-$OS "$@"
else
  echo Copying binary to /usr/local/bin...
  cp package/target/bin/buildstamp-$OS /usr/local/bin/buildstamp
fi

echo Cleaning up...
rm -rf package "$PACKAGE_ARCHIVE_NAME"

echo Done!
