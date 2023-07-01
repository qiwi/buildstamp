#!/bin/bash

# Defaults
opt_date="true"
opt_git="true"
opt_ci="true"
opt_output="./buildstamp.json"

getFirstDefined () {
  while [ $# -gt 0 ]; do
    echo $1
    break
  done
}

# argv "parsing"
while [ $# -gt 0 ]; do
  if [[ $1 == *"--"* ]]; then
      k=$(echo "${1/--/}" | tr '-' '_')
      if [[ "$2" == "" ]]; then
        v=true
      else
        v="$2"
      fi

      if [[ k == "no_"* ]]; then
        k=${k:3}
        v=false
      fi
      declare opt_$k=$v
  fi
  shift
done

# Timestamp
if [[ $opt_date == "true" ]]; then
  date=$(date +"%Y-%m-%dT%H:%M:%S%z")
fi

# Git info
if [[ $opt_git == "true" ]]; then
  git_commit_id=$(git rev-parse HEAD)
  git_repo_url=$(git config --get remote.origin.url)
  re="([^./:]+\/[^./]+)(\.git)?$"
  if [[ $git_repo_url =~ $re ]]; then
      git_repo_name=${BASH_REMATCH[1]}
  fi
fi

# CI digest
if [[ $opt_ci == "true" ]]; then
  ci_run_id=$(getFirstDefined $BUILD_NUMBER $CI_JOB_ID $GITHUB_RUN_ID)

  if [[ $GITHUB_RUN_ID != "" ]]; then
    ci_run_url=$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID
  else
    ci_run_url=$(getFirstDefined $BUILD_URL $CI_JOB_URL)
  fi
fi

# Buildstamp render
# use jq?
for entry in "date" "git_commit_id" "git_repo_url" "git_repo_name" "ci_run_id" "ci_run_url"
do
  if [[ ${!entry} != "" ]]; then
    json=$json\\n'  '\"$entry\":' '\"${!entry}\",
  fi
done
json=\{${json%,}\\n\}

# Output
if [[ $opt_no_output == "" && $opt_output != "false" ]]; then
  echo $json > $opt_output
else
  echo $json
fi
