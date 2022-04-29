const { src, dest, watch , parallel } = require('gulp');
const sass = require('gulp-sass')(require("sass"));




const concat = require('gulp-concat');

const webp = require('gulp-webp');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}

// css es una función que se puede llamar automaticamente
function css() {
    return src(paths.scss)
    
        .pipe(sass())
        // .pipe(postcss([autoprefixer()]))
        
        .pipe( dest('./build/css') );
}


function javascript() {
    return src(paths.js)

      .pipe(concat('bundle.js')) // final output file name

    
      .pipe(dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes)
      
        .pipe(dest('build/img'))
       
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('build/img'))
        
}


function watchArchivos() {
    watch( paths.scss, css );
    watch( paths.js, javascript );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}
  
exports.css = css;
exports.watchArchivos = watchArchivos;
exports.default = parallel(css, javascript,  imagenes, versionWebp, watchArchivos ); 