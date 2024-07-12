import path from 'path';//interno de node
import fs from 'fs';//interno de node
import {glob} from 'glob';
//src ubicacion de donde estan, dest donde se ubicaran 

import { src, dest, watch, series, parallel } from 'gulp';
//importa todo como dartSass de la dependencia sass
import * as dartSass from 'sass';
//importamos gulpsass de la dependencia de gulp-sass
import gulpSass from 'gulp-sass';

import terser  from 'gulp-terser';
import sharp from 'sharp';
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
//Codigo de Node js para minificar imagenes
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}
//Convertir imagenes a webp

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}
//procesa las imagenes
function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}
/*Funcion para el watch*/
export function dev(done) {
    watch('src/scss/**/*.scss', css);
    /*Si el archivo tiene cambios manda a llamar la funcion css*/
    watch('src/js/**/*.js', js);
    watch('src/js/**/*.{png,jpg}', imagenes);
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

export default series(crop,js, css,imagenes, dev);

