//* básicamente, llamamos a algo que esté dentro del objeto, sin preocuparnos realmente qué es lo que está ahí adentro. La complejidad está escondida de nosotros.

//*hace más sencilla la interfaz y reduce el impacto del cambio.

function spotiRadio(artist) {
    this.artist = artist;

    this.play = function() {
        console.log(`Estoy escuchando las canciones de ${this.artist}`);
    };

    this.pause = function() {
        console.log(`Pausé las canciones de ${this.artist}`);
    };

    this.stop = function() {
        console.log(`Detuve al reproducción de las canciones de ${this.artist}`);
    };
}

let newRadio = new spotiRadio("Daddy Yankee");
newRadio.play();