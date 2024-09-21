# @esm-polyfill/react@18.3.1

[react](https://www.npmjs.com/package/react) in ESM format.


## Install

Install:

```sh
npm i react@esm-polyfill/react
# specific version
npm i react@esm-polyfill/react#semver:^18.3.1
```

## Use 

Reference:

```ts
import react from 'react'
import * as R from 'react'

// ...

```

## How this package was created?



Dependencies for version 18.3.1 in `package.json` was added in
following manner:

```json
{
  "devDependencies": {
    "...": "...",

    "react-18.3.1": "npm:react@18.3.1",
    "@types/react-18.3.1": "npm:@types/react@18.3"
  }
}
```


Then orginal `package.json`'s, LICENSE's,.. etc. source files 
were copied to target directory:


```sh

mkdir -p react-18.3.1

# copy .d.ts
cd node_modules/@types/react-18.3.1
cp -n --parents *.d.ts ../../../react-18.3.1
cd ../../../

# copy types license, package.json and readme
cp -n node_modules/@types/react-18.3.1/package.json react-18.3.1/package-types.json
cp -n node_modules/@types/react-18.3.1/README.md    react-18.3.1/README-types.md
cp -n node_modules/@types/react-18.3.1/LICENSE      react-18.3.1/LICENSE-types

# copy js license, package.json and readme
cp -n node_modules/react-18.3.1/package.json react-18.3.1/package-js.json
cp -n node_modules/react-18.3.1/README.md    react-18.3.1/README-js.md
cp -n node_modules/react-18.3.1/LICENSE      react-18.3.1/LICENSE-js



```

Then core cjs files are transformed by rollup
(see [rollup config file](./rollup.config-18.3.1.mjs)):


```sh

# transform cjs modules to mjs and save them to react-18.3.1/esm
# (but only those without conditional requires which will be 
# transformed manually)
npx rollup -c rollup.config-18.3.1.mjs

```

Top level files were manually converted:

```sh

# copy modules which will be transformed manually
# (top level modules with conditional require's)
mkdir -p react-18.3.1/production
cp -n node_modules/react-18.3.1/*.js react-18.3.1/production
mkdir -p react-18.3.1/development
cp -n node_modules/react-18.3.1/*.js react-18.3.1/development

# unfortunately esm/react.development.js and esm/react.production.min.js
# must be manually edited to export namespace.
mkdir -p react-18.3.1/esm-overrides
cp -n react-18.3.1/esm/react.*.js react-18.3.1/esm-overrides

```

in every file abowe change:

```js

// from:
module.exports = require('./cjs/...')
// to:
export * from '../esm/...'
export { default } from '../esm/...'

// and from:
const react = require('@esm-polyfill/react')
// to:
import * as S from '@esm-polyfill/react'

```

`package.json` was edited to point to new `exports`, `dependencies`
and `devDependencies`.

```json
{
  "name": "@esm-polyfill/react",
  "description": "react in CJS ESM with DTS ready to use",
  "keywords": [
    "react", "esm"
  ],
  "version": "18.3.1",
  "repository": {
    "type": "git",
    "url": "https//github.com/esm-polyfill/react"
  },
  "license": "MIT",
  "files": [
    "react-18.3.1",
    "package.json",
    "README.md"
  ],
  "exports": "... nice scoped exports ...",
  "...": "..."
}
```

Why we ended with such dependencies? Because:

* `loose-envify` was used for `production` or `development` 
  contexts, but those was incorporated into package `exports`,
  so is not neccessary.
* `@types/prop-types` does not have .js so is left as is
* `csstype` does not have .js so is left as is



## Bugfixes

When fixing bug in polyfill, bugfixed commit must point 
to the same tag (unfortunately :( ), to do this:

```sh
git tag v18.3.1 -f
git push -f --tags
```