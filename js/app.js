//seleccionamos los inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//seleccionamos el formualario UI
const formulario = document.querySelector('#nueva-cita');

//seccion donde listara las citas UI
const contenedorCitas = document.querySelector('#citas');

let editando;

//creando clases
class Citas{
    constructor(){
        this.citas = [];
    }

    //definimos nuevo metodo
    agregarCita(cita){
        this.citas = [...this.citas, cita];

    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){//usamos map para edicion y no para quitar
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)//itera en c/u de la cita, verifica que la cita actualizada tenga el mismo ID, SI se cumple se reescribe el objetto caso contrario mantenemos cita actual
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //agregamos al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));


        //Quitar la alert
        setTimeout( ()=>{
            divMensaje.remove();
        },5000)

    }
    //aplicamos destructuring
    imprimirCitas({citas}){

        this.limpiarHTML();

        console.log(citas);
        citas.forEach(cita =>{
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;
    
            //Scripting de los elementos de la cita 6
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;
    
            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML =`
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML =`
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML =`
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML =`
            <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML =`
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //boton ELIMINAR cita
            const btnEliminar = document.createElement('button');;
            btnEliminar.classList.add('btn' , 'btn-danger' , 'mr-2');
            btnEliminar.innerHTML = 'Eliminar';

            btnEliminar.onclick = () => eliminarCita(id);

            //boton EDITAR cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn' , 'btn-info');
            btnEditar.innerHTML = 'Editar';
            
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar citas al HTML
            contenedorCitas.appendChild(divCita);
        })
       
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//instanciamos de forma global a las clases
const ui = new UI();
const administrarCitas = new Citas();

//Registramos eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
    
}

//creamos un objeto y para que funciones debemos tomar el name de cada input
const citaObj = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

//Agrega datos al citaObj
function datosCita(e){
    citaObj[e.target.name] = e.target.value; //utilizamos los corchetes para acceder a las propiedades del obj, de no ser asi accedera al evento
}

//valida y agrega nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

     //extraer la inf. del objeto de citas
     const{mascota , propietario , telefono , fecha , hora , sintomas} = citaObj;

     //validar
     if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora ==='' || sintomas === ''){
         ui.imprimirAlerta('Todos los campos son obligatorio', 'error');
         return; //finaliza la ejecucion
     }

     if (editando){
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj}) //pasamos una copia

        //regresar el texto del boton a su estado normal
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';


        //quitar modo edicion
        editando = false;

     }else{
     //generando id unico
     citaObj.id = Date.now();

     //creando nueva cita
     administrarCitas.agregarCita({...citaObj});//prevenimos que se pase el global, sino una copia

     //Mensaje de agregado correctamente
     ui.imprimirAlerta('Se agrego correctamente');
     }

     //reiniicar el objeto para la validacion
     reiniciarObjeto();

     //reinicia el form
     formulario.reset();

     //mostramos el HTML
     ui.imprimirCitas(administrarCitas);
}

    //reiniciar objeto
    function reiniciarObjeto(){
        citaObj.mascota = '';
        citaObj.propietario = '';
        citaObj.telefono = '';
        citaObj.hora = '';
        citaObj.sintomas = '';
    }

    function eliminarCita(id){
        //Eliminar cita
        administrarCitas.eliminarCita(id);

        //Mostrar mensaje
        ui.imprimirAlerta('La cita se elimino correctamente');

        //Refrescar
        ui.imprimirCitas(administrarCitas);
    }

    //carga los datos y el modo EDICION
    function cargarEdicion(cita){
        //aplicamos destructuring para extraer lo que pasamos
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

        //Llenar los inputs
        mascotaInput.value = mascota;
        propietarioInput.value = propietario;
        telefonoInput.value = telefono;
        fechaInput.value = fecha;
        horaInput.value = hora;
        sintomasInput.value = sintomas;

        //Llenar el OBJETO
        citaObj.mascota = mascota;
        citaObj.propietario = propietario;
        citaObj.telefono = telefono;
        citaObj.fecha = fecha;
        citaObj.hora = hora;
        citaObj.sintomas = sintomas;
        citaObj.id = id;

        //cambiar el texto del boton
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

        editando = true;
    }