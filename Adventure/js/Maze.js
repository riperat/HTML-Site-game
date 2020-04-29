class Maze {

    constructor(cols, rows, cellSize) {

        this.backgroundColor = "#ffffff";
        this.cols = cols;
        this.endColor = "#88FF88";
        this.mazeColor = "#000000";
        this.playerColor = "#880088";
        this.rows = rows;
        this.cellSize = cellSize;

        this.cells = [];

        this.generate()

    }

    generate() {
        player = new Player();
        this.generateEnemy(4);
        mazeHeight = this.rows * this.cellSize;
        mazeWidth = this.cols * this.cellSize;

        canvas.height = mazeHeight;
        canvas.width = mazeWidth;
        canvas.style.height = mazeHeight;
        canvas.style.width = mazeWidth;

        for (let col = 0; col < this.cols; col++) {
            this.cells[col] = [];
            for (let row = 0; row < this.rows; row++) {
                this.cells[col][row] = new MazeCell(col, row);
            }
        }

        let rndCol = Math.floor(Math.random() * this.cols);
        let rndRow = Math.floor(Math.random() * this.rows);

        let stack = [];
        stack.push(this.cells[rndCol][rndRow]);

        let currCell;
        let dir;
        let foundNeighbor;
        let nextCell;

        while (this.hasUnvisited(this.cells)) {
            currCell = stack[stack.length - 1];
            currCell.visited = true;
            if (this.hasUnvisitedNeighbor(currCell)) {
                nextCell = null;
                foundNeighbor = false;
                do {
                    dir = Math.floor(Math.random() * 4);
                    switch (dir) {
                        case 0:
                            if (currCell.col !== (this.cols - 1) && !this.cells[currCell.col + 1][currCell.row].visited) {
                                currCell.eastWall = false;
                                nextCell = this.cells[currCell.col + 1][currCell.row];
                                nextCell.westWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 1:
                            if (currCell.row !== 0 && !this.cells[currCell.col][currCell.row - 1].visited) {
                                currCell.northWall = false;
                                nextCell = this.cells[currCell.col][currCell.row - 1];
                                nextCell.southWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 2:
                            if (currCell.row !== (this.rows - 1) && !this.cells[currCell.col][currCell.row + 1].visited) {
                                currCell.southWall = false;
                                nextCell = this.cells[currCell.col][currCell.row + 1];
                                nextCell.northWall = false;
                                foundNeighbor = true;
                            }
                            break;
                        case 3:
                            if (currCell.col !== 0 && !this.cells[currCell.col - 1][currCell.row].visited) {
                                currCell.westWall = false;
                                nextCell = this.cells[currCell.col - 1][currCell.row];
                                nextCell.eastWall = false;
                                foundNeighbor = true;
                            }
                            break;
                    }
                    if (foundNeighbor) {
                        stack.push(nextCell);
                    }
                } while (!foundNeighbor)
            } else {
                currCell = stack.pop();
            }
        }

        this.redraw();

    }

    hasUnvisited() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (!this.cells[col][row].visited) {
                    return true;
                }
            }
        }
        return false;
    }

    hasUnvisitedNeighbor(mazeCell) {
        return ((mazeCell.col !== 0 && !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
            (mazeCell.col !== (this.cols - 1) && !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
            (mazeCell.row !== 0 && !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
            (mazeCell.row !== (this.rows - 1) && !this.cells[mazeCell.col][mazeCell.row + 1].visited));
    }



    generateEnemy(n) {
        enemies = new Array(4);
        for (let i = 0; i < n; i++) {
            var cols = Math.floor(Math.random() * this.cols);
            var rows = Math.floor(Math.random() * this.cols);
            enemies[i] = new Array(2);

            enemies[i][0] = cols;
            enemies[i][1] = rows;
        }
    }

    redraw() {


        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);


        //end Goal
        ctx.fillStyle = this.endColor;
        ctx.fillRect((this.cols - 1) * this.cellSize, (this.rows - 1) * this.cellSize, this.cellSize, this.cellSize);

        //enemy generate
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = this.mazeColor;
            ctx.fillRect(enemies[i][0] * this.cellSize + 2, enemies[i][1] * this.cellSize + 2, this.cellSize - 4, this.cellSize - 4);
        }

        ctx.strokeStyle = this.mazeColor;
        ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.cells[col][row].eastWall) {
                    ctx.beginPath();
                    ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].northWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].southWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].westWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
            }
        }

        ctx.fillStyle = this.playerColor;
        ctx.fillRect((player.col * this.cellSize) + 2, (player.row * this.cellSize) + 2, this.cellSize - 4, this.cellSize - 4);

    }

}
