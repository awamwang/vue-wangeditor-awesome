#!/bin/bash
version_pattern='v?[0-9]+\.[0-9]+\.[0-9]+'

setup_git() {
  local name=$(cat package.json | jq 'author.name')
  local email=$(cat package.json | jq 'author.email')

  git config --global user.email ${email}
  git config --global user.name ${name}
}

npm_berfore_publish() {
  if [[ $TRAVIS_TAG =~ $version_pattern ]]; then
    echo "Npm publish ${TRAVIS_TAG}..."
    npm run prepublish-version
    npm run changelog
  fi
}

commit_website_files() {
  echo "Committing to master branch..."
  git checkout master
  git add *

  if [ $TRAVIS_EVENT_TYPE == "cron" ]; then
    git commit --message "build(travis): $TRAVIS_BUILD_NUMBER [cron]"
  elif [ $TRAVIS_EVENT_TYPE == "api" ]; then
    git commit --message "build(travis): $TRAVIS_BUILD_NUMBER [custom]"
  else
    git commit --message "build(travis): $TRAVIS_BUILD_NUMBER"
  fi
}

upload_files() {
  echo "Pushing to master branch..."
  repo_name=$(cat package.json | jq '.projectName')
  if [ $repo_name == 'null' ]; then  
    repo_name=$(cat package.json | jq '.name')
  fi 
  name=$(cat package.json | jq '.name')
  git push --force --quiet "https://${GH_TOKEN}@github.com/awamwang/${repo_name}.git" master > /dev/null 2>&1
}

setup_git
npm_berfore_publish
commit_website_files
upload_files