#!/bin/sh

echo "Next.js build launched..."
yarn build

echo "Coping public and static files"
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

echo "Starting the standalone production server"
exec su -c "yarn start" node
