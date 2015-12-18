var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: Enemy
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Enemy object for enemy
     * History: 1.0
     */
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        /** direction: up -1, down 1, west -2, east 2. Assume that escapePoint(heart) is only at the right or down side of screen. However it's better to make an object for escapePoint and check collision between enemy and escapePoint, so that escapePoint can be anywhere*/
        function Enemy(atlas, animation, lives, x, y, speed, direction) {
            _super.call(this, atlas, animation, x, y);
            //this.x = x;
            //this.y = y;
            this._orignalX = x;
            this._orignalY = y;
            this._lives = lives;
            this._orignalLives = this._lives; // for reset to reuse
            this._speed = speed;
            this._oldSpeed = this._speed; // used to recover the speed when the dead enemy goAgain()
            this._direction = direction;
            this._attack = 10;
            this._isDead = false;
            this._money = 50;
            this._lifeBarBorder = new createjs.Shape();
            this._lifeBarBorder.graphics.beginStroke("#fff").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._orignalLives, 4);
            this._lifeBar = new createjs.Shape();
            this._lifeBar.graphics.beginFill("#0f5").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._lives, 4);
            currentLevel.addChild(this._lifeBar);
            currentLevel.addChild(this._lifeBarBorder);
            currentLevel.addChild(this);
        }
        Enemy.prototype.getMoney = function () { return this._money; };
        Enemy.prototype.goAgain = function () {
            this._speed = this._oldSpeed;
            this._isDead = false;
            this.x = this._orignalX;
            this.y = this._orignalY;
            this._lives = this._orignalLives;
        };
        Enemy.prototype.getIsDead = function () {
            return this._isDead;
        };
        Enemy.prototype.dieOrRecycle = function () {
            this._speed = 0;
            this._isDead = true;
            this.x = this._orignalX;
            this.y = -1000;
            this._direction = config.DIRECTION_DOWN;
            this._updateLifeBar();
            waveManager.addEnemyKilledOrEscaped(); // to add 1 to wavemanager._enemyKilledOrEscaped
        };
        Enemy.prototype.update = function () {
            this._updateLifeBar();
            this._moveWith_Speed_Drection();
            //this._updateLifeBar();              
            // check if get to homeTile, this can be put in collision as well
            if (this.x > homeTile.x - 5 && this.x < homeTile.x + 5 && this.y > homeTile.y - 5 && this.y < homeTile.y + 5) {
                this._doAttack();
                this.dieOrRecycle();
            }
            /*
            if (this.y >= canvasHeight|| this.x >= canvasWidth) { // assume that final point(heart) is only at the right or down side of screen
                this._doAttack();
                this.dieOrRecycle();
            }     */
        };
        Enemy.prototype._updateLifeBar = function () {
            this._lifeBar.graphics.clear();
            this._lifeBarBorder.graphics.clear();
            if (this._lives >= this._orignalLives * .8) {
                this._lifeBar.graphics.beginFill("#0f5").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._lives, 4);
            }
            else if (this._lives >= this._orignalLives * .4) {
                this._lifeBar.graphics.beginFill("#ff0").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._lives, 4);
            }
            else {
                this._lifeBar.graphics.beginFill("#f00").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._lives, 4);
            }
            this._lifeBarBorder.graphics.beginStroke("#fff").drawRect(this.x - this._orignalLives * .5, this.y - this._height * .5 - 4, this._orignalLives, 4);
        };
        Enemy.prototype._doAttack = function () {
            scoreBoard.removeLives(this._attack);
        };
        Enemy.prototype._moveWith_Speed_Drection = function () {
            switch (this._direction) {
                case config.DIRECTION_DOWN:
                    this.y += this._speed;
                    break;
                case config.DIRECTION_UP:
                    this.y -= this._speed;
                    break;
                case config.DIRECTION_LEFT:
                    this.x -= this._speed;
                    break;
                case config.DIRECTION_RIGHT:
                    this.x += this._speed;
                    break;
            }
        };
        /** Get enemy position after 1 tick or more ticks, used for bullet's targeting ememy*/
        Enemy.prototype.getNextPosition = function (numTicksLater) {
            var num = numTicksLater ? numTicksLater : 1;
            switch (this._direction) {
                case config.DIRECTION_DOWN:
                    this._nextPosition.y = this.y + this._speed * num;
                    break;
                case config.DIRECTION_UP:
                    this._nextPosition.y = this.y + this._speed * num;
                    break;
                case config.DIRECTION_LEFT:
                    this._nextPosition.x = this.x - this._speed * num;
                    break;
                case config.DIRECTION_RIGHT:
                    this._nextPosition.x = this.x + this._speed * num;
                    break;
            }
            return this._nextPosition;
        };
        Enemy.prototype.getPosition = function () { return new createjs.Point(this.x, this.y); };
        Enemy.prototype.setLives = function (value) { this._lives = value; };
        Enemy.prototype.getLives = function () { return this._lives; };
        Enemy.prototype.addLives = function (lives) { this._lives += lives; };
        Enemy.prototype.removeLives = function (lives) { this._lives -= lives; };
        Enemy.prototype.setSpeed = function (value) { this._speed = value; };
        Enemy.prototype.getDirection = function () { return this._direction; };
        Enemy.prototype.setDirection = function (direction) { this._direction = direction; };
        /** slow down speed by percentage: new_speed = */
        Enemy.prototype.slowSpeed = function (percentage, period) {
            this._speed *= percentage;
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map