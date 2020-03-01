const { zipFunctions } = require('@netlify/zip-it-and-ship-it');

try {
    zipFunctions('src/functions', 'dist/functions');
} catch(e) {
    console.error(e);
}