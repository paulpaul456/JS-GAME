function draw() {
    //檢測子彈和坦克生死
    checkDead();
    //清空畫布
    ctx.clearRect(0, 0, 500, 400);
    //畫玩家
    if (!hero.isdead) {
        drawTank(hero);
    } else {
        hero.cutLife();
    }
    //畫敵人坦克
    for (var i = 0; i < enemys.length; i++) {
        drawTank(enemys[i]);
    }
    //畫敵人子彈
    for (var j = 0; j < enemys.length; j++) {
        var temp = enemys[j].bulletsList;
        for (var i = 0; i < temp.length; i++) {
            drawBullet(temp[i]);
        }
    }
    //畫玩家子彈
    var temp = hero.bulletsList;
    for (var i = 0; i < temp.length; i++) {
        drawBullet(temp[i]);
    }

    //畫炸彈
    for (var i = 0; i < Bombs.length; i++) {
        drawBown(Bombs[i]);
    }

}

function drawTank(tank) {
    var x = tank.x;
    var y = tank.y;
    ctx.fillStyle = tank.color;

    if (tank.direct == 0 || tank.direct == 2) {
        ctx.fillRect(x, y, 5, 30);
        ctx.fillRect(x + 15, y, 5, 30);

        ctx.fillRect(x + 6, y + 8, 8, 15);

        ctx.strokeStyle = tank.color;
        ctx.lineWidth = '1.5';
        if (tank.direct == 0) {
            ctx.beginPath();
            ctx.moveTo(x + 10, y - 2);
            ctx.lineTo(x + 10, y + 8);
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 24);
            ctx.lineTo(x + 10, y + 32);
            ctx.closePath();
        }

        ctx.stroke();
    } else {
        ctx.fillRect(x, y, 30, 5);
        ctx.fillRect(x, y + 15, 30, 5);

        ctx.fillRect(x + 8, y + 6, 15, 8);

        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = '1.5';
        if (tank.direct == 3) {
            ctx.beginPath();
            ctx.moveTo(x - 2, y + 10);
            ctx.lineTo(x + 8, y + 10);
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.moveTo(x + 24, y + 10);
            ctx.lineTo(x + 32, y + 10);
            ctx.closePath();
        }

        ctx.stroke();
    }

}
function drawBullet(bullet) {
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 2, 360, true);
    ctx.closePath();
    ctx.fill();
}

function drawBown(obj) {
    if (obj.life > 8) {
        ctx.drawImage(im, obj.x, obj.y, 50, 50);
    } else if (obj.life > 4) {
        ctx.drawImage(im2, obj.x, obj.y, 50, 50);
    } else {
        ctx.drawImage(im3, obj.x, obj.y, 50, 50);
    }

    obj.lifeDown();
    if (obj.life <= 0) {
        Bombs.deleteElement(obj);
    }
}

function checkDead() {
    //檢測敵人子彈生死
    for (var j = 0; j < enemys.length; j++) {
        var temp = enemys[j].bulletsList;
        for (var i = 0; i < temp.length; i++) {
            var o = temp[i];
            if (o.isdead) {
                temp.deleteElement(o);
            }
        }
    }
    //檢測玩家子彈生死
    var temp = hero.bulletsList;
    for (var i = 0; i < temp.length; i++) {
        var o = temp[i];
        if (o.isdead) {
            temp.deleteElement(o);
        }
    }

    //檢測敵人坦克生死
    for (var i = 0; i < enemys.length; i++) {
        var o = enemys[i];
        if (o.isdead) {
            enemys.deleteElement(o);
        }
    }
}
