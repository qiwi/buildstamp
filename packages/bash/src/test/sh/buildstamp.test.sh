#!/bin/bash

it () {
  if [[ $2 == *$3* || ($4 == "!" && $2 != *$3*) ]]; then
    echo $1 "- ok"
  else
    echo $1 "- failed"
    exit 1
  fi
}

describe () {
  echo $1
}

cwd=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
script=$cwd"/../../main/sh/buildstamp.sh"

describe "bash ported CLI"
it "returns default output" $(sh $script --no-output | tr -d "\n ") "qiwi\/buildstamp"

it "handles --no-* flags" $(sh $script --no-output --no-git --no-date | tr -d "\n ") "git_repo_url" "!"

echo "Success!"
exit 0
