# Transforming package to ESM


* copy `.d.ts` files as is, they don't need transformation
* transform entry points with `npx esbuild ...` with package name 
  realiasing and without transforming dependencies.
* construct new 'package.json` file with new name, and aliased
  dependencies (js and types) to esm packages.

