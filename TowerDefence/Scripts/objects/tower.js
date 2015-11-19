var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tower = (function (_super) {
        __extends(Tower, _super);
        function Tower(imageString, x, y, attack, shootSpeed, level) {
            _super.call(this, imageString);
            this.x = x;
            this.y = y;
            this._width = 50;
            this._height = 50;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this.rotation = 0;
            this._hasTarget = false;
            this._attack = attack;
            this._shootSpeed = shootSpeed;
            this._level = level;
        }
        Tower.prototype.update = function (object) {
            if (object) {
                this._hasTarget = true;
                this._getRotation(object);
                this._shoot();
            }
            else {
                this._hasTarget = false;
            }
        };
        Tower.prototype._getRotation = function (object) {
            // can use object.getNextPosition() to improve targeting enemy
            var temp = Math.floor(Math.atan((this.y - object.y) / (this.x - object.x)) * (180 / Math.PI));
            if (object.x > this.x) {
                this.rotation = temp;
            }
            else if (object.x < this.x) {
                this.rotation = 180 + temp;
            }
            //console.log("temp: " + temp + ", " + this.rotation);
        };
        Tower.prototype._shoot = function () {
            if (this._hasTarget) {
                for (var i = 0; i < bullets_green.length; i++) {
                    if (bullets_green[i].isReady) {
                        bullets_green[i].fireBullet(this);
                    }
                }
            }
        };
        /** This is for centered tower */
        Tower.prototype.getGunpoint = function () {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };
        ;
        return Tower;
    })(createjs.Bitmap);
    objects.Tower = Tower;
})(objects || (objects = {}));
//# sourceMappingURL=tower.js.map