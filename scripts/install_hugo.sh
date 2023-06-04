#!/usr/bin/env bash

set -x
set -e
set -u

DOWNLOAD_HOST="https://github.com/gohugoio/hugo/releases/download"
HUGO_VERSION="0.112.7"
CACHE_DIR="./cache"

mkdir -p ${CACHE_DIR}
curl -L ${DOWNLOAD_HOST}/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz \
  --output ./${CACHE_DIR}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz

tar -xvzf ./${CACHE_DIR}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz \
  -C ${CACHE_DIR}
./${CACHE_DIR}/hugo version
./${CACHE_DIR}/hugo new site ./${CACHE_DIR}/test-site
cp -Rv exampleSite/content/* ./${CACHE_DIR}/test-site/content/
rm -f ./${CACHE_DIR}/test-site/content/config.toml
cp -Rv exampleSite/config.toml ./${CACHE_DIR}/test-site/content/config.toml
cp -Rv archetypes  ./${CACHE_DIR}/test-site/themes/archetypes
cp -Rv assets  ./${CACHE_DIR}/test-site/themes/assets
cp -Rv images  ./${CACHE_DIR}/test-site/themes/images
cp -Rv layouts  ./${CACHE_DIR}/test-site/themes/layouts
cp -Rv static  ./${CACHE_DIR}/test-site/themes/static
./${CACHE_DIR}/hugo --source ./${CACHE_DIR}/test-site/
