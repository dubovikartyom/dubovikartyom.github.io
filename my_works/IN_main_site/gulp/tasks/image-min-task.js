const { src, dest, series } = require('gulp');

const imagemin = require('gulp-imagemin') ;
const webp = require('gulp-webp');
const clean = require('gulp-clean')



const distImageDirectorySrc = 'assets/img'


function cleanDistImageDirectory() {
    return src(distImageDirectorySrc + '/*', {read: false})
        .pipe(clean());
}


function imgCompressed() {
    return src('src/img/**/*')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 7}),
        ]))
        .pipe(dest('assets/img'))
}

function webpOptimizer() {
    return src('assets/img/**/*')
        .pipe(webp())
        .pipe(dest('assets/img'))
}

exports.default = series(cleanDistImageDirectory, imgCompressed, webpOptimizer);

