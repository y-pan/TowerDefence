var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        /** direction: up -1, down 1, west -2, east 2*/
        function Enemy(atlas, imageString, lives, x, y, width, height, speed, direction) {
            _super.call(this, atlas, imageString);
            this.x = x;
            this.y = y;
            this._orignalX = this.x;
            this._orignalY = this.y;
            this._lives = lives;
            this._orignalLives = this._lives; // for reset to reuse
            this._speed = speed;
            this._direction = direction;
            this._width = width ? width : 64;
            this._height = height ? height : 64;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this._attack = 10;
            this._isDead = false;
            currentLevel.addChild(this);
        }
        Enemy.prototype.goAgain = function () {
            this._isDead = false;
            this.x = this._orignalX;
            this.y = this._orignalY;
            this._lives = this._orignalLives;
        };
        // ！！！！！！！！！！！！！！！！！！！
        Enemy.prototype.getIsDead = function () {
            return this._isDead;
        };
        //！！！！！！！！！！！！！！！！！！！
        Enemy.prototype.dieOrRecycle = function () {
            this._isDead = true;
            //this._lives = this._orignalLives;
            this.x = -30;
            this.y = -30;
        };
        Enemy.prototype.update = function () {
            this._moveWith_Speed_Drection();
            if (this.y >= canvasHeight || this.x >= canvasWidth) {
                this._doAttack();
                this.dieOrRecycle();
            }
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