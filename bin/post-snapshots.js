#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const util = require('util');
const zlib = require('zlib');
const gunzip = util.promisify(zlib.gunzip);

// collect from:
//  - ./build-artifacts/1/ui-test-results -> ./test-results/
//  - ./build-artifacts/1/ui-snapshots -> ./test/ui/

const collections = [
  {
    from: './build-artifacts/1/ui-test-results',
    to: './test-results',
  },
  {
    from: './build-artifacts/1/ui-snapshots',
    to: './test/ui',
  },
];

(async () => {
  const { globby } = await import('globby');

  await Promise.all(
    collections.map(async (collection) => {
      const { from, to } = collection;

      const zipPaths = await globby(`${from}/**/*.png.gz__`);

      await Promise.all(
        zipPaths.map(async (zipPath) => {
          const destination = zipPath.replace('.gz__', '');

          console.log(`un-gzip ${zipPath} -> ${path.basename(destination)}`);

          const zipped = await fsp.readFile(zipPath);
          const inflated = await gunzip(zipped);
          await fsp.writeFile(destination, inflated);
          await fsp.unlink(zipPath);
        })
      );

      const fromPaths = await globby(`${from}/**/*.png`);

      await Promise.all(
        fromPaths.map(async (fromPath) => {
          const destination = fromPath.replace(from, to);

          const folderExists = fs.existsSync(path.dirname(destination));

          if (!folderExists) {
            console.log('mkdir -p', path.dirname(destination));
            await fsp.mkdir(path.dirname(destination), { recursive: true });
          }

          console.log(`mv ${fromPath} ${destination}`);
          await fsp.rename(fromPath, destination);
        })
      );
    })
  );
})();
