#!/bin/sh

programname=$0

function usage {
    echo "usage: $programname language"
    exit 1
}

if [ "$#" -eq 0 ]
then
    usage >&2
fi

LANGUAGE="${1}"

# assume English as a stable base
cp -r "./src/en" "./src/${LANGUAGE}"
mv "./src/${LANGUAGE}/en.11tydata.ts" "./src/${LANGUAGE}/${LANGUAGE}.11tydata.ts"
