const { src, dest, series } = require('gulp');

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

const clean = require('gulp-clean');
const styleList = require('./../loaded-styles').loadedStyles;

const distCssDirectorySrc = 'css/loaded'


function cleanDistCssDirectory() {
    return src(distCssDirectorySrc + '/*', {read: false})
        .pipe(clean());
}

function styles() {
    return src(styleList)
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss( { level: { 2: { specialComments: 0 } }} ))
        .pipe(dest(distCssDirectorySrc))
}

exports.default = series(cleanDistCssDirectory, styles);


