#!/bin/bash
CUR_DIR=`pwd`
cd $CUR_DIR
npm install
cp -f package.json dist
cp -f README.md dist
cp index.js dist
cp -rf lib dist
cd dist
npm publish .
cd $CUR_DIR
