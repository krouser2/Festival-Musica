document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    crearGaleria();

})

function navegacionFija() {
    const header = document.querySelector('.contenido-header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        }
        else {
            header.classList.remove('fixed');
        }
    });
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');
        imagen.loading = 'lazy';
        imagen.width = "300";
        imagen.height = "200";
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen de galeria';

        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(indice) {
    //agregar la imagen al modal
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${indice}.jpg`;
    imagen.alt = 'Imagen de galeria';
    //Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    const btnClose = document.createElement('i');
    btnClose.classList.add('fa-solid');
    btnClose.classList.add('fa-square-xmark');
    btnClose.classList.add('xmark');
    btnClose.onclick = cerrarModal;


    modal.appendChild(imagen);
    modal.appendChild(btnClose);
    //Agregar al html 
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);


}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    console.log(modal.classList);
    modal.classList.add('fadeOut');
    setTimeout(() => {
        modal?.remove();
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);

}