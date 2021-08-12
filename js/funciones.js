//IMPORTAMOS
import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {mascotaInput, 
       propietarioInput, 
       telefonoInput,
       fechaInput,
       horaInput,
       sintomasInput,
       formulario } 
       from './selectores.js';


//instanciamos de forma global a las clases
const ui = new UI();
const administrarCitas = new Citas();
let editando = false;

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
export function datosCita(e){
    citaObj[e.target.name] = e.target.value; //utilizamos los corchetes para acceder a las propiedades del obj, de no ser asi accedera al evento
}

export function nuevaCita(e){
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
    export function reiniciarObjeto(){
        citaObj.mascota = '';
        citaObj.propietario = '';
        citaObj.telefono = '';
        citaObj.hora = '';
        citaObj.sintomas = '';
    }

   export function eliminarCita(id){
        //Eliminar cita
        administrarCitas.eliminarCita(id);

        //Mostrar mensaje
        ui.imprimirAlerta('La cita se elimino correctamente');

        //Refrescar
        ui.imprimirCitas(administrarCitas);
    }

    //carga los datos y el modo EDICION
    export function cargarEdicion(cita){
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

