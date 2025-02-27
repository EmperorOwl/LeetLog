#!/bin/sh

if [ "$APP_ENV" = "prod" ]; then
    npm run build
    npm start
else
    echo "Skipping build"
    npm run dev
fi