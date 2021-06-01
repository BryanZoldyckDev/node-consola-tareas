const { createPromptModule } = require('inquirer');
const Tarea = require('./tarea')

class Tareas {
    _listado = {};
    tarea = new Tarea();

    get listadoArray() {
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }
    

    cargarTareasFromArray( tareas = []) {
        
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArray.forEach( (tarea, i ) => {

            const index = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendiente'.red;

            console.log(`${index}. ${desc} : ${estado}`)

        });

        // for (const {desc: d, completadoEn: c} of this.listadoArray){
        //     if (c != null){
        //         console.log(`\n${index}. ${d} : ${'Completado'.green}`);
        //     } else {
        //         console.log(`\n${index}. ${d} : ${'Pendiente'.red}`);
        //     }

        // }
        
    }

    listadoPendientesCompletadas( completadas = true){
        console.log();

        if (completadas){
            const tareasCompletadas = this.listadoArray.filter(completa => completa.completadoEn != null);

            tareasCompletadas.forEach( (tarea, i ) => {

                const index = `${i + 1}`.green;
    
                console.log(`${index}. ${tarea.desc} : ${(tarea.completadoEn).green}`)
    
            })
        } else {
            const tareasPendientes = this.listadoArray.filter(pendiente => pendiente.completadoEn === null);

            tareasPendientes.forEach( (tarea, i ) => {

                const index = `${i + 1}`.green;
                const estado ='Pendiente'.red;
    
                console.log(`${index}. ${tarea.desc} : ${estado}`)
    
            })
        }

    }

    toggleCompletadas (ids = []) {
        ids.forEach (id => {
            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }


        });

        this.listadoArray.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}



module.exports = Tareas;