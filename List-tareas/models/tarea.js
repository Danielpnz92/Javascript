import { v4 as uuidv4} from 'uuid';

// la idea de usar el uuid es poder utilizar después en la clase Tareas un listado de objetos, y no un array donde
// habría que buscar el índice cuando se quiera manipular una tarea. 

export class Tarea {
    id='';
    desc='';
    completadoEn=null;

    constructor(desc){
        this.id= uuidv4();
        this.desc=desc;
    }

}

// module.exports = Tarea;
