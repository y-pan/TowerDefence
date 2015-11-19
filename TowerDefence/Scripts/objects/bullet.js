var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(imagePath, x, y, attack, speed, width, height, isCentered) {
            _super.call(this, imagePath);
            this.x = x ? x : -10; // store outside 
            this.y = y ? y : -10; // store outside
            this._attack = attack ? attack : 5;
            this._speed = speed ? speed : 5;
            this._width = width ? width : 8;
            this._height = height ? height : 8;
            if (isCentered) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }
            this.isReady = true;
        }
        Bullet.prototype.fireBullet = function (tower) {
            //
            if (this.isReady) {
                this._setDirection(tower);
                this._flyAtDirection();
            }
        };
        Bullet.prototype.update = function () {
            if (!this.isReady) {
                // keep flying
                this._flyAtDirection();
                // detect if it fly outside
                if (this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0) {
                    this._reset();
                }
            }
        };
        /** reset bullet and put it outside canvas*/
        Bullet.prototype._reset = function () {
            this.x = -10;
            this.y = -10;
            this._dx = 0;
            this._dy = 0;
            this.isReady = true;
        };
        Bullet.prototype._setDirection = function (tower) {
            var r = tower.rotation;
            //this.x = tower.getGunpoint().x; // how to rotate gunpoint ?
            //this.y = tower.getGunpoint().y;
            this.x = tower.x;
            this.y = tower.y;
            this._dx = Math.floor(this._speed * Math.cos(r * Math.PI / 180));
            this._dy = Math.floor(this._speed * Math.sin(r * Math.PI / 180));
            console.log("fired at " + r + " : " + this._dx + "|" + this._dy);
        };
        Bullet.prototype._flyAtDirection = function () {
            this.x += this._dx;
            this.y += this._dy;
            this.isReady = false;
            //console.log("b @ " + this.x + " | " + this.y);  
        };
        return Bullet;
    })(createjs.Bitmap);
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map