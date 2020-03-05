const { zipFunctions } = require('@netlify/zip-it-and-ship-it');

try {
    zipFunctions('src/functions', 'dist/functions/archives');
} catch(e) {
    console.error(e);
}