const board = document.getElementById('board');
        const statusText = document.getElementById('status');
        const resetButton = document.getElementById('resetButton');
        const modeToggle = document.getElementById('modeToggle');
        let cells = Array.from(document.querySelectorAll('.cell'));
        let currentPlayer = 'X';
        let gameActive = true;
        let boardState = ['', '', '', '', '', '', '', '', ''];

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const handleCellClick = (e) => {
            const clickedCell = e.target;
            const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

            if (boardState[clickedIndex] !== '' || !gameActive) return;

            boardState[clickedIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            checkResult();
        };

        const checkResult = () => {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                statusText.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }

            if (!boardState.includes('')) {
                statusText.textContent = `Draw!`;
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        };

        const resetGame = () => {
            currentPlayer = '0';
            boardState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            statusText.textContent = `Player X's turn`;
            cells.forEach(cell => cell.textContent = '');
        };

        const toggleMode = () => {
            document.body.classList.toggle('dark-mode');
        };

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetButton.addEventListener('click', resetGame);
        modeToggle.addEventListener('change', toggleMode);