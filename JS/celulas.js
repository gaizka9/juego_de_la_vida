var play = false;
var intervalo;

const tds = document.querySelectorAll('td');

tds.forEach(td => {
    td.addEventListener('click', function() {
        
        if (this.classList.contains('white')) {
            this.classList.remove('white');
            this.classList.add('black');
        }else{
            this.classList.remove('black');
            this.classList.add('white');
        }
        
    });
});


const boton = document.getElementById("left-button");

boton.addEventListener("click", function() {
    if (!play) { 
        play = true;
        intervalo = setInterval(function() {
            jugar();
        }, 350); 
    }
});


function jugar() {
        const coor = coordenadas()
        const evo = evolucion(coor)
        vivirMorir(evo);
}

function coordenadas() {
    const fin = document.querySelector('td[data-fin="fin"]');

    let tdId = fin.id;

    let parts = tdId.split('-') 
    let x = parts[0];
    let y = parts[1];

    x = parseInt(x)
    x++
    y = parseInt(y)
    y++

    let coor = new Array(x).fill(null).map(() => 
        new Array(y).fill(null)
    );
    const tdsArray = Array.from(tds);

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const td = tdsArray[i * y + j];

            coor[i][j] = td.classList.contains('black');
        }
    }

    return coor
}

function evolucion(coor) {
    let evo = new Array(coor.length).fill(null).map(() => 
        new Array(coor[0].length).fill(false)
    );

    for (let i = 0; i < evo.length; i++) {

        evo[0][i] = false;
        evo[29][i] = false;
        evo[i][0] = false;
        evo[i][29] = false;
    }

    let cont = 0
    for (let i = 1; i < coor.length-1; i++) {
        for (let j = 1; j < coor[0].length-1; j++) {

            let cont = 0;

            cont += coor[i][j + 1] ? 1 : 0;
            cont += coor[i][j - 1] ? 1 : 0;
            cont += coor[i + 1][j] ? 1 : 0;
            cont += coor[i - 1][j] ? 1 : 0;
            cont += coor[i + 1][j + 1] ? 1 : 0;
            cont += coor[i + 1][j - 1] ? 1 : 0;
            cont += coor[i - 1][j + 1] ? 1 : 0;
            cont += coor[i - 1][j - 1] ? 1 : 0;

            if (coor[i][j]) {
                evo[i][j] = cont === 2 || cont === 3; 
            } else {
                evo[i][j] = cont === 3; 
            }
        }   
    }
    
    return evo
}

function vivirMorir(evo) {
    const tds = document.querySelectorAll('td');
    const x = evo.length;
    const y = evo[0].length;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const td = tds[i * y + j];

            if (evo[i][j] === true) {
                td.classList.remove('white'); 
                td.classList.add('black');
            } else {
                td.classList.remove('black');
                td.classList.add('white');
            }
        }
    }
}