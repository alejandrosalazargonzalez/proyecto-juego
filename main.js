/**
 * @aday-ctr
 * @alejandrosalazargonzalez
 * @eduardosmoralesglez
 * @DiazLuisAlejandro
 */

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

class Pieza {
    constructor(nombre, tamanio) {
        this.nombre = nombre;
        this.tamanio = tamanio;
    }
    getNombre() {
        return this.nombre;
    }
    getTamanio() {
        return Array.from(this.tamanio);
    }
    setPosition(position) {
        this.tamanio = position;
    }
}
/**
 * movimiento de los bloques
 */
const EVENT_MOVEMENTS = {
    LEFT: "ArrowLeft",
    DOWN: "ArrowDown",
    RIGHT: "ArrowRight",
};

const cuadrado = new Pieza("cuadrado", [
    [1, 1],
    [1, 1],
]);
const linea = new Pieza("linea", [[1, 1, 1, 1]]);
const piezaT = new Pieza("T", [
    [0, 1, 0],
    [1, 1, 1],
]);
const piezaS = new Pieza("S", [
    [0, 1, 1],
    [1, 1, 0],
]);
const piezaZ = new Pieza("Z", [
    [1, 1, 0],
    [0, 1, 1],
]);
const piezaL = new Pieza("L", [
    [1, 0],
    [1, 0],
    [1, 1],
]);
const piezaJ = new Pieza("J", [
    [0, 1],
    [0, 1],
    [1, 1],
]);

/**
 * las piezas
 */
const PIECES = [
    //amarillo
    //[
    //  [1, 1],
    //  [1, 1]
    //]
    cuadrado,
    // azul claro
    //[
    //  [1, 1, 1, 1]
    //],
    linea,
    //morado
    //[
    //  [0, 1, 0],
    //  [1, 1, 1],
    //],
    piezaT,
    //rojo
    //[
    //  [1, 1, 0],
    //  [0, 1, 1],
    //],
    piezaS,
    //verde
    //[
    //  [0, 1, 1],
    //  [1, 1, 0],
    //],
    piezaZ,
    //naranja
    //[
    //  [1, 0],
    //  [1, 0],
    //  [1, 1],
    //],
    piezaL,
    // azul oscuro
    //[
    //  [0, 1],[0, 1],[1, 1],],];
    piezaJ,
];
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const $score = document.querySelector("span");
const $section = document.querySelector("section");
const audio = new window.Audio("https://video.aprendejs.dev/tetris.mp3");

let score = 0;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

/**
 * tablero
 */
const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];

/**
 * funcion para crear el tablero
 * @param {*} width ancho
 * @param {*} height alto
 * @returns Array(height)
 */
function createBoard(width, height) {
    return Array(height)
        .fill()
        .map(() => Array(width).fill(0));
}

const piece = {
    position: { x: 5, y: 5 },
    shape: cuadrado.getTamanio(),
    name: cuadrado.getNombre(),
};

let dropCounter = 0;
let lastTime = 0;

/**
 * actualiza la pantalla y va moviendo las piezas
 * @param {*} time
 */
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (score <= 300) {
        dropCounter += deltaTime + score;
    } else {
        dropCounter += deltaTime + 300;
    }
    if (dropCounter > 1000) {
        piece.position.y++;
        dropCounter = 0;

        if (checkCollision()) {
            piece.position.y--;
            solidifyPiece();
            removeRows();
        }
    }

    draw();
    window.requestAnimationFrame(update);
}

/**
 * funcion para dibujar el tablero y las piezas
 */
function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = "#A3E4D7";
                context.fillRect(x, y, 1, 1);
            }
        });
    });

    Array.from(piece.shape).forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const nombre = piece.name;
                switch (nombre) {
                    case "cuadrado":
                        context.fillStyle = "brown";
                        break;
                    case "linea":
                        context.fillStyle = "cyan";
                        break;
                    case "T":
                        context.fillStyle = "purple";
                        break;
                    case "S":
                        context.fillStyle = "red";
                        break;
                    case "Z":
                        context.fillStyle = "green";
                        break;
                    case "L":
                        context.fillStyle = "orange";
                        break;
                    case "J":
                        context.fillStyle = "blue";
                        break;
                    default:
                        context.fillStyle = "pink";
                        break;
                }
                context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
            }
        });
    });

    $score.innerText = score;
}

/**
 * eventos para mover la pieza con las flechas
 */
document.addEventListener("keydown", (event) => {
    if (event.key === EVENT_MOVEMENTS.LEFT) {
        piece.position.x--;
        if (checkCollision()) {
            piece.position.x++;
        }
    }

    if (event.key === EVENT_MOVEMENTS.RIGHT) {
        piece.position.x++;
        if (checkCollision()) {
            piece.position.x--;
        }
    }

    if (event.key === EVENT_MOVEMENTS.DOWN) {
        piece.position.y++;
        if (checkCollision()) {
            0;
            piece.position.y--;
            solidifyPiece();
            removeRows();
        }
    }

    if (event.key === "ArrowUp") {
        const rotated = [];

        for (let i = 0; i < Array.from(piece.shape)[0].length; i++) {
            const row = [];

            for (let j = Array.from(piece.shape).length - 1; j >= 0; j--) {
                row.push(Array.from(piece.shape)[j][i]);
            }
            rotated.push(row);
        }

        const previousShape = piece.shape;
        piece.shape = rotated;
        if (checkCollision()) {
            piece.shape = previousShape;
        }
    }
});

/**
 * funcion para comprobar las coliciones
 */
function checkCollision() {
    return Array.from(piece.shape).find((row, y) => {
        return row.find((value, x) => {
            return (
                value === 1 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
            );
        });
    });
}

/**
 * solidifica la pieza
 */
function solidifyPiece() {

    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                board[y + piece.position.y][x + piece.position.x] = 1;
            }
        });
    });

    resetPiece();
}

/**
 * pone una nueva pieza nueva en la pantalla
 */
function resetPiece() {
    piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
    piece.position.y = 0;
    let pieza = PIECES[Math.floor(Math.random() * PIECES.length)];
    piece.shape = pieza.getTamanio();
    piece.name = pieza.getNombre();
    if (checkCollision()) {
        window.alert("Game over!! Sorry!");
        board.forEach((row) => row.fill(0));
        score = 0;
    }
}

/**
 * resetea las coordenadas
 */
function removeRows() {
    const rowsToRemove = [];

    board.forEach((row, y) => {
        if (row.every((value) => value === 1)) {
            rowsToRemove.push(y);
        }
    });

    rowsToRemove.forEach((y) => {
        board.splice(y, 1);
        const newRow = Array(BOARD_WIDTH).fill(0);
        board.unshift(newRow);
        score += 10;
    });
}

$section.addEventListener("click", () => {
    update();

    $section.remove();
    audio.volume = 0.01;
    audio.play();
});
