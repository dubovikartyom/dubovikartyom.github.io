const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const imageTask = require('./gulp/tasks/image-min-task').default
const loadStyles = require('./gulp/tasks/load-styles-task').default
const loadScripts = require('./gulp/tasks/load-scripts-task').default
const prod =  require('./gulp/tasks/prod-task').default
const targetImageMin =  require('./gulp/tasks/target-image-min-task').default


const stylesList = require('./gulp/loaded-styles').loadedStyles;
const scriptsList = require('./gulp/loaded-scripts').loadedScripts;


const concat = require('gulp-concat');

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: './'}, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function styles() {
    return src(stylesList)
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(concat('theme-style.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
        .pipe(sourcemaps.write())
        .pipe(dest('./css/loaded')) // Выгрузим результат в папку "css/"
        .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function scripts() {
    return src(scriptsList)
        .pipe(sourcemaps.init())
        .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] , inlineDynamicImports: true,}, 'umd'))
        // .pipe(concat('app.min.js')) // Конкатенируем в один файл
        // .pipe(uglify()) // Сжимаем JavaScript
        .pipe(sourcemaps.write())
        .pipe(dest('./js/loaded')) // Выгружаем готовый файл в папку назначения
        .pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function startwatch() {
    // Мониторим файлы препроцессора на изменения
    watch('./src/scss/**/*', styles);
    watch('./src/html/**/*.html').on('change', browserSync.reload);
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], scripts);
}

exports.imageMin = imageTask
exports.loadStyles = loadStyles
exports.loadScripts = loadScripts
exports.prod = prod
exports.targetImageMin = targetImageMin

exports.default = parallel(styles, scripts, browsersync, startwatch);

