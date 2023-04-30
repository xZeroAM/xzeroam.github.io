var spaces = document.querySelectorAll(".space");
var winner = document.querySelector(".mostrar_ganador");
var vista_ganador = document.getElementById('vista_ganador');
var sonido_ganar = new Audio("/recursos/sound_win.mp3");
var musica_fondo = new Audio("/recursos/musica_fondo.mp3");
var sonido_click = new Audio("/recursos/click.mp3")
var jugador_x = document.querySelector('.jugador_x');
var jugador_o = document.querySelector('.jugador_o');
var mostrar_jugador = document.querySelector(".mostrar_jugador");
var texto_mostrar_jugador = document.querySelector(".texto_mostrar_jugador")
var contador_jugadas = 0;
var controler_cambiar_jugador = true;
sonido_ganar.volume = 0.15;
sonido_click.volume = 0.3;
musica_fondo.volume = 0.1;
var hay_ganador = false;

var turno = 0;
var jugadas_x = [];
var jugadas_o = [];
var combinacionesGanadoras = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

spaces.forEach(function(space) {
    space.addEventListener('click', function() {
        if(turno == 0) {
            if(!(space.classList.length > 2)){
                space.classList.add('x');
                agregar_jugada('x', parseInt(space.classList[1]));
                sonido_click.currentTime = 0;
                sonido_click.play();
                turno = 1;
                controler_cambiar_jugador = false;
                jugador_x.classList.remove('vs');
                jugador_o.classList.remove('vs');
                contador_jugadas+=1;
            }
        }else{
            if(!(space.classList.length > 2)){
                space.classList.add('o');
                agregar_jugada('o', parseInt(space.classList[1]));
                sonido_click.currentTime = 0;
                sonido_click.play();
                turno = 0;
                jugador_x.classList.remove('vs');
                jugador_o.classList.remove('vs');
                contador_jugadas+=1;
            }
        }

        if(contador_jugadas==9 && hay_ganador!=true) {
            mostrar_pantalla_ganador();
            vista_ganador.textContent="Empate"
        }
    })
})

var controlador = 0;

function agregar_jugada(jugador, jugada) {
    hay_ganador = false;
    if(jugador == 'x') {
        jugadas_x.push(jugada);
        if(jugadas_x.length>2) {
            hay_ganador = jugador_ganador(jugadas_x);
            if(hay_ganador) {
                console.log("Felicidades! X Gana");
                vista_ganador.textContent = "¡Felicidades! X Gana"
                mostrar_pantalla_ganador();
                sonido_ganar.currentTime = 0;
                sonido_ganar.play();
            }
        }
    }else {
        jugadas_o.push(jugada);
        if(jugadas_o.length>2) {
            hay_ganador = jugador_ganador(jugadas_o);
            if(hay_ganador) {
                console.log("Felicidades! O Gana");
                vista_ganador.textContent = "¡Felicidades! O Gana"
                mostrar_pantalla_ganador();
                sonido_ganar.currentTime = 0;
                sonido_ganar.play();
            }
        }
    }
}



function jugador_ganador(jugadas) {
    var flag = 0;
    for(let i = 0; i<combinacionesGanadoras.length; i++) {
        var combinacion = combinacionesGanadoras[i];
        for(let j = 0; j<jugadas.length; j++) {
            if(combinacion.includes(jugadas[j])){
                flag++;
            }
        }
        if(flag == 3) {
            return true;
        }
        flag = 0;
    }
    return false;
}

function mostrar_pantalla_ganador() {
    winner.classList.add('winner');
}

var button = document.getElementById("cerrar");
button.addEventListener('click', function() {
    winner.classList.remove('winner')
    jugadas_x = [];
    jugadas_o = [];
    contador_jugadas = 0;
    jugador_x.classList.add('vs');
    jugador_o.classList.add('vs');
    controler_cambiar_jugador = true;
    for(let i=0; i<spaces.length; i++){
        spaces[i].classList.remove('x');
        spaces[i].classList.remove('o');
    }
});


jugador_x.addEventListener('click', function() {
    if(controler_cambiar_jugador) {
        turno = 0;
        mostrar_jugador.classList.add("visible"); 
        setTimeout(function() {
        mostrar_jugador.classList.remove("visible");
        }, 700);
        texto_mostrar_jugador.textContent = "Jugaras como \"X\"";
        sonido_click.currentTime = 0;
        sonido_click.play();
    }
})

jugador_o.addEventListener('click', function() {
    if(controler_cambiar_jugador) {
        turno = 1;
        mostrar_jugador.classList.add("visible"); 
        setTimeout(function() {
        mostrar_jugador.classList.remove("visible");
        }, 700);
        texto_mostrar_jugador.textContent ="Jugaras como \"O\"";
        sonido_click.currentTime = 0;
        sonido_click.play();
    }
})