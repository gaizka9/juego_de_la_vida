const conway = document.getElementById('conway');


function crearTabla(className) {
    const tabla = document.createElement('table');

    const row = 32;
    const col = 32;

    for (let i = 0; i < row; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            const celda = document.createElement('td');
            celda.setAttribute('id', `${i}-${j}`);  // Añadir una id
            celda.classList.add(className);
            

            if (i == row-1 && j == col-1) {
                celda.setAttribute('data-fin', 'fin');
            }

            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

conway.appendChild(crearTabla('white'));