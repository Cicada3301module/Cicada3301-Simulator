// Define grid patterns for characters
// Define grid patterns for characters
const patterns = {
    'A': [
        ' 11 ',
        '1  1',
        '1111',
        '1  1',
        '1  1'
    ],
    'B': [
        '111 ',
        '1  1',
        '111 ',
        '1  1',
        '111 '
    ],
    'C': [
        ' 111',
        '1   ',
        '1   ',
        '1   ',
        ' 111'
    ],
    'D': [
        '111 ',
        '1  1',
        '1  1',
        '1  1',
        '111 '
    ],
    'E': [
        '1111',
        '1   ',
        '111 ',
        '1   ',
        '1111'
    ],
    'F': [
        '1111',
        '1   ',
        '111 ',
        '1   ',
        '1   '
    ],
    'G': [
        ' 111',
        '1   ',
        '1 11',
        '1  1',
        ' 111'
    ],
    'H': [
        '1  1',
        '1  1',
        '1111',
        '1  1',
        '1  1'
    ],
    'I': [
        ' 111',
        '  1 ',
        '  1 ',
        '  1 ',
        ' 111'
    ],
    'J': [
        ' 111',
        '  1 ',
        '  1 ',
        '1 1 ',
        '111 '
    ],
    'K': [
        '1  1',
        '1 1 ',
        '11  ',
        '1 1 ',
        '1  1'
    ],
    'L': [
        '1   ',
        '1   ',
        '1   ',
        '1   ',
        '1111'
    ],
    'M': [
        '1   1',
        '11 11',
        '1 1 1',
        '1 1 1',
        '1 1 1'
    ],
    'N': [
        '1  1',
        '11 1',
        '1 11',
        '1  1',
        '1  1'
    ],
    'O': [
        ' 111 ',
        '1   1',
        '1   1',
        '1   1',
        ' 111 '
    ],
    'P': [
        '1111',
        '1  1',
        '1111',
        '1   ',
        '1   '
    ],
    'Q': [
        ' 111 ',
        '1   1',
        '1   1',
        '1  11',
        ' 1111'
    ],
    'R': [
        '1111',
        '1  1',
        '1111',
        '1 1 ',
        '1  1'
    ],
    'S': [
        ' 111 ',
        '1    ',
        ' 111 ',
        '    1',
        ' 111 '
    ],
    'T': [
        '11111',
        '  1  ',
        '  1  ',
        '  1  ',
        '  1  '
    ],
    'U': [
        '1   1',
        '1   1',
        '1   1',
        '1   1',
        ' 111 '
    ],
    'V': [
        '1   1',
        '1   1',
        '1   1',
        ' 1 1 ',
        '  1  '
    ],
    'W': [
        '1   1',
        '1   1',
        '1 1 1',
        '1 1 1',
        ' 1 1 '
    ],
    'X': [
        '1   1',
        ' 1 1 ',
        '  1  ',
        ' 1 1 ',
        '1   1'
    ],
    'Y': [
        '1   1',
        ' 1 1 ',
        '  1  ',
        '  1  ',
        '  1  '
    ],
    'Z': [
        '1111',
        '   1',
        '  1 ',
        ' 1  ',
        '1111'
    ],
    '0': [
        ' 111 ',
        '1  11',
        '1 1 1',
        '11  1',
        ' 111 '
    ],
    '1': [
        ' 1 ',
        '11 ',
        ' 1 ',
        ' 1 ',
        '111'
    ],
    '2': [
        ' 111 ',
        '1   1',
        '  11 ',
        ' 1   ',
        '1111 '
    ],
    '3': [
        ' 111 ',
        '    1',
        ' 111 ',
        '    1',
        ' 111 '
    ],
    '4': [
        '1   1',
        '1   1',
        '11111',
        '    1',
        '    1'
    ],
    '5': [
        '1111 ',
        '1    ',
        '1111 ',
        '    1',
        '1111 '
    ],
    '6': [
        ' 111 ',
        '1    ',
        '1111 ',
        '1   1',
        ' 111 '
    ],
    '7': [
        '11111',
        '   1 ',
        '  1  ',
        ' 1   ',
        '1    '
    ],
    '8': [
        ' 111 ',
        '1   1',
        ' 111 ',
        '1   1',
        ' 111 '
    ],
    '9': [
        ' 111 ',
        '1   1',
        ' 1111',
        '    1',
        ' 111 '
    ]
};

function generatePuzzle() {
    const text = document.getElementById('text-input').value.trim().toUpperCase();
    if (!text || !patterns[text]) {
        alert('Character pattern not defined or input is empty.');
        return;
    }

    const pattern = patterns[text];
    const numRows = pattern.length;
    const numCols = pattern[0].length;

    // Create grid layout
    const gridElement = document.getElementById('masyu-grid');
    gridElement.style.gridTemplateColumns = `repeat(${numCols}, 40px)`;
    gridElement.style.gridTemplateRows = `repeat(${numRows}, 40px)`;
    gridElement.innerHTML = '';

    // Create cells based on pattern
    const cells = [];
    for (let r = 0; r < numRows; r++) {
        cells[r] = [];
        for (let c = 0; c < numCols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cells[r][c] = cell;
            if (pattern[r][c] === '1') {
                cell.classList.add('black-circle');
            } else {
                cell.classList.add('empty');
            }
            gridElement.appendChild(cell);
        }
    }

    // Generate a valid Masyu path through the grid
    const path = generateMasyuPath(pattern);
    path.forEach(([r, c]) => {
        const cell = cells[r][c];
        const line = document.createElement('div');
        line.classList.add('line');
        cell.appendChild(line);
    });
}

// Generate a valid Masyu path (simplified example)
function generateMasyuPath(pattern) {
    const numRows = pattern.length;
    const numCols = pattern[0].length;
    const path = [];
    
    // Example path generation (to be replaced with a real pathfinding algorithm)
    // Here, we just fill the path in a simple straight line for demonstration
    for (let r = 0; r < numRows; r++) {
        path.push([r, 0]);  // Straight line down the leftmost column
    }
    for (let c = 1; c < numCols; c++) {
        path.push([numRows - 1, c]);  // Then move along the bottom row
    }
    
    return path;
}