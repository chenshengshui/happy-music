#!/bin/bash

# 可以直接设置为开发分支，origin为远程地址
master="master"
origin="git@github.com:chenshengshui/happy-music.git" 

git fetch $origin
echo "Current fetch all Tags"

git pull $origin $master
echo "Current pull origin $master."

# 自动生成tag和修改版本号
npm version patch
conventional-changelog -p eslint -i CHANGELOG.md -s -r 0

git add CHANGELOG.md
git commit -m "docs: update changelog"

git push --follow-tags origin $master

echo "Git push origin $master"
echo "Release finished."