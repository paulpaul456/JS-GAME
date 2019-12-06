// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const leftCountPara=document.querySelector('p');
// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let balls=[];
// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}


function Shape(x,y,velX,velY,exists){
  this.x=x
  this.y=y
  this.velX=velX
  this.velY=velY
  this.exists=exists  
}


function Ball(x,y,velX,velY,exists,color,size){//VEL為速度
  Shape.call(this,x,y,velX,velY,exists)
  this.color=color
  this.size=size
}

Ball.prototype=Object.create(Shape.prototype)
Ball.prototype.constructor=Ball;




Ball.prototype.draw=function(){
  if(this.exists){
    ctx.beginPath()//開始在CANVAS上繪製
    ctx.fillStyle=this.color;//設置顏色
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI)//X Y為圓的中心點 SIZE為半徑
    ctx.fill()

  }
 
}
Ball.prototype.update=function(){
  if((this.x+this.size)>=width){
    this.velX=-(this.velX);
  }
  if((this.x-this.size)<=0){
    this.velX=-(this.velX);
  }
  if((this.y+this.size)>=height){
    this.velY=-(this.velY);
  }
  if((this.y-this.size)<=0){
    this.velY=-(this.velY);
  }
  this.x+=this.velX
  this.y+=this.velY
}
Ball.prototype.collisionDetect=function(){
  for(let j=0;j<balls.length;j++){
    let curBall=balls[j];
    if(this!==curBall){
      var dx=this.x-curBall.x;
      var dy=this.y-curBall.y;
      var distance=Math.sqrt(dx*dx+dy*dy)

      if(distance<this.size+curBall.size){
        curBall.color=this.color=randomColor()
      }
    }
  }
}
function EvilCircle(x,y,velX,velY,exists){
  Shape.call(this,x,y,velX,velY,exists) 
  this.color="white";
  this.size=10;  
}

EvilCircle.prototype=Object.create(Shape.prototype)
EvilCircle.prototype.constructor=EvilCircle;
EvilCircle.prototype.setControls=function(){
  window.onkeydown = e => {
    if (e.key === 'a') {
      this.x -= this.velX;
    } else if (e.key === 'd') {
      this.x += this.velX;
    } else if (e.key === 'w') {
      this.y -= this.velY;
    } else if (e.key === 's') {
      this.y += this.velY;
    }
  };
}

EvilCircle.prototype.draw=function(){
  

  ctx.beginPath()//開始在CANVAS上繪製
  ctx.strokeStyle=this.color;//設置顏色
  ctx.lineWidth=3
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI)//X Y為圓的中心點 SIZE為半徑
  ctx.stroke()
}


EvilCircle.prototype.update=function(){
  if((this.x+this.size)>=width){
    this.x=width-this.size;
  }
  if((this.x-this.size)<=0){
   this.x=0+this.size
  }
  if((this.y+this.size)>=height){
   this.y=height-this.size
  }
  if((this.y-this.size)<=0){
    this.y=0+this.size;
  }
  
}
EvilCircle.prototype.collisionDetect=function(){
  for(let j=0;j<balls.length;j++){
    let curBall=balls[j];
    if(this!==curBall){
      var dx=this.x-curBall.x;
      var dy=this.y-curBall.y;
      var distance=Math.sqrt(dx*dx+dy*dy)

      if(distance<this.size+curBall.size){
       curBall.exists=false;
      }
    }
  }
}
function calcLeftBallCount(){
  let totalAliveCount=0;
  balls.map(function(ball){
    if(ball.exists){
      totalAliveCount++
    }
  })
      return totalAliveCount
}

let evilCircle=new EvilCircle(
  100,
  100,
  20,
  20,
  true,
)

evilCircle.setControls()

function loop(){
  ctx.fillStyle="rgba(0,0,0,0.25)"//每執行一次LOOP就會蓋掉上一次畫的球 形成殘影效果
  ctx.fillRect(0,0,width,height);

  while(balls.length<25){
    
    let ball=new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      randomColor(),
      random(10,20)
      )
      balls.push(ball)
    
  }

  leftCountPara.textContent="剩餘"+calcLeftBallCount()+"小球"

  for(let i=0;i<balls.length;i++){
    let ball=balls[i];
    ball.update();
    ball.draw();
    ball.collisionDetect();//檢查有無碰撞
       
  }
  
  evilCircle.draw()
  evilCircle.update()
  evilCircle.collisionDetect()



  requestAnimationFrame(loop)//長時間持續執行動畫時使用這個API效能比較好
}

loop()