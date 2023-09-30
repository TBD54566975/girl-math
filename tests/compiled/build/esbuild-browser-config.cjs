"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('esbuild').BuildOptions} */
module.exports = {
    entryPoints: ['./src/girl-math.ts'],
    bundle: true,
    format: 'esm',
    sourcemap: true,
    minify: true,
    platform: 'browser',
    target: ['chrome101', 'firefox108', 'safari16'],
    define: {
        'global': 'globalThis',
    },
};
//# sourceMappingURL=esbuild-browser-config.cjs.map