import { defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import {globSync} from 'glob'
import path from 'node:path'



const commonjsOptions = {
    // strictRequires: 'debug',
    esmExternals: true,
    defaultIsModuleExports: false,
    requireReturnsDefault: 'namespace',
}

const aliasOptions = {
    entries: [
        { find: 'react', replacement: '@esm-polyfill/react' },
    ]
}

const externalOptions = [
    '@esm-polyfill/react',
]

const inputDev = Object.fromEntries(
    globSync('node_modules/react-18.3.1/cjs/*.development.js')
    .map((file) => [
        path.relative('node_modules/react-18.3.1/cjs', file,).slice(0, -3),
        file
    ])
)



const confDev = defineConfig({
    external: externalOptions,
    input: {
        ...inputDev,
    },
    output: {
        exports: 'named',
        dir: 'react-18.3.1/esm',
        format: 'esm'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        alias(aliasOptions),
        commonjs(commonjsOptions),
    ]
})



const inputPro = Object.fromEntries(
    globSync([
        'node_modules/react-18.3.1/cjs/*.production.min.js',
        'node_modules/react-18.3.1/cjs/react-dom.profiling.min.js',
    ])
    .map((file) => [
        path.relative('node_modules/react-18.3.1/cjs', file,).slice(0, -3),
        file
    ])
)


const confPro = defineConfig({
    external: externalOptions,
    input: {
        ...inputPro,
    },
    output: {
        exports: 'named',
        dir: 'react-18.3.1/esm',
        format: 'esm'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        alias(aliasOptions),
        commonjs(commonjsOptions),
    ]
})

export default [confDev, confPro]