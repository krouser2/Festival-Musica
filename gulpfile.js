//src ubicacion de donde estan, dest donde se ubicaran 
import {src,dest, watch} from 'gulp';
//importa todo como dartSass de la dependencia sass
import * as dartSass from 'sass';
//importamos gulpsass de la dependencia de gulp-sass
import gulpSass from 'gulp-sass';

//Usamos sass
const sass = gulpSass(dartSass);

//un pipe es llamar una funcin despues de otra
export function css(done){
    src('src/scss/**/*.scss', {sourcemaps: true})// <- ubicacion origen
        .pipe(sass().on('error', sass.logError)) // <-Compilador
        .pipe(dest('build/css',{sourcemaps: true}));// <-destino

    done();
}

/*Funcion para el watch*/
export function dev(done){
    watch('src/scss/**/*.scss', css);
    /*Si el archivo tiene cambios manda a llamar la funcion css*/
    done();
}


