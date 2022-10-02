import inquirer from 'inquirer';
import { validate } from 'uuid';
import('colors');

const pregs = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué quieres hacer',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea/s'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. SALIR'
            }
        ]
    }
];

export const inqMenu = async() => {

        console.clear();
        console.log("============================".blue);
        console.log("Seleccione una opción".red);
        console.log("============================\n".blue);

        //por estándar ECMAscript6, al crear una variable entre llaves con el nombre de la propiedad "opcion", se crea
        //una variable con el valor de esa propiedad
        const {opcion} = await inquirer.prompt(pregs);
        // inquirer ya funciona como una promesa, por lo que podría declararse el inqMenu como un async,
        // y dentro: const opc = await inquirer.prompt(pregs)

        return opcion;
    };

export const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.blue }`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

export const leerInput = async(mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if( value.length === 0){
                    return 'Ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    //como solo interesa la descripción 'desc', se toma del objeto, que es igual que hacer antes 
    //const {desc} = await inquirer.prompt(question);

    return desc;

}

export const confirmar = async(message) => {
    const pregs = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(pregs);
    return ok
}

export const listaTareasInteract = async(lista_tareas = []) => {
    let lista_obj= [];
    lista_tareas.forEach((e, i) =>{
        lista_obj.push(new Object());
        lista_obj[i].value=e.id;
        lista_obj[i].name=`${i+1}. ${e.desc}`
    })

    //otra manera de hacerlo con el MAP (crea array de elementos con la estructura del return):
    // const lista_obj = tareas.map ( (e, id) =>{
    //     return {
    //         value: e.id,
    //         name: `${i+1}. ${e.desc}`
    //     }
    // })

    //unshift: añade un elemento al principio del array
    lista_obj.unshift({
        value: '0',
        name: `${'0'.green} -> Cancelar`
    })

    const pregs = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Tareas disponibles:',
            choices: lista_obj
            // [
            //     {
            //         value: '1',
            //         name: '1. Crear tarea'
            //     },
            // ]
        }
    ];
    
    
    console.clear();
    console.log("============================".yellow);
    console.log("Seleccione una tarea".cyan);
    console.log("============================\n".yellow);

    const {opcion} = await inquirer.prompt(pregs);
    // inquirer ya funciona como una promesa, por lo que podría declararse el inqMenu como un async,
    // y dentro: const opc = await inquirer.prompt(pregs)

    return opcion;
        

};