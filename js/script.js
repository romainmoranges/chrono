/* Variables */
let body = document.getElementsByTagName('body')[0];
let interval;

/* Classes */

class Chronometre {
    constructor(x, y, c, b) {
        this.abcisse = x + 'px';
        this.ordonnee = y + 'px';
        this.color = c;
        this.border = b;

        this.chrono = document.createElement('div');
        this.compteur = document.createElement('input');
        this.playpause = document.createElement('div');
        this.reinit = document.createElement('div');
    }

    affiche() {
        /* Items */

        /* Style du chrono */
        this.chrono.style.position = "relative";
        this.chrono.style.width = "200px";
        this.chrono.style.height = "100px";
        this.chrono.style.left = this.abcisse;
        this.chrono.style.top = this.ordonnee;
        this.chrono.style.backgroundColor = this.color;
        this.chrono.style.border = `solid 3px ${this.border}`;


        /* Style du compteur */
        this.compteur.style.width = "80%";
        this.compteur.style.margin = "10px auto";
        this.compteur.style.display = "block";
        // compteur.setAttribute('readonly');
        this.compteur.value = "00 - 00 - 00";


        /* Style du playpause */
        this.playpause.style.width = "25px";
        this.playpause.style.height = "25px";
        this.playpause.style.display = "inline-block";
        this.playpause.style.backgroundImage = "url('./img/play.svg')";
        this.playpause.style.backgroundRepeat = "no-repeat";
        this.playpause.style.backgroundSize = "contain";
        this.playpause.style.cursor = 'pointer';

        /* Style du reinit */
        this.reinit.style.width = "25px";
        this.reinit.style.height = "25px";
        this.reinit.style.display = "inline-block";
        this.reinit.style.backgroundImage = "url('./img/stop.svg')";
        this.reinit.style.backgroundRepeat = "no-repeat";
        this.reinit.style.backgroundSize = "contain";
        this.reinit.style.cursor = 'pointer';


        /* Mise en place */
        body.appendChild(this.chrono);
        this.chrono.appendChild(this.compteur);
        this.chrono.appendChild(this.playpause);
        this.chrono.appendChild(this.reinit);

        /* évènements */
        this.playpause.addEventListener("click", () => {
            if (this.playpause.style.backgroundImage == 'url("./img/play.svg")') {
                this.lecture(this.compteur, this.playpause);
            } else {
                this.pause(this.playpause);
            }
        });

        this.reinit.addEventListener("click", () => {
            this.init(this.compteur, this.playpause)
        });
    }

    lecture(input, bouton) {
        let currentValue;
        currentValue = input.value;
        let tabValue = currentValue.split(' - ');
        let h = tabValue[0];
        let m = tabValue[1];
        let s = tabValue[2];
        bouton.style.backgroundImage = "url('./img/pause.svg')";

        this.interval = window.setInterval(() => {
            s++;
            if (s === 10) {
                s = "0";
                m++;
                if (m === 5) {
                    m = "00";
                    h++;
                    if (h === 24) {
                        h = "00";
                    }
                }
            }
            if (s<"10") {
                s = '0'+s;
            }
            input.value = `${h} - ${m} - ${s}`;
        }, 1000)
    }

    pause(bouton) {
        window.clearInterval(this.interval);
        bouton.style.backgroundImage = "url('./img/play.svg')";
    }

    init(input, bouton) {
        window.clearInterval(this.interval);
        input.value = "00 - 00 - 00";
        bouton.style.backgroundImage = "url('./img/play.svg')";
    }

}

class ChronometreBis extends Chronometre {
    constructor(x,y,c,b) {
        super(x,y,c,b);
        this.cross = document.createElement('div');
    }

    affiche() {
        super.affiche();
        this.cross.style.position = 'absolute';
        this.cross.style.width = "10px"
        this.cross.style.height = "10px"
        this.cross.style.right= "2px";
        this.cross.style.top= "2px";
        this.cross.style.backgroundImage = "url('./img/cross.svg')";
        this.cross.style.backgroundSize = "contain";
        this.cross.style.cursor = 'pointer';
        this.chrono.appendChild(this.cross);
        
        this.cross.addEventListener("click", () => {
            this.chrono.parentNode.removeChild(this.chrono.parentNode.lastChild);
        });
    }
}

/* Fonctions */

/* Code principal */

let monChrono = new Chronometre(50, 150, 'orange', 'black');
monChrono.affiche();

let monChronoBis = new ChronometreBis(100, 200,'green', 'red')
monChronoBis.affiche();