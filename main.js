
const toggleImageButton = document.getElementById('toggle-image-button');
const imageInput = document.getElementById('image-input');
const puzzleImage = document.getElementById('puzzle-image');
const puzzleBoard = document.getElementById('puzzle-board');
const piecesContainer = document.getElementById('pieces-container');
const difficultySlider = document.getElementById('difficulty-slider');
const difficultyLabel = document.getElementById('difficulty-label');
const shuffleButton = document.getElementById('shuffle-button');
const solveButton = document.getElementById('solve-button');

let gridSize = 4;

toggleImageButton.addEventListener("click", () => {
    if (puzzleImage.style.display === 'none') {
        imageInput.click();
    } else {
        puzzleImage.style.display = 'none';
        puzzleImage.src = '';
        imageInput.value = '';
        clearPuzzle();
    }
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            puzzleImage.src = e.target.result;
            puzzleImage.onload = () => {
                puzzleImage.style.display = 'block';
                createPuzzle();
            };
        };
        reader.readAsDataURL(file);
    }
});

difficultySlider.addEventListener('input', (event) => {
    gridSize = parseInt(event.target.value);
    difficultyLabel.textContent = `${gridSize}x${gridSize}`;
    if (puzzleImage.src) {
        createPuzzle();
    }
});

shuffleButton.addEventListener('click', () => {
    if (puzzleImage.src) {
        shufflePieces();
    }
});

solveButton.addEventListener('click', () => {
    if (puzzleImage.src) {
        solvePuzzle();
    }
});

function createPuzzle() {
    clearPuzzle();
    const boardSize = puzzleBoard.clientWidth;
    const pieceSize = boardSize / gridSize;

    puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
    puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.width = `${pieceSize}px`;
        piece.style.height = `${pieceSize}px`;
        piece.style.backgroundImage = `url(${puzzleImage.src})`;
        piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;
        const col = i % gridSize;
        const row = Math.floor(i / gridSize);
        piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
        piece.dataset.correctIndex = i;
        piece.setAttribute('draggable', true);
        piece.addEventListener('dragstart', dragStart);
        piecesContainer.appendChild(piece);

        const dropZone = document.createElement('div');
        dropZone.dataset.index = i;
        dropZone.addEventListener('dragover', dragOver);
        dropZone.addEventListener('drop', drop);
        puzzleBoard.appendChild(dropZone);
    }
}

function clearPuzzle() {
    piecesContainer.innerHTML = '';
    puzzleBoard.innerHTML = '';
}

function shufflePieces() {
    const pieces = Array.from(piecesContainer.children);
    pieces.forEach(piece => piecesContainer.removeChild(piece));
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => piecesContainer.appendChild(piece));
}

function solvePuzzle() {
    const allPieces = document.querySelectorAll('.puzzle-piece');
    const dropZones = Array.from(puzzleBoard.children);

    allPieces.forEach(piece => {
        const correctIndex = parseInt(piece.dataset.correctIndex);
        const correctDropZone = dropZones[correctIndex];
        if (correctDropZone.firstChild) {
            piecesContainer.appendChild(correctDropZone.firstChild);
        }
        correctDropZone.appendChild(piece);
    });
    setTimeout(checkWin, 100);
}

let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (!draggedPiece) return;

    const target = event.target;

    if (target.classList.contains('drop-zone') && !target.firstChild) {
        target.appendChild(draggedPiece);
    } else if (target.classList.contains('puzzle-piece')) {
        const sourceContainer = draggedPiece.parentElement;
        const targetContainer = target.parentElement;
        targetContainer.appendChild(draggedPiece);
        sourceContainer.appendChild(target);
    }

    draggedPiece = null;
    setTimeout(checkWin, 100);
}

function checkWin() {
    if (puzzleBoard.children.length === 0) return;

    const dropZones = Array.from(puzzleBoard.children);
    const isWin = dropZones.every((zone, i) => {
        const piece = zone.firstChild;
        return piece && parseInt(piece.dataset.correctIndex) === i;
    });

    if (isWin) {
        alert('You Win!');
    }
}
