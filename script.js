//create a new board
function Gameboard() {
	const board = [];
	let remainMoves = 9;

	//Create Empty Board
	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) board[i][j] = Cell();
	}

	const resetBoard = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) board[i][j].setMark(0);
		}
		remainMoves=9;
	};

	const getBoard = () => {
		return board;
	};

	const getCellValue = (row, col) => {
		return board[row][col].getValue();
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

	//return
	//{player} win
	//0 contitune
	const checkWinner = (row, col, player) => {
		//check row
		for (let i = 0; i < 3; i++) {
			if (board[row][i].getValue() !== player.mark) break;
			if (i === 2) return player;
		}

		//check col
		for (let i = 0; i < 3; i++) {
			if (board[i][col].getValue() !== player.mark) break;
			if (i === 2) return player;
		}

		//check Diagonal
		for (let i = 0; i < 3; i++) {
			if (board[i][i].getValue() !== player.mark) break;
			if (i == 2) return player;
		}

		//check anti Diagnonal
		for (let i = 0; i < 3; i++) {
			if (board[i][2 - i].getValue() !== player.mark) break;
			if (i == 2) return player;
		}

		return 0;
	};

	return {
		getBoard,
		getCellValue,
		getConsoleBoard,
		placeMark,
		checkWinner,
		resetBoard,
	};
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
const GameHandler = function () {
	const board = Gameboard();
	const player1 = { no: 1, mark: 1 };
	const player2 = { no: 2, mark: 2 };
	let currentPlayer = player1;
	const switchPlayer = () => {
		currentPlayer = currentPlayer === player1 ? player2 : player1;
	};
	const currentTurn = (row, col) => {
		let isValid = board.placeMark(row, col, currentPlayer);

		//switchPlayer ONLY when making valid move
		switch (isValid) {
			case 1:
				console.log(
					`board.placeMark(): Player ${currentPlayer.no} placed a mark at ${row}, ${col}`
				);
				if (board.checkWinner(row, col, currentPlayer) === currentPlayer) {
					console.log("Win :>> player no.", currentPlayer.no);
					break;
				}

				switchPlayer();
				break;
			case 0:
				console.log("GameHandler.currenturn(): Board is full");
				break;
			case -1:
				console.log(
					`GameHandler.currenturn(): Player ${currentPlayer.no} placed an invalid move`
				);
				break;
		}
	};

	const getCurrentPlayer = () => currentPlayer;
	const getCurrentBoard = () => {
		return board;
	};
	const resetGame = () => {
		board.resetBoard();
		currentPlayer=player1;
	};
	return {
		currentTurn,
		getCurrentPlayer,
		getCurrentBoard,
		resetGame,
	};
};

//Display Game
const GameRender = (() => {
	const game = GameHandler();
	let currentPlayer = game.getCurrentPlayer();

	const boardContainer = document.querySelector(".board");
	const currentPlayerContainer = document.querySelector(".current-player");
	const restartButton = document.querySelector("button");

	currentPlayerContainer.innerText = currentPlayer.no;

	//Cell Element Object Factory Function
	const CellElement = (row, col) => {
		let element = document.createElement("div");
		element.classList.add(`cell-${row}-${col}`);
		element.innerText = 0;
		element.addEventListener("click", () => {
			game.currentTurn(row, col, currentPlayer);
			console.log(game.getCurrentBoard());

			UpdateCell(row, col);
		});
		return {
			element,
		};
	};

	//Initial a board
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) boardContainer.append(CellElement(i, j).element);
	}

	//reset game
	restartButton.addEventListener("click", () => {
		game.resetGame();
		currentPlayer = game.getCurrentPlayer();
		document.querySelectorAll(".board div").forEach((item) => {
			item.innerHTML = 0;
		});
		currentPlayerContainer.innerText = currentPlayer.no;
		console.log(game.getCurrentBoard());
	});
	
	



	const UpdateCell = (row, col) => {
		currentPlayer = game.getCurrentPlayer();
		const markedElement = document.querySelector(`.cell-${row}-${col}`);
		currentPlayerContainer.innerText = currentPlayer.no;
		markedElement.innerHTML = game.getCurrentBoard().getCellValue(row, col);
	};
})();
