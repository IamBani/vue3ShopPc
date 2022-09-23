import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import json from '@rollup/plugin-json';
export default {
  input: 'server/app.js',
  output: {
    file: path.resolve(__dirname,'bundle.js'),
    format: 'cjs'
  },
  plugins: [
    json(),
    commonjs(),
    resolve()
  ]
};