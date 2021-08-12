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

//EXPORTAMOS
export default Citas;