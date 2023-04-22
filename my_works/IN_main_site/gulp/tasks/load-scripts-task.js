const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify-es').default;

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const clean = require('gulp-clean');

const distJsDirectorySrc = 'js/loaded'

const scriptsList = require('./../loaded-scripts').loadedScripts

function cleanDistJsDirectory() {
    return src(distJsDirectorySrc + '/*', {read: false})
        .pipe(clean());
}

function scripts() {
    return src(scriptsList)
        .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
        .pipe(uglify())
        .pipe(dest(distJsDirectorySrc))
}


exports.default = series(cleanDistJsDirectory, scripts);


