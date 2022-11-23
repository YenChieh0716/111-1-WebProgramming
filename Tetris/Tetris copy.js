function setTetris(setting) {
    //drawGrid(25, 25, 'lightgray', 1);
    this.setting = setting;
}
var score = 0;
function startGame() {
    setTetris({
        row: 18,
        col: 9,
        grid: 30,
        margin: 3,
        offsetX: 4,
        interval: 400,
        fasterInterval: 100
    });
    Tetris.start();
}
function Rotate() {
    Tetris.clearBlock()
    Tetris.transform()
    Tetris.updateMap()
}
function Left() {
    Tetris.clearBlock();
    Tetris.x--;
    Tetris.updateMap();
}
function Right() {
    Tetris.clearBlock();
    Tetris.x++;
    Tetris.updateMap();
}
function down() {
    if (!Tetris.onkeydownFlag) {
        Tetris.onkeydownFlag = true
        clearInterval(Tetris.timer)
        Tetris.fall(Tetris.setting.fasterInterval)
    }
}

Tetris = {
    setting: {
        row: 18,
        col: 9,
        grid: 30,
        margin: 3,
        offsetX: 4,
        interval: 300,
        fasterInterval: 100
    },
    initCanvas: function () {
        var canvas = document.getElementById('myCanvas');
        var setting = this.setting;
        this.ctx = canvas.getContext('2d');
        canvas.style = 'background: black;';
        var body = document.getElementsByTagName('body')[0];
    },
    blocks: [
        // [[1, 1, 1, 1]],
        // [[1, 1], [1, 1]],
        // [[1, 1, 0], [0, 1, 1]],
        // [[0, 1, 1], [1, 1, 0]],
        // [[1, 0, 0], [1, 1, 1]],
        // [[0, 0, 1], [1, 1, 1]],
        // [[1, 1, 1], [0, 1, 0]],
        [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
        //[[0, 1, 1], [1, 1, 1]]
    ],
    init: function () {
        this.initCanvas();
        this.x = this.setting.offsetX;
        this.y = 0;
        this.map = [];
        this.curBlock = [];
        this.onkeydownFlag = false;
        this.timer = null;
        //this.supplyRow = this.getSupplyRow()
    },
    // 游戏开始入口
    start: function () {
        this.init();
        this.createMap();
        this.render();
        this.createBlock();
        this.updateMap();
        this.enableKeyControl();
        this.fall(this.setting.interval);
    },
    // 游戏结束的判断
    gameOver: function () {
        for (var j = 0; j < this.map[0].length; j++) {
            if (this.map[0][j]) {
                window.location.reload();
                this.updateScore();
                return true
            }
        }
        return false
    },
    // 地图生成
    createMap: function () {
        var setting = this.setting;
        for (var i = 0; i < setting.row; i++) {
            this.map.push([]);
            for (var j = 0; j < setting.col; j++) {
                this.map[i].push(0);
            }
        }
    },
    // 地图绘制
    render: function () {
        var map = this.map;
        var mRowLen = map.length;
        var mColLen = map[0].length;
        var grid = this.setting.grid;
        var margin = this.setting.margin;
        for (var i = 0; i < mRowLen; i++) {
            for (var j = 0; j < mColLen; j++) {
                if (!map[i][j]) {
                    this.ctx.fillStyle = 'grey';
                } else if (map[i][j] === 1) {
                    this.ctx.fillStyle = 'orange';
                }
                this.ctx.fillRect(j * (grid + margin), i * (grid + margin), grid, grid);
            }
        }
    },
    // 地图更新
    updateMap: function () {
        var curBlock = this.curBlock;
        var blockRowLen = curBlock.length;
        var blockColLen = curBlock[0].length;
        for (var i = 0; i < blockRowLen; i++) {
            for (var j = 0; j < blockColLen; j++) {
                if (!this.map[i + this.y][j + this.x]) {
                    this.map[i + this.y][j + this.x] = curBlock[i][j]
                }
            }
        }
        this.render()
    },
    updateScore: function () {
        var curScore = score;
        var s = document.getElementById("score");
        s.innerHTML = curScore.toString();
    },
    // 方块下落
    fall: function (interval) {
        var _this = this
        this.timer = setInterval(function () {
            // 判断是否落地
            if (_this.groundTest(_this.curBlock)) {
                // 判断游戏终点
                if (_this.gameOver()) {
                    alert('gameOver')
                    clearInterval(_this.timer)
                    return _this.start()
                }
                _this.removeBlock()
                _this.y = -1
                _this.createBlock()
            }
            if (~_this.y) _this.clearBlock()
            _this.y++
            _this.updateMap()
        }, interval)
    },
    // 方块移动及变形操作
    enableKeyControl: function () {
        var _this = this
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37: // 向左
                    if (!_this.borderTest(_this.curBlock, -1)) {
                        _this.clearBlock()
                        _this.x--
                        _this.updateMap()
                    }
                    break
                case 39: // 向右
                    if (!_this.borderTest(_this.curBlock, 1)) {
                        _this.clearBlock()
                        _this.x++
                        _this.updateMap()
                    }
                    break
                case 38: // 向上即变形
                    _this.clearBlock()
                    _this.transform()
                    _this.updateMap()
                    break
                case 40: // 向下即加速
                    if (!_this.onkeydownFlag) {
                        _this.onkeydownFlag = true
                        clearInterval(_this.timer)
                        _this.fall(_this.setting.fasterInterval)
                    }
                    break
            }
        }
        document.onkeyup = function (e) {
            if (e.keyCode === 40) {
                _this.onkeydownFlag = false
                clearInterval(_this.timer)
                _this.fall(_this.setting.interval)
            }
        }
    },
    // 方块变形
    transform: function () {
        var result = [];
        var curBlock = this.curBlock;
        var blockRowLen = curBlock.length;
        var blockColLen = curBlock[0].length;
        for (var i = 0; i < blockColLen; i++) {
            result.push([])
            for (var j = 0; j < blockRowLen; j++) {
                result[i][blockRowLen - j - 1] = curBlock[j][i]
            }
        }
        if (
            !this.groundTest(result) &&
            !this.borderTest(result, -1, true) &&
            !this.borderTest(result, 1, true)
        ) this.curBlock = result
    },
    // 清除
    clearBlock: function () {
        var curBlock = this.curBlock;
        var blockRowLen = curBlock.length;
        var blockColLen = curBlock[0].length;
        for (var i = 0; i < blockRowLen; i++) {
            for (var j = 0; j < blockColLen; j++) {
                if (curBlock[i][j]) {
                    this.map[i + this.y][j + this.x] = 0
                }
            }
        }
    },
    //創建
    createBlock: function () {
        this.curBlock = this.blocks[this.random(0, this.blocks.length)];
        this.x = this.setting.offsetX;
        score += 1;
        this.updateScore();
    },
    // 方块消除
    removeBlock: function () {
        var map = this.map
        var mRowLen = map.length
        var mColLen = map[0].length
        var fullRowFlag = true
        for (var i = 0; i < mRowLen; i++) {
            fullRowFlag = true
            for (var j = 0; j < mColLen; j++) {
                if (!map[i][j]) fullRowFlag = false
            }
            if (fullRowFlag) {
                this.map.splice(i, 1)
                this.map.unshift(this.supplyRow.slice())
            }
        }
    },
    // 方块触底检测
    groundTest: function (curBlock) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
        var n
        // 第一种情况 到达地图底部
        if (this.y + curBlock.length >= this.map.length) return true
        // 第二种情况 与其他方块产生纵向接触
        for (var j = 0; j < blockColLen; j++) {
            if (curBlock[blockRowLen - 1][j]) {
                if (map[blockRowLen + this.y][j + this.x]) return true
            }
            else {
                n = blockRowLen - 1
                console.log(blockRowLen, blockColLen);

                // while (1) {
                //     // if (!curBlock[n][j])
                //     //     n--;
                //     // else
                //     //     break

                //     //console.log(curBlock[n][j]);
                // }

                if (map[n + this.y + 1][j + this.x]) return true
            }
        }
        for (var i = 0; i < blockRowLen; i++) {
            for (var j = 0; j < blockColLen; j++) {
                console.log(curBlock[i][j]);
            }
        }
        return false
    },
    // 方块左右碰撞检测
    borderTest: function (curBlock, direction, isTransform) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
        var n
        var blockBorder
        var mapBorder
        if (direction === -1) {
            blockBorder = 0
            mapBorder = this.x - 1
            if (this.x <= 0 && !isTransform) return true
        } else {
            blockBorder = blockColLen - 1
            mapBorder = this.x + blockColLen
            if (this.x + blockColLen >= this.setting.col) return true
        }
        for (var i = 0; i < blockRowLen; i++) {
            if (curBlock[i][blockBorder]) {
                if (map[i + this.y][mapBorder]) return true
            } else {
                n = blockBorder
                while (curBlock[i][n]) {
                    direction === -1 ? n++ : n--
                }
                if (map[i + this.y][n + this.x + (direction === -1 ? -1 : 1)]) return true
            }
        }
        return false
    },
    // 随机数产生方法
    random: function (min, max) {
        return min + Math.floor(Math.random() * (max - min))
    },
    // 补充的行
    getSupplyRow: function () {
        var arr = []
        for (var i = 0; i < this.setting.col; i++) {
            arr.push(0)
        }
        return arr
    }
}


