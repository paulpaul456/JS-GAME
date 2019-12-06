"use strict";
var disp = $('.disp'),
    msg = $('.msg');

var gameRunning;
var timeStep;
var gameInterval;
var timeStep,frameStep,currTime;
var BAD_MOVE=1,ACE_MOVE=2,GOOD_MOVE=3;
var availablePixels;
var currentCoin;
var dispWidthInPixels=40;

for(var i=0; i<dispWidthInPixels;i++){
    for(var j=0;j<dispWidthInPixels;j++){
        var tmp=$('<div class="pixel" data-x="'+j+'" data-y="'+i+'"></div>');
        disp.append(tmp);
    }
}



var showMessage=function(ma,mb){
    msg.find('.msg-a').text(ma);
    msg.find('.msg-b').text(mb)
}
var useNextRandomPixelForCoin=function(){//隨機產生食物

    var ap = availablePixels;
    if (ap.length === 0) {
        return false;
    }
    var idx = Math.floor(Math.random() * ap.length);
    currentCoin = ap.splice(idx, 1)[0].split('|');
    $('div.pixel[data-x="' + currentCoin[0] + '"][data-y="' + currentCoin[1] + '"]').addClass('taken');
    return true;


};
var tryAllocatingPixel=function(x,y){
    var ap = availablePixels;
    var p = x + '|' + y;
    var idx = ap.indexOf(p);
    if (idx !== -1) {
        ap.splice(idx, 1);
        $('div.pixel[data-x="' + x + '"][data-y="' + y + '"]').addClass('taken');
        return true;
    } else {
        return false;
    }
}

var releasePixel = function(x, y) {
    $('div.pixel[data-x="' + x + '"][data-y="' + y + '"]').removeClass('taken');
    availablePixels.push(x + '|' + y);
};


var adjustSpeed = function(l) {
    if (l >= 500) {
        frameStep = 50;
    } else if (l >= 400) {
        frameStep = 100;
    } else if (l >= 300) {
        frameStep = 150;
    } else if (l >= 200) {
        frameStep = 200;
    }
};
var DIR_DOWN='d'
var DIR_UP='u'

var DIR_LEFT='l'
var DIR_RIGHT='r'


var snake={
    direction:'l',
    bodyPixels:[],
    move: function() {
        var head = this.bodyPixels[this.bodyPixels.length - 1];

        
        var nextHead = [];
        if (this.direction === 'l') {
            nextHead.push(head[0] - 1);
        } else if (this.direction === 'r') {
            nextHead.push(head[0] + 1);
        } else {
            nextHead.push(head[0]);
        }
        if (this.direction === 'u') {
            nextHead.push(head[1] - 1);
        } else if (this.direction === 'd') {
            nextHead.push(head[1] + 1);
        } else {
            nextHead.push(head[1]);
        }
 
        if (nextHead[0] == currentCoin[0] && nextHead[1] == currentCoin[1]) {
            this.bodyPixels.push(nextHead);
            beep.play();
            adjustSpeed(this.bodyPixels.length);
            if (useNextRandomPixelForCoin()) {
                return GOOD_MOVE;
            } else {
                return ACE_MOVE;
            }
        } else if (tryAllocatingPixel(nextHead[0], nextHead[1])) {
            var tail = this.bodyPixels.splice(0, 1)[0];
            this.bodyPixels.push(nextHead);
            releasePixel(tail[0], tail[1]);
            return GOOD_MOVE;
        } else {
            return BAD_MOVE;
        }
    }
}

var initializeGame=function(){
    frameStep=250;
    timeStep=50;
    currTime=0;
    availablePixels=[];//紀錄哪些座標可以使用
    for(var i=0;i<dispWidthInPixels;i++){
        for(var j=0;j<dispWidthInPixels;j++){
            availablePixels.push(i+'|' +j)
        }
    }
    snake.direction='l';
    snake.bodyPixels=[];
    for(var i=29,end=29-16;i>end;i--){//蛇的生成座標
        tryAllocatingPixel(i,25);
        snake.bodyPixels.push([i,25]);
    }
    useNextRandomPixelForCoin();


};

var startMainLoop=function(){//開啟計時器之函式
    gameInterval=setInterval(function(){
        currTime+=timeStep;
        if(currTime>=frameStep){

            var m=snake.move();
            if(m===BAD_MOVE){//蛇死亡
                clearInterval(gameInterval);
                gameRunning=false;
                showMessage('game over','press space to start again');
            }else if(m===ACE_MOVE){//蛇占滿整個螢幕
                clearInterval(gameInterval);
                gameRunning=false;
                showMessage('you won','press space to start again');
            }

            currTime %=frameStep;
        }
    },timeStep);
    showMessage('','');

}

$(window).keydown(function(e){
    if(k===38){
        e.preventDefault()
        //up
        if(snake.direction!==DIR_DOWN)
            snake.direction=DIR_UP;

    }else if(k===40){
        e.preventDefault()
        //down
        if(snake.direction!==DIR_UP)
        snake.direction=DIR_DOWN;
    }else if(k===37){
        e.preventDefault()
        //left
        if(snake.direction!==DIR_RIGHT)
        snake.direction=DIR_LEFT;
    }else if(k===39){
        e.preventDefault()
        //right
        if(snake.direction!==DIR_LEFT)
        snake.direction=DIR_RIGHT;
    }else if(k===32){//空白建
        if(!gameRunning){
            initializeGame();
            startMainLoop();
            gameRunning=true;
        }


    }else if(k===80){//P
        if(gameRunning){
            if(!gameInterval){
                startMainLoop();
            }else{
                clearInterval(gameInterval);//畫面靜止
                gameInterval=null;
                showMessage('Paused','');
            }
        }
    }else if(k===70){
        if(snake.direction===DIR_DOWN){
            snake.direction=DIR_RIGHT;
        }else if(snake.direction===DIR_RIGHT){
            snake.direction===DIR_UP
        }else if(snake.direction===DIR_UP){
            snake.direction===DIR_LEFT
        }else if(snake.direction===DIR_LEFT){
            snake.direction===DIR_DOWN
        }
        
    }else if(k===74){
        if(snake.direction===DIR_RIGHT){
            snake.direction=DIR_DOWN;
        }else if(snake.direction===DIR_UP){
            snake.direction===DIR_RIGHT;
        }else if(snake.direction===DIR_LEFT){
            snake.direction===DIR_UP;
        }else if(snake.direction===DIR_DOWN){
            snake.direction===DIR_LEFT;
        }
    }
})
showMessage( 'snake','press space to start')