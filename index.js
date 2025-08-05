const board = document.getElementById('gameBoard')
        const statusDisplay = document.getElementById('status')
        const restart = document.getElementById('restart');

        let gameBoard = ['', '', '', '', '', '', '', '', '']
        let currentPlayer = 'X'
        let gameActive = true;

        //winning patterns
        const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        //winner or draw logic
        const checkWinner = () => {
            let win = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const condition = winningConditions[i];
                const a = gameBoard[condition[0]];
                const b = gameBoard[condition[1]];
                const c = gameBoard[condition[2]];

                if (a === '' || b === '' || c === '') {
                    continue
                }
                if (a === b && b === c) {
                    win = true;
                    break;
                }
            }
            if (win) {
                statusDisplay.textContent = `Player ${currentPlayer} Wins!`
                gameActive = false;
                return;
            }
            if (!gameBoard.includes('')) {
                statusDisplay.textContent = `Game is a draw!`
                gameActive = false;
            }
        }
        // const cells = document.querySelectorAll('.cell');
        //Function to handle a cell click
        const handleCellClick = (e) => {
            const clickedCell = e.target;
            const clickedCellIndex = clickedCell.getAttribute('data-index')
            if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
                return
            }
            gameBoard[clickedCellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            clickedCell.classList.add(currentPlayer.toLowerCase());

            checkWinner();

            if (gameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }
            //Rests the game to its initial state

        }
        const handleRestartGame = () => {
            gameActive = true;
            currentPlayer = 'X'
            gameBoard = ['', '', '', '', '', '', '', '', '']
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`

            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o')
            })
        }

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div')
            console.log(cell)
            cell.classList.add('cell')
            cell.setAttribute('data-index', i)
            board.appendChild(cell)
            cell.addEventListener('click', handleCellClick)
        }
        restart.addEventListener('click', handleRestartGame)