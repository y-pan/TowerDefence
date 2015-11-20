var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tower = (function (_super) {
        __extends(Tower, _super);
        // how to remember current target until lose it in range ? 
        function Tower(imageString, x, y, attack, fireRange, shootSpeed, level) {
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
            this._fireRange = fireRange;
            this._shootSpeed = shootSpeed;
            this._level = level;
        }
        Tower.prototype.setHasTarget = function (hasTarget) {
            this._hasTarget = hasTarget;
        };
        Tower.prototype.getHasTarget = function () {
            return this._hasTarget;
        };
        Tower.prototype.fireAt = function (enemy) {
            if (enemy.getLives() > 0) {
                this._setRotationAt(enemy);
                this._shoot();
                this._hasTarget = true;
                this._target = enemy;
                console.log(this._target);
            }
        };
        Tower.prototype.fireAsBefore = function () {
            if ((this._target.getLives() > 0) && (this._distance(this._target.getPosition(), this.getPosition()) <= this.getFireRange())) {
                this._setRotationAt(this._target);
                this._shoot();
            }
            else {
                this._hasTarget = false;
                this._target = null;
            }
            //console.log(this._hasTarget);
        };
        Tower.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        Tower.prototype.getTarget = function () {
            return this._target;
        };
        Tower.prototype.getFireRange = function () {
            return this._fireRange;
        };
        Tower.prototype._setRotationAt = function (object) {
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
            for (var i = 0; i < bulletArray.length; i++) {
                if (bulletArray[i].isReady) {
                    bulletArray[i].fireBullet(this);
                }
            }
            /*
            if (this._hasTarget) {
                console.log("hasTarget");
                for (var i = 0; i < bulletArray.length; i++) {
                    if (bulletArray[i].isReady) {
                        bulletArray[i].fireBullet(this);
                    }
                }
            }*/
        };
        /** This is for centered tower */
        Tower.prototype.getGunpoint = function () {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };
        ;
        Tower.prototype.getPosition = function () {
            return new createjs.Point(this.x, this.y);
        };
        return Tower;
    })(createjs.Bitmap);
    objects.Tower = Tower;
})(objects || (objects = {}));
//# sourceMappingURL=tower.js.map