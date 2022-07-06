
//LOGIC

//Start game
// select who goes first
// first player marks
// check for winner
// second player marks
// check for winner
// -> continue until there is a winner or all spots are filed
// if there is a winner return "player x wins" else return draw

class Tictactoe {
    constructor(firstplayer = 'x') {
        this.p1 = firstplayer;
        this.p2 = firstplayer === 'x' ? 'o' : 'x';
        this.board = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];
        this.currentplayer = firstplayer;
        this.gameRunning = false;
    }
    
    markBoard(place) {
        //take in where was clicked
        let cell = document.querySelector(`#${place}`);
        //set current players mark there
        cell.innerText = this.currentplayer;
        //remove clickablity from spot
        cell.classList.add('block-cursor')

        //DEBUG
        console.log(place, 'marked!')
    }
    switchPlayers() {
        this.currentplayer = this.currentplayer === this.p1 ? this.p2 : this.p1;
    }
    checkWinner() {
        //check for winning combinations
        //if none return false
        // else check winning combination marker and return winner and end game
    }
    checkDraw() {
        //if missing mark on board return false
        //else return true and end game
    }
}

let newGame = new Tictactoe();

let boardCells = document.querySelectorAll('td');
boardCells.forEach(cell => cell.addEventListener('click', () => {
    newGame.markBoard(cell.id);
    let winner = newGame.checkWinner();
    let draw = newGame.checkDraw();
    if (!winner && !draw) newGame.switchPlayers()
}));