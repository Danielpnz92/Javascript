import('colors');
import {inqMenu, 
        pausa,
        leerInput,
        listaTareasInteract,
        confirmar
} from './helpers/inquirer.js';
import {Tarea} from './models/tarea.js';
import {Tareas} from './models/tareas.js';
import {guardarDB, leerDB} from './helpers/guardarDB.js';
console.clear();

const main = async() => {
    console.log("Hello world");
    let op, elecc, fecha_comp, tarea_borr = '';
    const tareas = new Tareas();
    const tareasDB =leerDB();
    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        op = await inqMenu();

        switch (op) {
            case '1':
                //crear opc
                const desc = await leerInput('Descripción: ');
                console.log(desc);
                tareas.crearTarea(desc);
            break;

            case '2':
                console.log(tareas.listadoArr);
            break;

            case '3':
                tareas.listaCompleta();
            break;

            case '4':
                tareas.listaCompleta(false);
            break;

            case '5':
                elecc = await listaTareasInteract(tareas.listadoArr);
                fecha_comp = await leerInput('Fecha de conclusión: ');
                tareas.completarTarea(elecc, fecha_comp);
            break;

            case '6':
                elecc = await listaTareasInteract(tareas.listadoArr);
                if (elecc !== '0'){
                    const ok = await confirmar('¿Estás seguro?: ');
                    if (ok) {
                        tarea_borr=tareas._listado[elecc].desc;
                        tareas.borrarTarea(elecc);
                        console.log(`Tarea: "${tarea_borr}" borrada`);
                    }
                }
                
                
            break;
        }

        guardarDB(tareas.listadoArr);
        op, elecc, fecha_comp, tarea_borr = '';
        await pausa();

    }while (op !== '0')
}


main();
