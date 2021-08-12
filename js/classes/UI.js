import { eliminarCita , cargarEdicion} from '../funciones.js'
import { contenedorCitas, heading} from '../selectores.js'

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

//EXPORTAMOS
export default UI;