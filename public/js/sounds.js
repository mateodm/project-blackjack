let cardSound = new Howl({src:["../sounds/carta-naipes-naipe-carta-repartir-6-.mp3"]})
let coin = new Howl({src:["../sounds/coin.wav"]})
let loseSound = new Howl({src:["../sounds/abucheos.wav"]})
let winSound = new Howl({src:["../sounds/aplausos.wav"]})
let button = new Howl({src:["../sounds/boton.wav"]})

let botones = document.querySelectorAll('.button-sound');

botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        button.play();
    });
});