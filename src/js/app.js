let seccion =1
let cita={
nombre:"",
fecha:"",
hora:"",
servicios:[]
}

window.onload = () => {
  iniciarApp();
};

const iniciarApp = () => {
  mostrarServicios();
  mostrarSeccion();
  seleccionarSeccion()
  botonSiguiente()
  botonAnterior()
  botonPaginador()
  mostrarSeccionResumen()
  añadirCitaNombre()
  añadirCitaFecha()
  añadirCitaHora()
  restringirFechaAnterior()

};
//funcion para que cuando cargue la pagina siempre aparezca la seccion numero1
const mostrarSeccion=()=>{
  if(document.querySelector(".mostrar")){
    //ocultar la seccion anterior antes de que aparezca laotra seccion
  document.querySelector(".mostrar").classList.remove("mostrar")
  }
  const seccionId = document.querySelector(`#seccion_${seccion}`)
  seccionId.classList.add("mostrar")

  if(document.querySelector(".activo")){
    //ocultar el boton activo anterior
    document.querySelector(".activo").classList.remove("activo")
  }
  //mostrar de paso el boton activo
  const botonActivo =document.querySelector(`[data-id="${seccion}"]`)
  botonActivo.classList.add("activo")
  // //ejecutar tambien el boton paginador para que muestre su respectivo boton
   botonPaginador()
}

const seleccionarSeccion=()=>{
const botones=document.querySelectorAll(".tabs button")
botones.forEach(boton=>{
  boton.onclick=(e)=>{
    e.preventDefault()
    seccion = parseInt(e.target.dataset.id)
    
    mostrarSeccion()
  
// //de la seccion que di click que aparezca
//     const seccionId = document.querySelector(`#seccion_${seccion}`)
//     seccionId.classList.add("mostrar")
//     //seleccionar boton para que cambie de color si le hemos hecho click
//     const botonActivo = document.querySelector(`[data-id="${seccion}"]`) //recordar que el seccion ahora debe serstring para selecionarlo
//     botonActivo.classList.add("activo")
  }
})
}

const mostrarServicios = async () => {
  try {
    const peticion = await fetch("./servicios.json");
    const data = await peticion.json();
    const { servicios } = data;
    servicios.forEach((servicio) => {
      const { id, nombre, precio } = servicio;
      //crear html
      const divServicio = document.createElement("div");
      divServicio.classList.add("servicio");
      divServicio.dataset.idServicio = id
      //añadir su click al div
      divServicio.onclick=seleccionarServicio
      
      
      const servicioNombre = document.createElement("p");
      servicioNombre.classList.add("servicio__nombre");
      servicioNombre.textContent = nombre;
      const servicioPrecio = document.createElement("p");
      servicioPrecio.classList.add("servicio__precio");
      servicioPrecio.textContent = `$${precio}`;
      //llenar el divservicio
      divServicio.appendChild(servicioNombre);
      divServicio.appendChild(servicioPrecio);
      //traer el id servicio para alñadir el divservicio
      document.querySelector("#servicios").appendChild(divServicio);
    });
  } catch (error) {}
};

//funcion del click
const seleccionarServicio=(e)=>{
  let elemento;
  if(e.target.tagName==="P"){
  elemento = e.target.parentElement
}else{
  elemento = e.target
}

if(elemento.classList.contains("servicio__color")){
elemento.classList.remove("servicio__color")
const elementoId = elemento.dataset.idServicio
eliminarServicio(elementoId)
}else{
  elemento.classList.add("servicio__color")
  //se crea un objservicio para enviarlo
  const objServicio={
    id:parseInt(elemento.dataset.idServicio),
  nombre:elemento.firstChild.textContent,
  precio:elemento.firstChild.nextSibling.textContent
}

añadirServicio(objServicio)
}
}
//
const añadirServicio=(objServicio)=>{
  //la cita global,su array de servicios sera igual a su copia mas el nuevo objeto
cita.servicios = [...cita.servicios,objServicio]
console.log(cita.servicios)

}
//
const eliminarServicio=(elementoId)=>{
cita.servicios = cita.servicios.filter(obj=>obj.id!=elementoId)
console.log(cita.servicios)
}

//funcion de botones
const botonSiguiente=()=>{
  const siguiente=document.querySelector("#siguiente")
  siguiente.onclick=(e)=>{
seccion++
botonPaginador()
mostrarSeccion()
  }
}

const botonAnterior=()=>{
  const anterior=document.querySelector("#anterior")
  anterior.onclick=(e)=>{
    seccion--
    //ejecutar el paginador para que oculte un boton
    botonPaginador()
  mostrarSeccion()
  }
}
//funcion para que cuando hago click un un boton paginador que oculte ese boton
const botonPaginador=()=>{
  const anterior=document.querySelector("#anterior")
  const siguiente=document.querySelector("#siguiente")
  //si seccion tiene un numero 3 que elimine al seguiente ,si tiene 2 que se quede ambas y 1 que se oculte el anterior
  if(seccion ===1){
anterior.classList.add("ocultar")
siguiente.classList.remove("ocultar")
  }else if(seccion===2){
    anterior.classList.remove("ocultar")
    siguiente.classList.remove("ocultar")
  }else{
siguiente.classList.add("ocultar")
anterior.classList.remove("ocultar")
mostrarSeccionResumen()
  }
}

//funcion para verificar si el obj cita tiene un valor
const mostrarSeccionResumen=()=>{
  //destructurar cita
  const {nombre,fecha,hora,servicios} = cita

  const secResumen = document.querySelector(".seccion__resumen")
  //limpiar el html
  while(secResumen.firstChild){  //mientras si secresumen tenga un hijo entonces
    secResumen.removeChild(secResumen.firstChild)
  }
  //si los valores del objeto cita incluye un "" entonces
  if(Object.values(cita).includes("")){
    const divResumen = document.createElement("p")
    divResumen.classList.add("text-center")
    divResumen.textContent = "FALTAN DATOS DE SERVICIOS, HORA, FECHA O NOMBRE"
    //seleccionar la seccion resumen para añadirlo

    secResumen.appendChild(divResumen)
    console.log(cita)
    return
  }
//si existe algo entonces crear unos contenedores con nombre,fecha,hora
const divNombre = document.createElement("p")
divNombre.innerHTML = `<span>Nombre:</span> ${nombre}`

const divFecha = document.createElement("p")
divFecha.innerHTML = `<span>Fecha:</span> ${fecha}`

const divHora = document.createElement("p")
divHora.innerHTML = `<span>Hora:</span> ${hora}`

//crear un div aparte para los servicio
const divServicios= document.createElement("div")
divServicios.classList.add("div__servicios")

//iterar los servicios,donde cada servicio estara dentro de su propio div y estos estaran dentro de un divservicios
const divServicio = document.createElement("div")
divServicio.classList.add("div__servicio")

//cantidad para sumar el rpeciototal
let total = 0
servicios.forEach(servicio=>{
const servicioNombre = document.createElement("p")
servicioNombre.textContent = servicio.nombre

const servicioPrecio = document.createElement("p")
servicioPrecio.textContent = servicio.precio
//por cada servicio sumar todos sus precio y mostrarlo en el secresumen
//servicio.precio salia $80 en string,quitar el $ con split
//necesitamos la posicion 1 que es el precio
const precio = servicio.precio.split("$")
total+=parseInt(precio[1])


divServicio.appendChild(servicioNombre)
divServicio.appendChild(servicioPrecio)

divServicios.appendChild(divServicio)
})
console.log(total)

const divTotal = document.createElement("div")
divTotal.innerHTML = `<span>Precio Total: ${total}</span>`

secResumen.appendChild(divNombre)
secResumen.appendChild(divFecha)
secResumen.appendChild(divHora)
secResumen.appendChild(divServicios)
secResumen.appendChild(divTotal)
//div para almacenar para mostrar el precio total
}

//funcion para añadir a la cita un nombre
const añadirCitaNombre=()=>{
const inputNombre = document.querySelector("#nombre")
inputNombre.oninput=(e)=>{
const textNombre = e.target.value.trim()

if(textNombre === "" || textNombre.length < 3){
mostrarAlerta("Nombre no valido","error")
}else{
  //si escribe bien,entonces eliminamos inmediatamente el alerta
  const alerta = document.querySelector(".alerta")
  if(alerta){
    alerta.remove()
  }
  cita.nombre = textNombre
}}
}

//funcion para mostrar una alerta,donde recibira un mensaje y el tipo 
const mostrarAlerta=(mensaje,tipo)=>{
  //si tiene un alerta antes que retorne para acabar aqui la funcion
  if(document.querySelector(".alerta")){
    return
  }
  //crear el div alerta
  const alerta = document.createElement("div")
alerta.textContent = mensaje
alerta.classList.add("alerta")
//eliminar la alerta despues de 3 segundos
setTimeout(() => {
  alerta.remove()
}, 2000);

//ponerlo debajo del formulario
const formulario =document.querySelector(".formulario")
formulario.appendChild(alerta)

//por cada tipo diferente se le asocia una nueva clase
if(tipo ==="error"){
alerta.classList.add("error__nombre")
}
}

//funcion para añadir la fecha a la cita
const añadirCitaFecha=()=>{
  const inputFecha = document.querySelector("#fecha")
  inputFecha.oninput=(e)=>{
    const dia = new Date(e.target.value).getUTCDay()
//si es sabado o dominfgo que muestre una alerta
if([0,6].includes(dia)){
mostrarAlerta("Fines de semana no son permitidos","error")
inputFecha.value = "";
}else{
  cita.fecha = e.target.value
}

  }
}

//funcion para poner un limite a la fecha,es decir no puede escoger una fecha anterior a la actual
//se puede con un atributo min
const restringirFechaAnterior=()=>{
  const inputFecha = document.querySelector('#fecha');

    const fechaAhora = new Date();
    const year = fechaAhora.getFullYear();
    const mes = fechaAhora.getMonth().toString() + 1;
    const dia = fechaAhora.getDate()
    mes.padStart(2,"0") //el 1 es la longitud y el 2 es con uqe lo llenara para que llege a esa longitud
    const fechaDeshabilitar = `${year}-${mes}-${dia}`;
    inputFecha.min = fechaDeshabilitar;
  console.log(inputFecha)
}

//funcion para agregar la hora
const añadirCitaHora=()=>{
const inputHora = document.querySelector("#hora")
inputHora.oninput=(e)=>{
const hora = e.target.value

//separar la hora y los minutos,para verificar que la hora escogida sea menos de 18 y mayor de 10
const horaSeparada=hora.split(":") //recordar que split lo separa en un arreglo
if(horaSeparada[0]<10||horaSeparada[0]>18){
mostrarAlerta("hora no valida","error")
setTimeout(() => {
  //debe ser en un settime porque cuando cambiaba la hora se quedaba pegada
  inputHora.value=""
}, 1000);
}else{
  cita.hora = hora
  console.log(cita)
}
}
}