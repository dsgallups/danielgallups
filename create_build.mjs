import minify from '@node-minify/core';
import gcc from '@node-minify/google-closure-compiler'
import uglifyjs from '@node-minify/uglify-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
 
minify({
  compressor: gcc,
  input: path.join(__dirname + "/content/static/js/script.js"),
  output: path.join(__dirname + "/build/script2.js"),
  callback: function (err, min) {
    console.log(err, min);
  }
});