
class Tictactoe {
    constructor(firstplayer = 'X') {
        this.p1 = firstplayer;
        this.p2 = firstplayer === 'X' ? 'O' : 'X';
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
        //update color marker
        this.changeMarkerColor(cell);
        //set current players mark there
        cell.innerText = this.currentplayer;
        //update board
        this.board[place[1]][place[2]] = this.currentplayer;
        //remove clickablity from spot
        cell.classList.add('block-cursor');
    }
    changeMarkerColor(cell) {
        let tableClass = document.querySelector('table').classList;
        if (this.currentplayer === this.p1 ) {
            cell.classList.add('x-color');
            tableClass.remove('x-color');
            tableClass.add('o-color');
        } else {
            cell.classList.add('o-color');
            tableClass.remove('o-color');
            tableClass.add('x-color');
        }
    }
    switchPlayers() {
        this.currentplayer = this.currentplayer === this.p1 ? this.p2 : this.p1;
    }
    checkWinner() {        
        let rows = this.board.length
        let winner;
        //check horizontal winner
        this.board.some((row, i) => {
            let firstItem = (row[i] || null);
            if (row.every(mark => mark === firstItem)) {
                winner = firstItem;
                return true;
            } else return false;
        });
        if (winner) return winner;
        //check vertical winner
        nextRow: for (let i = 0; i < rows; i++) {
            let item;
            for (item = 0; item < rows - 1; item++) {
                let current = this.board[item][i];
                let next = this.board[item + 1][i];
                if (current === next && current) continue;
                else continue nextRow; //skips if items arent the same
            }
            winner = this.board[item][i];
            return winner;   
        }
        //check diagonal winner
        let diagonal = { f: true, b :true}, fcurrent, fnext, bcurrent, bnext;
        for (let i = 0, j = rows - 1; i < rows - 1; i++, j--) {
            //foward diagonal
            fcurrent = this.board[i][i], fnext = this.board[i + 1][i + 1];
            if (fcurrent !== fnext || !fcurrent) diagonal.f = false;
            //backwards diagonal
            bcurrent = this.board[i][j], bnext = this.board[i + 1][j - 1];
            if (bcurrent !== bnext || !bcurrent) diagonal.b = false;
        }
        winner = diagonal.f ? fcurrent : diagonal.b ? bcurrent : null;
        if (winner) return winner; 
    }
    checkDraw() {
        //if missing mark on board return false
        let draw = this.board.every(row => row.every(mark => mark));
        return draw ? 'draw' : false;
    }
    end(status) {
        //update display message
        let message = document.querySelector('.message');
        if (status === 'draw') message.innerText = 'It\'s a Draw!';
        else message.innerText = `Player ${status.toUpperCase()} Wins!`; 
        //unhide modal window
        document.querySelector('.modal').classList.remove('close');
        document.querySelector('.modal').classList.add('open');
        //block click events on table
        document.querySelector('table').classList.add('block-cursor');
    }
    reset() {
        //reset player and clear board
        this.currentplayer = this.p1;
        this.board = this.board.map(arr => arr.map(item => 0));
        //remove marks 
        let cells = document.querySelectorAll('td');
        cells.forEach(block => {
            block.innerText = '';
            block.classList.remove('block-cursor','o-color','x-color');
        });
        //reset table event and color class
        document.querySelector('table').classList.remove('o-color', 'block-cursor');
        document.querySelector('table').classList.add('x-color');
        //hide modal window
        document.querySelector('.modal').classList.remove('open');
        document.querySelector('.modal').classList.add('close');
    }
}

let newGame = new Tictactoe();

document.querySelector('.modal_button').addEventListener('click', () => {
    newGame.reset();
 })
let boardCells = document.querySelectorAll('td');
boardCells.forEach(cell => {
    //hover effect on boxcells 
    cell.addEventListener('pointerenter', () => {
        cell.innerText = newGame.currentplayer;
    })
    cell.addEventListener('pointerleave', () => {
        //ensures cell mark isnt removed after click event
        if (cell.classList.contains('block-cursor')) return;
        cell.innerText = ''
    })
    cell.addEventListener('click', () => {
        newGame.markBoard(cell.id);
        let winner = newGame.checkWinner();
        let draw = newGame.checkDraw();
        if (!winner && !draw) newGame.switchPlayers();
        else newGame.end(winner || draw);
    });
});
