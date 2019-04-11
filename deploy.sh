#!/bin/sh

echo 'Cleaning up...'
rm -rf dist

echo 'Rebuilding...'
npm run build

echo 'Deploying...'
sudo cp -r ./dist/. /var/www/dapp

echo 'Deployed!'
