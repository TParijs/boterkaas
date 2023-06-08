const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartBtn = document.querySelector(".restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];//win condities 
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();//start de game

function initializeGame(){ //triggerd de click voor de restart game en de cells click
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); 
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); //pakt het attribuut van cell index

    if(options[cellIndex] != "" || !running){ //als er niks staat update de cell
        return;
    } 
    const audio = new Audio("/img/click2.mp3"); // als er geklikt word speel audio af
    audio.play();
    updateCell(this, cellIndex);
    checkWinner();
    
}
function updateCell(cell, index){  //update de cell met welke speler klikt
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
}
function changePlayer(){ // switched de speler van X naar O en toont welke speler aan de beurt is
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // ? als het x is switch naar o en ook andersom
    statusText.textContent = ` ${currentPlayer}'s turn`;
    if(currentPlayer == "x" );
}
function checkWinner(){ //check winner als die er niet is ga verder
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){ // checkt of er iets staat in de cellen als wincondities niet gevonden zijn ga verder 
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){ // als cell abc leeg is ga door
            continue;
        }
        if(cellA == cellB && cellB == cellC){ //als cells gelijk zijn aan elkaar win
            roundWon = true;
            break;
        }
        
    }

    if(roundWon){ //wanneer gewonnen is toon Wins en speel audio af
        statusText.textContent = `${currentPlayer} wins!`;
        let source = "/img/wooo.mp3"
    const audio = document.createElement("audio");
    audio.autoplay = true;
    audio.load()
    audio.addEventListener("load", function() {
    audio.play();
    }, true);
    audio.src = source;
        running = false;
    }
    else if(!options.includes("")){ // wanneer er gelijkspel is toon Draw en speel audio af
        statusText.textContent = `Draw!`;
        running = false;
        let source = "/img/draw.mp3"
    const audio = document.createElement("audio");
    audio.autoplay = true;
    audio.load()
    audio.addEventListener("load", function() {
    audio.play();
    }, true);
    audio.src = source;
        running = false;

    }
    else{
        changePlayer();
        
    }
}
function restartGame(){  //reset alle opties
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    let source = "/img/reset1.mp3" //waneer restart wordt geklikt speel audio af en reset het spel
const audio = document.createElement("audio");
audio.autoplay = true;
audio.volume = 0.5
audio.load()
audio.addEventListener("load", function() {
  audio.play();
}, true);
audio.src = source;
}

let source = "/img/jazz.mp3" //background muziek
const audio = document.createElement("audio");
audio.autoplay = true;
audio.loop = true;
audio.volume = 0.5
audio.load()
audio.addEventListener("load", function() {
  audio.play();
}, true);
audio.src = source;



