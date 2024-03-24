const {src, dest, watch, series} = require('gulp');
// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // pasos: 1- identificar el archivo, 2- compilar, 3- guardar css 
    src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))            
        .pipe(dest('./build/css'))
    done()        
}

function imagenes(done) {
    src('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('./build/img'))
    done()        
}

function versionWebp(done) {
    src('./src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('./build/img'))

    done()        
}

function versionAvif(done) {
    src('./src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('./build/img'))

    done()        
}

function dev (done) {
    watch('./src/scss/**/*', css)
    watch('./src/img/**/*', imagenes);
    done()
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);