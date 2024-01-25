//create a new board
function Gameboard() {
	const board = [];
	let remainMoves = 9;

    //Create Empty Board
	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) board[i][j] = Cell();
	}
	const getBoard = () => {
		return board;
	};

    //DEBUGING Print Board in console
	const getConsoleBoard = () => {
		const temp = [];
		for (let i = 0; i < 3; i++) {
			temp.push(
				board[i].map((item) => {
					return item.getValue();
				})
			);
		}
		console.log("board ", temp);
	};

    //add a Mark on Board
    //return    1: valid move
    //          -1: invalid move
    //          0: board Empty
	const placeMark = (row, column, player) => {
		//check valid move
		if (remainMoves > 0)
			if (board[row][column].getValue() === 0) {
				remainMoves--;
				board[row][column].setMark(player.mark);
                return 1;
			} else {
                return -1;
				//console.log("board.placeMark(): invalid move");
			}
		else {
            //console.log("board.placeMark(): Board is full");
            return 0;
        }
	};

	return { getBoard, getConsoleBoard, placeMark };
}

//cell is a unit of a board.
function Cell() {
	let value = 0;
	const setMark = (mark) => {
		value = mark;
	};
	const getValue = () => value;
	return { setMark, getValue };
}

//game control
const GameHandler = (function () {
	const newBoard = Gameboard();
	const player1 = { no: 1, mark: 1 };
	const player2 = { no: 2, mark: 2 };
	let currentPlayer = player1;
	const switchPlayer = () => {
		currentPlayer = currentPlayer === player1 ? player2 : player1;
	};
	const currentTurn = (row, col) => {
		let isValid = newBoard.placeMark(row, col, currentPlayer);
		//
		// Check winning
		//

        //switchPlayer ONLY when making valid move
        switch (isValid){
            case 1: 
                console.log(
					`board.placeMark(): Player ${currentPlayer.no} placed a mark at ${row}, ${col}`
				);
                switchPlayer();
                break;
            case 0:
                console.log('GameHandler.currenturn(): Board is full');
                break
            case -1:
                console.log(`GameHandler.currenturn(): Player ${currentPlayer.no} placed an invalid move`);
                break
        }
		

	};

	const getCurrentPlayer = () => currentPlayer;
	const getCurrentBoard = () => {
		newBoard.getConsoleBoard();
	};
	return {
		currentTurn,
		getCurrentPlayer,
		getCurrentBoard,
	};
})();
