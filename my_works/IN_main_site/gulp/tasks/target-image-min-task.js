const { src, dest, series } = require('gulp');

const imagemin = require('gulp-imagemin') ;
const webp = require('gulp-webp');
const clean = require('gulp-clean')

const path = process.argv[4]

const imgDist = `assets/img/${path}`
const imgSrc = `src/img/${path}`


function cleanDistImageDirectory() {
    return src(imgDist + '/*', {read: false})
        .pipe(clean());
}


function imgCompressed() {
    return src(`${imgSrc}/**/*`)
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 7}),
        ]))
        .pipe(dest(imgDist))
}

console.log(`${imgDist}/**/*`)
function webpOptimizer() {
    return src(`${imgDist}/**/*`)
        .pipe(webp())
        .pipe(dest(imgDist))
}

exports.default = series(cleanDistImageDirectory, imgCompressed, webpOptimizer);

