
//LOGIC

//Start game
// select who goes first
// first player marks
// check for winner
// second player marks
// check for winner
// -> continue until there is a winner or all spots are filed
// if there is a winner return "player x wins" else return draw

//FUNCTIONALITY TO ADD
//end game method to show modal screen that has a replay option
//reset method to start new game (probably in end game screen)


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
        //update board
        this.board[place[1]][place[2]] = this.currentplayer;
        //remove clickablity from spot
        cell.classList.add('block-cursor');

        //DEBUG
        console.log(this.board);
        console.log(place, 'marked!')
    }
    switchPlayers() {
        this.currentplayer = this.currentplayer === this.p1 ? this.p2 : this.p1;
    }
    checkWinner() {
        let isWinner;
        let firstValue;
        let rows = this.board.length
        
        //check horizontal winner
        for( let i = 0; i < rows; i++) {
            //check if first value present
            firstValue = this.board[i][0];
            if (!firstValue) continue;
            //check if each value is equal and ignores unset values
            isWinner = this.board[i].every(value => value === firstValue && value !== 0);
            if (isWinner) return firstValue;
        }
        
        //check vertical winner
        nextRow: for (let i = 0; i < rows; i++) {
            firstValue = this.board[0][i];
            if (!firstValue) continue nextRow;
            for (let item = 1; item < rows; item++) {
                if (this.board[item][i] === firstValue) continue;
                else continue nextRow;
            }
            //if loop finishes all items the same so return winner;
            return firstValue;   
        }
        
        //check diagonal winner
        let fowardCount = 0;
        let backwardCount = 0;
        let fValue = (this.board[0][0] || null);
        let bValue = (this.board[0][rows - 1] || null);
        for (let i = 0, j = rows - 1; i < rows; i++, j--) {
            //foward diagonal
            if (this.board[i][i] === fValue) fowardCount++;
            //backwards diagonal
            if (this.board[i][j] === bValue) backwardCount++; 
        }
        if (fowardCount === rows) return fValue;
        else if(backwardCount === rows) return bValue;  
    }
    checkDraw() {
        //if missing mark on board return false
        for(let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if(this.board[i][j] === 0) return false;
            }
        }
        return 'draw';
    }
    end(status) {
        //update display message
        let message = document.querySelector('.message');
        if (status === 'draw') message.innerText = 'It\'s a Draw!';
        else message.innerText = `Player ${status.toUpperCase()} Wins!` 
        //unhide modal window
        let modal = document.querySelector('.modal');
        modal.classList.remove('hidden');
    }
}

let newGame = new Tictactoe();

document.querySelector('.modal_button').addEventListener('click', () => {
    //reset()
 })
let boardCells = document.querySelectorAll('td');
boardCells.forEach(cell => cell.addEventListener('click', () => {
    newGame.markBoard(cell.id);
    let winner = newGame.checkWinner();
    let draw = newGame.checkDraw();
    if (!winner && !draw) newGame.switchPlayers();
    else if(winner) {console.log(winner, ' wins!'); newGame.end(winner || draw) }
    else if (draw) console.log('draw!')
}));