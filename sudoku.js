// Definición variables
var numSelected = null;
var tileSelected = null;
var tiempoInicio = Date.now();
var completar_casillas = 35;
var errores = 0;
var intervaloCronometro;
var nivelActual = 'facil';

var tableros = {
    facil: [
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ],
    medio: [
        "8-1-6----",
        "----9---5",
        "9-4-3-6--",
        "----4-9-2",
        "-6-----8-",
        "4-8-5----",
        "--9-8-2--",
        "1---2---7",
        "----1-4-6"
    ],
    dificil: [
        "--4------",
        "-2--5---4",
        "-----2---",
        "-5-1----8",
        "---------",
        "---9-----",
        "5-------1",
        "---3-----",
        "-----6---"
    ]
};

var soluciones = {
    facil: [
        "387491625",
        "241568379",
        "569327418",
        "758619234",
        "123784596",
        "496253187",
        "934176852",
        "675832941",
        "812945763"
    ],
    medio: [
        "821567349",
        "736498125",
        "954132678",
        "517843962",
        "263971584",
        "498256713",
        "679384251",
        "145629837",
        "382715496" 
    ],
    dificil: [
        "674891523",
        "821653794",
        "395742186",
        "952164378",
        "716538942",
        "483927615",
        "567289431",
        "148375269",
        "239416857"
    ]
};

// Actualiza el tiempo del crónometro
function actualizarTiempo() {
    var tiempoActual = Date.now();
    var tiempoTranscurrido = tiempoActual - tiempoInicio;
    var segundos = Math.floor(tiempoTranscurrido / 1000);
    var minutos = Math.floor(segundos / 60);
    segundos %= 60;
    minutos %= 60;
    document.getElementById("tiempo").innerText = "Tiempo: " + minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');
}

function iniciarJuego(nivel = 'facil') {
    nivelActual = nivel;
    // Limpiar el tablero actual
    limpiarTablero();
    // Restablecer el tiempo de inicio
    tiempoInicio = Date.now();
    clearInterval(intervaloCronometro);
    intervaloCronometro = setInterval(actualizarTiempo, 1000); // Actualiza el tiempo cada segundo

    // Limpiar el mensaje de felicitaciones si estaba visible
    document.getElementById("mensaje").innerText = "";
    // Reiniciar el contador de errores
    errores = 0;
    document.getElementById("errores").innerText = "Errores: 0";
    completar_casillas = 0;

    // Digitos 1-9
    for (let i = 1; i <= 9; i++) {
        let numero = document.createElement("div");
        numero.id = i;
        numero.innerText = i;
        numero.addEventListener("click", selectNumero);
        numero.classList.add("numero");
        document.getElementById("digitos").appendChild(numero);
    }

    // Selecciona el tablero y la solución según el nivel
    var tablero = tableros[nivel];
    var solucion = soluciones[nivel];

    // Tablero 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (tablero[r][c] != "-") {
                tile.innerText = tablero[r][c];
                tile.classList.add("tile-start");
                completar_casillas++;
            }
            if (r == 2 || r == 5) {
                tile.classList.add("linea-horizontal");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("linea-vertical");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("tablero").append(tile);
        }
    }
}

function selectNumero() {
    if (numSelected != null) {
        numSelected.classList.remove("numero-selected");
    }
    numSelected = this;
    numSelected.classList.add("numero-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coordenadas = this.id.split("-");
        let r = parseInt(coordenadas[0]);
        let c = parseInt(coordenadas[1]);

        if (soluciones[nivelActual][r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            completar_casillas++;
            verificarVictoria();

        } else {
            errores += 1;
            var textoerrores = "Errores: ";
            document.getElementById("errores").innerText = textoerrores + errores;
            this.classList.add("incorrect");
            setTimeout(() => {
                this.classList.remove("incorrect");
            }, 1000);
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    iniciarJuego(nivelActual);
}

// Función para limpiar el tablero
function limpiarTablero() {
    document.getElementById("digitos").innerHTML = "";
    document.getElementById("tablero").innerHTML = "";
}

function resolverAutomaticamente() {
    completar_casillas = 81;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (tableros[nivelActual][r][c] === "-") {
                document.getElementById(r.toString() + "-" + c.toString()).innerText = soluciones[nivelActual][r][c];
            }
        }
    }
    verificarVictoria();
}

function verificarVictoria() {
    if (completar_casillas == 81) {
        clearInterval(intervaloCronometro);
        /*alert("¡Felicidades, has completado el juego!");*/
        
        if(confirm("¡Felicidades, has completado el juego!"));
        window.location.href = "https://youtu.be/9iJbOweVivE" //"https://youtu.be/61nTDz7_df4";

    }
}
