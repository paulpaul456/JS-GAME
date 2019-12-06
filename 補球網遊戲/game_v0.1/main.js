// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

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

function Ball(x,y,velX,velY,color,size){//VEL為速度
  this.x=x
  this.y=y
  this.velX=velX
  this.velY=velY
  this.color=color
  this.size=size
}

Ball.prototype.draw=function(){
  ctx.beginPath()//開始在CANVAS上繪製
  ctx.fillStyle=this.color;//設置顏色
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI)//X Y為圓的中心點 SIZE為半徑
  ctx.fill()
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

let balls=[];

function loop(){
  ctx.fillStyle="rgba(0,0,0,0.25)"//每執行一次LOOP就會蓋掉上一次畫的球 形成殘影效果
  ctx.fillRect(0,0,width,height);

  while(balls.length<25){
    let ball=new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      randomColor(),
      random(10,20)
      )
      balls.push(ball)
    
  }
  for(let i=0;i<balls.length;i++){
    let ball=balls[i];
    ball.update();
    ball.draw();
    
  }
  requestAnimationFrame(loop)//長時間持續執行動畫時使用這個API效能比較好
}

loop()