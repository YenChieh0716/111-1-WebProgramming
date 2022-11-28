function setTetris(setting) {
    //drawGrid(25, 25, 'lightgray', 1);
    this.setting = setting;
}

var score = 0;
function startGame() {
    score = 0;
    num_block = 0;
    setTetris({
        row: 18,
        col: 9,
        grid: 30,
        margin: 3,
        offsetX: 4,
        interval: 700,
        fasterInterval: 100,
        next: 0
    });
    Tetris.start();

}
function Rotate() {
    Tetris.clearBlock()
    Tetris.transform()
    Tetris.updateMap()
}
function Left() {
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
var position=[]
Tetris = {
    setting: {
        row: 18,
        col: 15,
        grid: 30,
        margin: 3,
        offsetX: 4,
        interval: 2000,
        fasterInterval: 100,
        next: 4,
        blockset: 0
    },
    initCanvas: function () {
        var canvas = document.getElementById('myCanvas');
        var setting = this.setting;
        this.ctx = canvas.getContext('2d');
        canvas.style = 'background: white;';
        var body = document.getElementsByTagName('body')[0];
    },
    blocks: [
        // [[6, 6, 6], [6, 0, 0], [6, 0, 0], [6, 0, 0], [ 6, 6, 6]],//C
        // [[7, 7, 7], [7, 0, 0], [7, 7, 7], [0, 0,7], [7, 7, 7]],//S
        // [[8, 8, 8], [8, 0, 0], [8, 8, 8], [8, 0, 0], [8, 8, 8]]//E
        [[2], [2], [2], [2]],//I
    ],
    random_blocks: [
        [[1, 1], [1, 1]],//田
        [[2, 2, 2, 2]],//一
        [[3, 3, 3], [0, 3, 0]],//T
        [[0, 4], [4, 4], [4, 0]],
        [[0, 5], [0, 5], [5, 5]],//L
        [[6, 6, 6], [6, 0, 0], [6, 0, 0], [6, 0, 0], [ 6, 6, 6]],//C
        [[7, 7, 7], [7, 0, 0], [7, 7, 7], [0, 0,7], [7, 7, 7]],//S
        [[8, 8, 8], [8, 0, 0], [8, 8, 8], [8, 0, 0], [8, 8, 8]]//E
    ],
    blockSetting: [
        "yellow",
        "blue",
        "pink",
        "green",
        "orange",
        "red",//給C
        "blue",//給S
        "green"//給E
    ]
    ,//設定block顏色及被選取
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
    //開始遊戲
    start: function () {
        this.init();
        this.createMap();
        this.render();
        this.createBlock();
        this.updateMap();
        this.enableKeyControl();
        this.fall(this.setting.interval);
        
    },
    //結束
    gameOver: function () {
        for (var j = 0; j < this.map[0].length; j++) {
            if (this.map[0][j]) {
                window.location.reload();
                this.updateScore();
                num_block = 0
                return true
            }
        }
        return false
    },
    // canvas map
    createMap: function () {
        var setting = this.setting;
        for (var i = 0; i < setting.row; i++) {
            this.map.push([]);
            for (var j = 0; j < setting.col; j++) {
                this.map[i].push(0);
            }
        }
    },
    // canvas map color
    render: function () {
        var map = this.map;
        var mRowLen = map.length;
        var mColLen = map[0].length;
        var grid = this.setting.grid;
        var margin = this.setting.margin;
        var curBlock = this.curBlock;
        for (var i = 0; i < mRowLen; i++) {
            for (var j = 0; j < mColLen; j++) {
                if (!map[i][j]) {
                    this.ctx.fillStyle = "#A5CAD2";
                }
                else if (map[i][j] === (this.setting.blockset + 1)) {
                    this.ctx.fillStyle = this.blockSetting[this.setting.blockset];
                    // window.addEventListener('click', function (e) {
                    //     //邊框
                    //     // this.ctx.moveTo(this.x,this.y);
                    //     // this.ctx.lineTo((this.curBlock[0].length)*(this.seting.grid),this.y)
                    //     // this.ctx.stroke()
                    //  })
                    map[i][j] += 100;
                    // this.ctx.fillStyle = '#758EB7';
                    // console.log(map[i][j], this.setting.blockset)
                }
                else if (map[i][j]>= 101) {
                    this.ctx.fillStyle = this.blockSetting[map[i][j] - 101];
                    // console.log(map[i][j], this.setting.blockset)
                }
                else {
                    // console.log(map[i][j], this.setting.blockset)
                    // console.log(map[i][j], this.blockSetting[this.setting.blockset])
                    this.ctx.fillStyle = '#758EB7';
                }
                this.ctx.fillRect(j * (grid + margin), i * (grid + margin), grid, grid);
            }
        }
    },
    // canvas map更新
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
    // block掉下
    fall: function (interval) {
        var _this = this
        this.timer = setInterval(function () {
            // 是否碰到地板
            if (_this.groundTest(_this.curBlock)) {
                // 遊戲結束
                if (_this.gameOver()) {
                    alert('gameOver')
                    clearInterval(_this.timer)
                    showBlocksPosition()
                    return _this.start()
                    
                }
                position.push([_this.x,_this.y])
                showBlocksPosition()
                _this.removeBlock()
                _this.y = -1
                _this.createBlock()
            }
            if (~_this.y) _this.clearBlock()
            _this.y++
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
                case 38: // 向上為變形
                    _this.clearBlock()
                    _this.transform()
                    _this.updateMap()
                    break
                case 40: // 向下為加速
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
    // 變形
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
        if (num_block >= this.setting.next)//記得改回4
        {
            var random_num = this.random(0, this.random_blocks.length);
            this.curBlock = this.random_blocks[random_num];
            this.setting.blockset = random_num;
            //this.ctx.fillStyle = this.blockSetting[random_num];
        }
        else {
            console.log(num_block);
            this.curBlock = this.blocks[num_block];
            // this.setting.blockset=num_block;
            num_block++;
        }
        this.x = this.setting.offsetX;
        score += 1;
        this.updateScore();
    },
    //消除
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
    // 碰地檢測
    groundTest: function (curBlock) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
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
        for (var j = 0; j < blockColLen; j++) {
            if (curBlock[blockRowLen - 1][j]) {
                if (map[blockRowLen + this.y][j + this.x]) return true
            }
            else {
                n = blockRowLen - 1
                //console.log(blockRowLen, blockColLen);
                while (n > 0) {
                    if (curBlock[n][j] === 0)
                        n--;
                    else
                        break
                    //console.log(curBlock[n][j]);
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
    borderTest: function (curBlock, direction, isTransform) {
        var map = this.map
        var blockRowLen = curBlock.length
        var blockColLen = curBlock[0].length
        var blockRow=0
        var blockCol=0
        var n
        var blockBorder
        var mapBorder
        if (direction === -1) {//左邊界
            blockBorder = 0
            mapBorder = this.x - 1
            for(var i=0;i<blockRowLen;i++)
            {
                for(var j = 0; j < blockColLen; j++){
                    if(curBlock[i][j]){
                        blockCol++;
                        break;
                    }
                    
                }
                if(curBlock[i][j]){
                    blockRow++;
                    break;
                }

            }
            if (this.x <= 0 && !isTransform) return true
            if(this.x <= 0)
                return true
        }
        else {//右邊界
            blockBorder = blockColLen - 1
            mapBorder = this.x + blockColLen
            if (this.x + blockCol >= map[0].length) return true
        }
        for (var i = 0; i < blockRow; i++) {
            if (curBlock[i][blockBorder]) {
                if (map[i + this.y][mapBorder]) return true
            }
            else {
                n = blockBorder
                while (curBlock[i][n]) {
                    direction === -1 ? n++ : n--
                }
                if (map[i + this.y][n + this.x + (direction === -1 ? -1 : 1)]) return true
            }
        }
        return false
    },
    //產生隨機數
    random: function (min, max) {
        return min + Math.floor(Math.random() * (max - min))
    },
    //
    getSupplyRow: function () {
        var arr = []
        for (var i = 0; i < this.setting.col; i++) {
            arr.push(0)
        }
        return arr
    }
}
function showBlocksPosition() {
    for (var i = 0; i < position.length; i++) {
    console.log([position[i]]);
}}
// var newBlock={
//     build:function(){
        
//     },
//     blocks: [
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]],//C
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0]],//S
//         [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],//I
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]]//E
//     ],
//     random_blocks: [
//         [[0, 1, 1, 0], [0, 1, 1, 0]],//田
//         [[0, 2, 2, 2, 2, 0]],//一
//         [[0, 3, 3, 3, 0], [0, 0, 3, 0, 0]],//T
//         [[0, 0, 4, 0], [0, 4, 4, 0], [0, 4, 0, 0]],
//         [[0, 0, 5, 0], [0, 0, 5, 0], [0, 5, 5, 0]],//L
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]],//C
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0]],//S
//         [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]]//E
//     ],
//     blockSetting: [
//         "yellow",
//         "blue",
//         "pink",
//         "green",
//         "orange",
//         "red"
//     ]
// }

