function navegacionFija(){const e=document.querySelector(".contenido-header"),t=document.querySelector(".sobre-festival");window.addEventListener("scroll",(function(){t.getBoundingClientRect().bottom<1?e.classList.add("fixed"):e.classList.remove("fixed")}))}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=16;t++){const a=document.createElement("PICTURE"),n=document.createElement("SOURCE");n.srcset=`build/img/gallery/thumb/${t}.webp`;const l=document.createElement("SOURCE");l.srcset=`build/img/gallery/thumb/${t}.avif`;const d=document.createElement("IMG");d.loading="lazy",d.width="300",d.height="200",d.src=`build/img/gallery/thumb/${t}.jpg`,d.alt="Imagen de galeria",d.onclick=function(){mostrarImagen(t)},a.appendChild(l),a.appendChild(n),a.appendChild(d),e.appendChild(a)}}function mostrarImagen(e){const t=document.createElement("PICTURE"),a=document.createElement("SOURCE");a.srcset=`build/img/gallery/full/${e}.webp`;const n=document.createElement("SOURCE");n.srcset=`build/img/gallery/full/${e}.avif`;const l=document.createElement("IMG");l.src=`build/img/gallery/full/${e}.jpg`,l.alt="Imagen de galeria",t.appendChild(n),t.appendChild(a),t.appendChild(l);const d=document.createElement("DIV");d.classList.add("modal"),d.onclick=cerrarModal;const c=document.createElement("i");c.classList.add("fa-solid"),c.classList.add("fa-square-xmark"),c.classList.add("xmark"),c.onclick=cerrarModal,d.appendChild(t),d.appendChild(c);const o=document.querySelector("body");o.classList.add("overflow-hidden"),o.appendChild(d)}function cerrarModal(){const e=document.querySelector(".modal");console.log(e.classList),e.classList.add("fadeOut"),setTimeout((()=>{e?.remove();document.querySelector("body").classList.remove("overflow-hidden")}),500)}document.addEventListener("DOMContentLoaded",(function(){navegacionFija(),crearGaleria()}));