function setTetris(setting) {
    //drawGrid(25, 25, 'lightgray', 1);
    this.setting = setting;
}
var score = 0;
function startGame() {
<<<<<<< HEAD
    score = 0;
    num_block = 0;
=======
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    setTetris({
        row: 18,
        col: 9,
        grid: 30,
        margin: 3,
        offsetX: 4,
<<<<<<< HEAD
        interval: 1000,
        fasterInterval: 100,
        next: 4
    });
    Tetris.start();

=======
        interval: 400,
        fasterInterval: 100
    });
    Tetris.start();
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
}
function Rotate() {
    Tetris.clearBlock()
    Tetris.transform()
    Tetris.updateMap()
}
function Left() {
<<<<<<< HEAD
    if (!Tetris.borderTest(Tetris.curBlock, -1)) {
        Tetris.clearBlock();
        Tetris.x--;
        Tetris.updateMap();
    }
}
function Right() {
    if (!Tetris.borderTest(Tetris.curBlock, 1)) {
        Tetris.clearBlock();
        Tetris.x++;
        Tetris.updateMap();
    }
}
var clicked = 0;
function Down() {
    if (!clicked) {
        clearInterval(Tetris.timer)
        Tetris.fall(Tetris.setting.fasterInterval)
        clicked = 1
    }
    else {
        clearInterval(Tetris.timer)
        Tetris.fall(Tetris.setting.interval)
        clicked = 0
    }
}
var blockdown = 0;
var num_block = 0
Tetris = {
    setting: {
        row: 18,
        col: 19,
        grid: 30,
        margin: 3,
        offsetX: 4,
        interval: 700,
        fasterInterval: 100,
        next: 4,
        blockset: 0
=======
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
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    },
    initCanvas: function () {
        var canvas = document.getElementById('myCanvas');
        var setting = this.setting;
        this.ctx = canvas.getContext('2d');
<<<<<<< HEAD
        canvas.style = 'background: white;';
        var body = document.getElementsByTagName('body')[0];
    },
    blocks: [
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]],//C
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0]],//S
        [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],//I
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]]//E
    ],
    random_blocks: [
        [[0, 1, 1, 0], [0, 1, 1, 0]],//田
        [[0, 1, 1, 1, 1, 0]],//一
        [[0, 1, 1, 1, 0], [0, 0, 1, 0, 0]],//T
        [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]],
        [[0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0]],//L
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]],//C
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0]],//S
        [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]]//E
    ],
    blockSetting: [
        "yellow",
        "blue",
        "pink",
        "green",
        "orange",
        "red"
        // for(i =0;i<blocks.length;i++){
        // map = this.map;
        // switch (i) {
        //     case 0:
        //         changeBlock = this.blocks[i]
        //         for (k = 0; k < changeBlock.length; k++) {
        //             for (var j = 0; j < changeBlock[k].length; j++) {
        //                 if (changeBlock[k][j]) {
        //                     changeBlock.ctx.fillStyle = 'yellow';
        //                 }
        //             }
        //             break;
        //         }
        // }
        // }
    ]
    ,//設定block顏色及被選取
=======
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
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
    //開始遊戲
=======
    // 游戏开始入口
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    start: function () {
        this.init();
        this.createMap();
        this.render();
        this.createBlock();
        this.updateMap();
        this.enableKeyControl();
        this.fall(this.setting.interval);
    },
<<<<<<< HEAD
    //結束
=======
    // 游戏结束的判断
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
    // canvas map
=======
    // 地图生成
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    createMap: function () {
        var setting = this.setting;
        for (var i = 0; i < setting.row; i++) {
            this.map.push([]);
            for (var j = 0; j < setting.col; j++) {
                this.map[i].push(0);
            }
        }
    },
<<<<<<< HEAD
    // canvas map color
=======
    // 地图绘制
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    render: function () {
        var map = this.map;
        var mRowLen = map.length;
        var mColLen = map[0].length;
        var grid = this.setting.grid;
        var margin = this.setting.margin;
<<<<<<< HEAD
        var curBlock = this.curBlock;
        for (var i = 0; i < mRowLen; i++) {
            for (var j = 0; j < mColLen; j++) {
                if (!map[i][j]) {
                    this.ctx.fillStyle = "#A5CAD2";
                }
                else if (map[i][j] === 1) {
                    this.ctx.fillStyle = '#758EB7';
=======
        for (var i = 0; i < mRowLen; i++) {
            for (var j = 0; j < mColLen; j++) {
                if (!map[i][j]) {
                    this.ctx.fillStyle = 'grey';
                } else if (map[i][j] === 1) {
                    this.ctx.fillStyle = 'orange';
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
                }
                this.ctx.fillRect(j * (grid + margin), i * (grid + margin), grid, grid);
            }
        }
<<<<<<< HEAD
        // for (var i = 0; i < curBlock.length; i++) {
        //     for (var j = 0; j < curBlock[i].length; j++) {
        //         if (map[i + this.y][j + this.x]) {
        //             this.ctx.fillStyle = this.blockSetting[this.setting.blockset];
        //             this.ctx.fillRect((j + this.x) * (grid + margin), (i + this.y) * (grid + margin), grid, grid)
        //         }
        //         if (!map[i][j]) {
        //             this.ctx.fillStyle = "#A5CAD2";
        //             this.ctx.fillRect(j * (grid + margin), i * (grid + margin), grid, grid);
        //         }
        //     }
        // }
    },
    // canvas map更新
=======
    },
    // 地图更新
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
    // block掉下
    fall: function (interval) {
        var _this = this
        this.timer = setInterval(function () {
            // 是否碰到地板
            if (_this.groundTest(_this.curBlock)) {
                // 遊戲結束
=======
    // 方块下落
    fall: function (interval) {
        var _this = this
        this.timer = setInterval(function () {
            // 判断是否落地
            if (_this.groundTest(_this.curBlock)) {
                // 判断游戏终点
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
            blockdown++;
            _this.updateMap()
            // if (blockdown == 5) {
            //     _this.y = -1
            //     _this.createBlock()
            //     blockdown = 0;
            // }
        }, interval)
    },
    //鍵盤控制移动及變形
=======
            _this.updateMap()
        }, interval)
    },
    // 方块移动及变形操作
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
                case 38: // 向上為變形
=======
                case 38: // 向上即变形
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
                    _this.clearBlock()
                    _this.transform()
                    _this.updateMap()
                    break
<<<<<<< HEAD
                case 40: // 向下為加速
=======
                case 40: // 向下即加速
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
    // 變形
=======
    // 方块变形
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
        if (num_block >= setting.next)//記得改回5
        {
            var random_num = this.random(0, this.random_blocks.length);
            this.curBlock = this.random_blocks[random_num];
            this.setting.blockset = random_num;
            //this.ctx.fillStyle = this.blockSetting[random_num];
        }
        else {
            this.curBlock = this.blocks[num_block];
            //this.blockSetting(num_block);
            num_block++;
        }
=======
        this.curBlock = this.blocks[this.random(0, this.blocks.length)];
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
        this.x = this.setting.offsetX;
        score += 1;
        this.updateScore();
    },
<<<<<<< HEAD
    //消除
=======
    // 方块消除
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
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
<<<<<<< HEAD
    // 碰地檢測
=======
    // 方块触底检测
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    groundTest: function (curBlock) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
<<<<<<< HEAD
        if (this.y + curBlock.length >= this.map.length) {
            //找出block的最底部
            // n = blockRowLen - 1
            // while (n >= 0) {
            //     if (curBlock[n][j] === 0)
            //         n--
            //     else
            //         break
            // }
            // for(var i=0;i<map.length;i++){
            //     // for(var j=0;j<map[i].length;j++)
            //     // {
            //     //     if(map[])
            //     // }
            //     if(map[])
            // }
            return true
        }
=======
        var n
        // 第一种情况 到达地图底部
        if (this.y + curBlock.length >= this.map.length) return true
        // 第二种情况 与其他方块产生纵向接触
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
        for (var j = 0; j < blockColLen; j++) {
            if (curBlock[blockRowLen - 1][j]) {
                if (map[blockRowLen + this.y][j + this.x]) return true
            }
            else {
                n = blockRowLen - 1
                console.log(blockRowLen, blockColLen);
<<<<<<< HEAD
                while (n > 0) {
                    if (curBlock[n][j] === 0)
                        n--;
                    else
                        break
                    console.log(curBlock[n][j]);
                }
                if (map[n + this.y + 1][j + this.x]) return true
            }
        }
        // for (var i = 0; i < blockRowLen; i++) {
        //     for (var j = 0; j < blockColLen; j++) {
        //         console.log(curBlock[i][j]);
        //     }
        // }
        return false
    },
    // 方块左右邊檢測
=======

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
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    borderTest: function (curBlock, direction, isTransform) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
        var n
        var blockBorder
        var mapBorder
<<<<<<< HEAD
        if (direction === -1) {//左邊界
            blockBorder = 0
            mapBorder = this.x - 1
            if (this.x <= -1 && !isTransform) return true
        }
        else {
            blockBorder = blockColLen - 1
            mapBorder = this.x + blockColLen
            if (this.x + blockColLen > this.setting.col) return true
=======
        if (direction === -1) {
            blockBorder = 0
            mapBorder = this.x - 1
            if (this.x <= 0 && !isTransform) return true
        } else {
            blockBorder = blockColLen - 1
            mapBorder = this.x + blockColLen
            if (this.x + blockColLen >= this.setting.col) return true
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
        }
        for (var i = 0; i < blockRowLen; i++) {
            if (curBlock[i][blockBorder]) {
                if (map[i + this.y][mapBorder]) return true
<<<<<<< HEAD
            }
            else {
=======
            } else {
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
                n = blockBorder
                while (curBlock[i][n]) {
                    direction === -1 ? n++ : n--
                }
                if (map[i + this.y][n + this.x + (direction === -1 ? -1 : 1)]) return true
            }
        }
        return false
    },
<<<<<<< HEAD
    //產生隨機數
    random: function (min, max) {
        return min + Math.floor(Math.random() * (max - min))
    },
    //
=======
    // 随机数产生方法
    random: function (min, max) {
        return min + Math.floor(Math.random() * (max - min))
    },
    // 补充的行
>>>>>>> 0530eed40575b8560c89aa8a8f76f910ebcd972d
    getSupplyRow: function () {
        var arr = []
        for (var i = 0; i < this.setting.col; i++) {
            arr.push(0)
        }
        return arr
    }
}


