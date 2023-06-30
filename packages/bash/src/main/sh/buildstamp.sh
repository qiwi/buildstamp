#!/bin/bash

# Defaults
opt_date=true
opt_output="./buildstamp.json"

# argv "parsing"
while [ $# -gt 0 ]; do
  if [[ $1 == *"--"* ]]; then
      k=$(echo "opt_${1/--/}" | tr '-' '_')
      if [[ "$2" == "" ]]; then
        v=true
      else
        v="$2"
      fi
      declare $k=$v
  fi
  shift
done

if [[ $opt_no_date == "" ]]; then
  date=$(date +"%Y-%m-%dT%H:%M:%S%z")
fi

if [[ $opt_no_git == "" ]]; then
  git_commit_id=$(git rev-parse HEAD)
  git_repo_url=$(git config --get remote.origin.url)
  re="([^./:]+\/[^./]+)(\.git)?$"
  if [[ $git_repo_url =~ $re ]]; then
      git_repo_name=${BASH_REMATCH[1]}
  fi
fi

# Buildstamp render
# use jq?
for entry in "date" "git_commit_id" "git_repo_url" "git_repo_name"
do
  if [[ ${!entry} != "" ]]; then
    json=$json\\n'  '\"$entry\":' '\"${!entry}\",
  fi
done
json=\{${json%,}\\n\}

# Output
if [[ $opt_no_output == "" || $opt_output == "false" ]]; then
  echo $json > $opt_output
else
  echo $json
fi
