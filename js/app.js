import App from './classes/App.js';

const app = new App();


//Crear la base de datos

let DB;

window.onload = () =>{
    

    crearDB();
}


function crearDB(){
    //crear la base de datos en version 1.0
    const crearDB = window.indexedDB.open('citas',1);

    //Si hay un error
    crearDB.onerror = function (){
        console.log('error');
    }

    //si todo sale bien
    crearDB.onsuccess = function(){
        console.log('creada');

        DB = crearDB.result;
        
    }

    //Definir el Schema
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas',{
            keypath:'id',
            autoincrement: true 
        });

        //Definir todas las columnas
        objectStore.createIndex('mascota', 'mascota', {unique: false});
        objectStore.createIndex('propietario', 'propietario', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});

        console.log('db creada');
    }
}