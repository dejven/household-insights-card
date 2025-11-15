import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/family-dashboard-card.ts',
  output: {
    file: 'family-dashboard-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve(),
    json(),
    typescript({
      declaration: false,
    }),
    !dev && terser({
      format: {
        comments: false,
      },
    }),
  ].filter(Boolean),
  external: [],
};
