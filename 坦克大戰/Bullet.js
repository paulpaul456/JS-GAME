/**
* Created by Alane on 14-3-11.
*/
function Bullet(x, y, direct, color) {
    this.isdead = false;
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = 4;
    this.color = color;
    //定時器,自行運動
    this.timer = setInterval((function (context) {
        return function () {
            Bullet.prototype.move.call(context)
        }
    })(this), 30);
}
Bullet.prototype.move = function () {
    switch (this.direct) {
        case 0:
            this.y -= this.speed;
            break;
        case 1:
            this.x += this.speed;
            break;
        case 2:
            this.y += this.speed;
            break;
        case 3:
            this.x -= this.speed;
            break;
    }

    //邊界檢測
    if (this.y < 0 || this.x > width || this.y > height || this.x < 0) {
        clearInterval(this.timer);
        this.isdead = true;
    }

    //碰撞檢測 檢測敵人坦克
    for (var i = 0; i < allTank.length; i++) {
        var temp = allTank[i];
        if (temp.isdead) {
            continue;
        }
        switch (temp.direct) {
            case 0:
            case 2: if (this.x > temp.x && this.x < temp.x + 20 && this.y > temp.y && this.y < temp.y + 30) {
                if (this.color == temp.color) {
                    break;
                }
                Bombs.push(new Bomb(temp.x - 10, temp.y - 10));
                clearInterval(this.timer);
                this.isdead = true;
                temp.isdead = true;
            } break
            case 1:
            case 3: if (this.x > temp.x && this.x < temp.x + 30 && this.y > temp.y && this.y < temp.y + 20) {
                if (this.color == temp.color) {
                    break;
                }
                Bombs.push(new Bomb(temp.x - 10, temp.y - 10));
                clearInterval(this.timer);
                this.isdead = true;
                temp.isdead = true;
            } break;
        }
    }

}
