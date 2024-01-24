//create a new board
function Gameboard() {
	const board = [];
	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) board[i][j] = Cell();
	}
	const getBoard = () => {
		return board;
	};

    
	const getConsoleBoard = () => {
		const temp = [];
		for (let i = 0; i < 3; i++) {
			temp.push(
				board[i].map((item) => {
					return item.getValue();
				})
			);
		}
		console.log("board ",  temp);
	};

	const placeMark = (row, column, mark) => {
        //check valid move
		board[row][column].setMark(mark);
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
function GameHandler(){
    const newBoard = Gameboard();
    const player1 = {no: 1, mark: 1}
    const player2 = {no: 2, mark: 2}
    let activePlayer = player1;
    const switchPlayer = ()=>{
        activePlayer = activePlayer === player1?player2:player1;
    }

}
