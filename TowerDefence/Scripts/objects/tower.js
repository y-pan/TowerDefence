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
        function Tower(imageString, x, y, attack, fireRange, coldTime, level) {
            _super.call(this, imageString);
            this._imageString = imageString;
            this._timeCreated = createjs.Ticker.getTicks();
            this._isUpdatingLevel = false;
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
            this._coldTime = coldTime;
            this._level = level;
            this._oldTicks = createjs.Ticker.getTicks();
            // event
            this.on("mouseover", this.overTower, this);
            this.on("mouseout", this.outTower, this);
            this.on("click", this.clickTower, this);
        }
        Tower.prototype.getTimeCreated = function () {
            return this._timeCreated;
        };
        Tower.prototype.overTower = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        Tower.prototype.outTower = function (event) {
            event.currentTarget.alpha = 1;
        };
        Tower.prototype.clickTower = function (event) {
            console.log("click in tower created at: " + this.getTimeCreated());
            // check conditions: money > 50, this._level < 3    maxlevel = 3
            this._requestUpdateLevel();
        };
        Tower.prototype._requestUpdateLevel = function () {
            console.log("requestUpdateLevel()");
            // global to update this level if condition
            this._isUpdatingLevel = true;
        };
        Tower.prototype.getLevel = function () {
            return this._level;
        };
        Tower.prototype.getIsUpdatingLevel = function () {
            return this._isUpdatingLevel;
        };
        Tower.prototype.setIsUpdatingLevel = function (isUpdatingLevel) {
            this._isUpdatingLevel = isUpdatingLevel;
        };
        Tower.prototype.setLevel = function (level) {
            switch (level) {
                case 1:
                    this._imageString = assets.getResult("ta1");
                    break;
                case 2:
                    this._imageString = assets.getResult("ta2");
                    break;
                case 3:
                    this._imageString = assets.getResult("ta3");
                    break;
            }
            this.image = this._imageString;
        };
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
        Tower.prototype._setRotationAt = function (enemy) {
            // can use object.getNextPosition() to improve targeting enemy
            var temp = Math.floor(Math.atan((this.y - enemy.y) / (this.x - enemy.x)) * (180 / Math.PI));
            if (enemy.x > this.x) {
                this.rotation = temp;
            }
            else if (enemy.x < this.x) {
                this.rotation = 180 + temp;
            }
        };
        Tower.prototype._getBulletType = function () {
            switch (this._level) {
                case 1:
                    this._bulletType = "bullet1";
                    break;
                case 2:
                    this._bulletType = "bullet2";
                    break;
                case 3:
                    this._bulletType = "bullet3";
                    break;
            }
            return this._bulletType;
        };
        Tower.prototype._getBulletArray = function () {
            switch (this._level) {
                case 1:
                    return bullet1Array;
                    break;
                case 2:
                    return bullet1Array;
                    break;
                case 3:
                    return bullet1Array;
                    break;
            }
        };
        Tower.prototype._shoot = function () {
            //console.log(bulletArray.length);
            this._nowTicks = createjs.Ticker.getTicks();
            if (this._nowTicks - this._oldTicks >= this._coldTime) {
                this._shootBullet();
            }
        };
        Tower.prototype._shootBullet = function () {
            var fired = false;
            for (var i = 0; i < this._getBulletArray().length && !fired; i++) {
                //console.log(bulletArray[i].isReady);
                if (this._getBulletArray()[i].isReady) {
                    this._getBulletArray()[i].fireBullet(this);
                    fired = true;
                    this._oldTicks = this._nowTicks;
                }
            }
            // add one more when bullet is not enough to use  
            if (!fired) {
                this._getBulletArray().push(new objects.Bullet(assets.getResult(this._getBulletType()), "bullet", null, null, 5, 4, 8, 8, true));
                this._getBulletArray()[bullet1Array.length - 1].fireBullet(this);
                fired = true;
                this._oldTicks = this._nowTicks;
            }
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