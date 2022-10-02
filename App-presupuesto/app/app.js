const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500)
];

const gastos = [
    new Gasto('Renta departamento', 900),
    new Gasto('Ropa', 400)
];

let cargarApp = ()=>{
    cargarCabecera();
    cargarRegistros();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalGastos = ()=>{
    let totalGasto = 0;
    for(let gasto of gastos){
        totalGasto += gasto.valor;
    }
    return totalGasto;
}

let cargarCabecera = ()=>{
    let presupuesto = totalIngresos() - totalGastos();
    let porcentajeGasto = totalGastos()/(totalGastos()+totalIngresos());
    let porcentajeIng = totalIngresos()/(totalGastos()+totalIngresos());
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porc_g').innerHTML = formatoPorcentaje(porcentajeGasto);
    document.getElementById('porc_i').innerHTML = formatoPorcentaje(porcentajeIng);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('gastos').innerHTML = formatoMoneda(totalGastos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-ES', {style: 'currency', currency:'EUR', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-ES', {style: 'percent', minimumFractionDigits: 2});
}

const cargarRegistros = () =>{
    let ingresosHTML='';
    for (let ingreso of ingresos){
        ingresosHTML += crearRegistroHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

    let gastosHTML='';
    for (let gasto of gastos){
        gastosHTML += crearRegistroHTML(gasto)
    }
    document.getElementById('lista-gastos').innerHTML = gastosHTML;
}


const crearRegistroHTML = (registro) => {

    let registroHTML='';
    if(registro instanceof Ingreso){
        registroHTML = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${registro.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${registro instanceof Ingreso ? formatoMoneda(registro.valor) : '-'+formatoMoneda(registro.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento-eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarIng(${registro.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
                `
    }else{
        registroHTML = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${registro.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${registro instanceof Ingreso ? formatoMoneda(registro.valor) : '-'+formatoMoneda(registro.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento-eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarGas(${registro.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
                `
    }
    
    return registroHTML
}

//no he conseguido que la función "eliminar" admita como parámetro la instancia "registro" con sus propiedades "valor" y "descripción", por lo que
//he creado dos funciones, una para eliminar ingresos y otra para gastos, pasando como parámetro directamente el id

let eliminarIng= (idx) => {
    let indiceEliminar='';
    indiceEliminar=ingresos.findIndex(ingreso => ingreso.id === idx)
    ingresos.splice(indiceEliminar,1);
    
    cargarCabecera();
    cargarRegistros();
}

let eliminarGas= (idx) => {
    let indiceEliminar='';
    indiceEliminar=gastos.findIndex(gasto => gasto.id === idx)
    gastos.splice(indiceEliminar,1);
    
    cargarCabecera();
    cargarRegistros();
}

let agregarDato = () => {
    let formulario = document.forms['formulario'];
    let tipo = formulario['tipo'];
    let desc2 = formulario['desc'];
    let val2 = formulario['val'];

    if (desc2.value !== '' && val2.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso (desc2.value, +val2.value));

        }else if(tipo.value === 'gasto'){
            gastos.push(new Gasto (desc2.value, +val2.value));
        }
        cargarCabecera();
        cargarRegistros();
    }


}
