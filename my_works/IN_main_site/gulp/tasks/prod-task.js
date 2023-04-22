const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify-es').default;

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

const styleList = require('./../loaded-styles').loadedStyles
const scriptsList = require('./../loaded-scripts').loadedScripts

function styles() {
    return src(styleList)
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss( { level: { 2: { specialComments: 0 } }} ))
        .pipe(dest('./css/loaded'))
}

function scripts() {
    return src(scriptsList)
        .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
        .pipe(uglify())
        .pipe(dest('./js/loaded'))
}


exports.default = series(styles, scripts);


