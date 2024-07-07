//src ubicacion de donde estan, dest donde se ubicaran 
import { src, dest, watch, series, parallel } from 'gulp';
//importa todo como dartSass de la dependencia sass
import * as dartSass from 'sass';
//importamos gulpsass de la dependencia de gulp-sass
import gulpSass from 'gulp-sass';

import terser  from 'gulp-terser';

//Usamos sass
const sass = gulpSass(dartSass);

//Javascript
export function js(done) {

    src('src/js/app.js')
    .pipe(terser())
    .pipe(dest('build/js'));

    done();
}

//un pipe es llamar una funcin despues de otra
export function css(done) {
    src('src/scss/**/*.scss', { sourcemaps: true })// <- ubicacion origen
        .pipe(sass(
        {outputStyle : 'compressed'}
        ).on('error', sass.logError)) // <-Compilador
        .pipe(dest('build/css', { sourcemaps: true }));// <-destino

    done();
}

/*Funcion para el watch*/
export function dev(done) {
    watch('src/scss/**/*.scss', css);
    /*Si el archivo tiene cambios manda a llamar la funcion css*/
    watch('src/js/**/*.js', js);
    done();
}

/*
    Series pone una tarea la termina y pasa a la siguiente 
    export default series(js,css,dev);
*/

/*
    paralel ejecuta todas las tareas al mismo tiempo
    export default parallel(js, css, dev);
*/

export default series(js, css, dev);

