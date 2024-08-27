# @esm-polyfill/react@18.3.1

React in ESM format.

## Install

Install:

```sh
npm i react@git+file:///home/mk/github/esm-polyfill/react
# specific version
npm i react@git+file:///home/mk/github/esm-polyfill/react#semver:^18.3.1
```

## Use 

Reference:

```ts
import React from 'react'

// ...

```

## Internals info

### Main ESM transformation procedure

```sh
npm i --save-dev react-18.3.1@npm:react@18.3.1
npm i --save-dev react-types-18.3.1@npm:@types/react@18.3.1


mkdir react-18.3.1
cd node_modules/react-types-18.3.1
cp --parents *.d.ts **/*.d.ts ../../react-18.3.1
cd ../../
cp node_modules/react-types-18.3.1/package.json react-18.3.1/package-types.json


cp node_modules/react-18.3.1/package.json package-18.3.1.json
cp node_modules/react-18.3.1/package.json react-18.3.1
cp node_modules/react-18.3.1/README.md react-18.3.1
cp node_modules/react-18.3.1/LICENSE react-18.3.1
cp -r node_modules/react-18.3.1/cjs react-18.3.1/cjs


npx esbuild node_modules/react-18.3.1/*.js \
    --outdir=react-18.3.1/development \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=esm \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"development\" \
    --alias:react=@esm-polyfill/react

npx esbuild node_modules/react-18.3.1/*.js \
    --outdir=react-18.3.1/production \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=esm \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"production\" \
    --alias:react=@esm-polyfill/react
```




### Changes to package.json dependencies


#### js oryginal dependencies

```json
{
    "loose-envify": "^1.1.0"
}
```

#### dts oryginal dependencies

```json
{
    "@types/prop-types": "*",
    "csstype": "^3.0.2"
}
```

#### esm'ed dependencies

```json
{
    "@types/prop-types": "*",
    "csstype": "^3.0.2"
}
```

Why:

* `loose-envify` was used for `production` or `development` 
  contexts, but those was incorporated into package `exports`,
  so is not neccessary.
* `@types/prop-types` does not have .js so is left as is
* `csstype` does not have .js so is left as is
