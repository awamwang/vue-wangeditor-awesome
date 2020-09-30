#!/bin/bash

github_release() {
  echo "Release to Github ..."
  export CONVENTIONAL_GITHUB_RELEASER_TOKEN=$GH_TOKEN
  npm run github-release
}

github_release