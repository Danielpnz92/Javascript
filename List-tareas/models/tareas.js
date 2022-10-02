import {Tarea} from './tarea.js';

export class Tareas {
    _listado={};

    constructor(){
        this._listado={};
    }

    get listadoArr() {
        const lista = [];
        Object.keys(this._listado).forEach( key => {
            const tarea =this._listado[key];
            lista.push(tarea);
        })

        return lista;
    }

    cargarTareasFromArray (tareas = []) {
        tareas.forEach( e => {
            this._listado[e.id]=e;
        })
    }

    listaCompleta( completadas = true){
        this.listadoArr.forEach((e, id)=>{
            const {desc, completadoEn}=e;
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            if (completadas){
                if(completadoEn){
                    const idx= `${id+1}`.green;
                    console.log(`${idx} ${desc} :: ${estado}`);
                }
            }else{
                if(!completadoEn){
                    const idx= `${id+1}`.red;
                    console.log(`${idx} ${desc} :: ${estado}`);
                }
            }
        })
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    completarTarea(id, fecha) {
        this._listado[id].completadoEn=fecha;
    }
        
    borrarTarea(id) {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
}
