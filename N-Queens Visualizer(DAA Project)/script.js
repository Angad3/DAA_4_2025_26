let boardSize;
let boardArray = []; 
let isAnimating = false;
const delayMs = 150;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createBoard(n) {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    boardDiv.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    
    boardArray = Array(n).fill(-1);

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            let cell = document.createElement('div');
            cell.id = `cell-${row}-${col}`;
            cell.className = "cell " + (((row + col) % 2 === 0) ? "light" : "dark");
            boardDiv.appendChild(cell);
        }
    }
}

function isSafe(row, col) {
    for (let i = 0; i < col; i++) {
        let placedRow = boardArray[i];
        if (placedRow === row || Math.abs(placedRow - row) === Math.abs(i - col)) {
            return false;
        }
    }
    return true;
}

function updateCellUI(row, col, state, content) {
    let cell = document.getElementById(`cell-${row}-${col}`);
    cell.innerHTML = content;
    
    cell.classList.remove('testing', 'safe', 'failed');
    if (state) cell.classList.add(state);
}

async function solveNQueens(col, n) {
    if (col >= n) return true;

    for (let row = 0; row < n; row++) {
        updateCellUI(row, col, 'testing', '♛');
        await sleep(delayMs);

        if (isSafe(row, col)) {
            boardArray[col] = row; 
            updateCellUI(row, col, 'safe', '♛');
            await sleep(delayMs);

            if (await solveNQueens(col + 1, n)) {
                return true; 
            }

            boardArray[col] = -1;
            updateCellUI(row, col, 'failed', '♛');
            document.getElementById('status').innerText = "Dead end! Backtracking...";
            await sleep(delayMs);
        }
        
        updateCellUI(row, col, '', '');
    }

    return false;
}

async function startVisualization() {
    if (isAnimating) return;
    
    boardSize = parseInt(document.getElementById('size').value);
    if (boardSize < 4 && boardSize !== 1) {
        alert("N must be 4 or greater (or 1) for a solution to exist.");
        return;
    }

    isAnimating = true;
    document.getElementById('solveBtn').disabled = true;
    document.getElementById('status').innerText = "Searching for solution...";
    document.getElementById('status').style.color = "#3498db";

    createBoard(boardSize);

    let success = await solveNQueens(0, boardSize);

    if (success) {
        document.getElementById('status').innerText = "Solution Found!";
        document.getElementById('status').style.color = "#2ecc71";
        
        for(let col = 0; col < boardSize; col++){
            updateCellUI(boardArray[col], col, '', '♛');
        }
    } else {
        document.getElementById('status').innerText = "No Solution Exists.";
        document.getElementById('status').style.color = "#e74c3c";
    }

    isAnimating = false;
    document.getElementById('solveBtn').disabled = false;
}

// Draw the initial empty board when the file loads
createBoard(8);