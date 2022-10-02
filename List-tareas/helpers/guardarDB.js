import * as fs from 'fs';
const archivo = './db/datos.json'

export const guardarDB = (datos) => {
    fs.writeFileSync( archivo, JSON.stringify(datos));
}

export const leerDB = () => {

    if (!fs.existsSync(archivo)){
        return null;
    }
    const info= fs.readFileSync(archivo, {encoding: 'utf-8'});
    const datos = JSON.parse(info);

    return datos;

}


