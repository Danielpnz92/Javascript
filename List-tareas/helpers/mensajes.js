const { read } = require('fs');
const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {

    //no hace falta manejar el reject, se pedirá volver a introducir una opción válida
    return new Promise((resolve) => {
    console.clear();
    console.log("============================".blue);
    console.log("Seleccione una opción".red);
    console.log("============================\n".blue);

    console.log(`${'1.'.green} Crear tarea `);
    console.log(`${'2.'.green} Listar tareas `);
    console.log(`${'3.'.green} Listar tareas completadas `);
    console.log(`${'4.'.green} Listar tareas pendientes `);
    console.log(`${'5.'.green} Completar tareas `);
    console.log(`${'6.'.green} Borrar tarea `);
    console.log(`${'0.'.green} Salir \n `);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(`\nSeleccione una opción\n`, (opc) => {
        readline.close();
        resolve(opc);
    })

    })
    
}

const pausa = () => {
    //no hace falta deolver nada en el resolve porque ya se recupera la opción del usuario del anterior Promise.
    //aquí sólo es esperar a que el usuario de enter.
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.rainbow }\n`, (opc) => {
            readline.close();
            resolve();
        })
    });
    

}

module.exports = {
    mostrarMenu,
    pausa
}