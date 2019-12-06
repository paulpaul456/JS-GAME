function Bomb(x,y){
    this.life = 12;
    this.x = x;
    this.y = y;
    }
    Bomb.prototype.lifeDown = function(){
    this.life--;
    }