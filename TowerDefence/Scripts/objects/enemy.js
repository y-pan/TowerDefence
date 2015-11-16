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
        function Enemy(atlas, imageString, x, y, lives, speed, direction) {
            _super.call(this, atlas, imageString);
            this.x = x;
            this.y = y;
            this._lives = lives;
            this._speed = speed;
            this._direction = direction;
        }
        Enemy.prototype.update = function () {
            this._moveWith_Speed_Drection();
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
            }
        };
        Enemy.prototype.setLives = function (value) { this._lives = value; };
        Enemy.prototype.getLives = function () { return this._lives; };
        Enemy.prototype.addLives = function (lives) { this._lives += lives; };
        Enemy.prototype.substractLives = function (lives) { this._lives -= lives; };
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