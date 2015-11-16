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
                //this._target = object;
                this._getRotation(object);
                this._shoot();
            }
            else {
                this._hasTarget = false;
            }
        };
        Tower.prototype._getRotation = function (object) {
            //this.rotation++;
            //this.rotation = 370;
            //this.rotation = Math.floor(Math.atan((this.y - object.y) / (this.x - object.x)) * (180 / Math.PI));
            //this.rotation = -Math.floor(Math.atan((this.y - stage.mouseY) / (this.x - stage.mouseY)) * (180 / Math.PI));
            //this.rotation = Math.floor(Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI));
            //var temp = (Math.floor(Math.abs(Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI))));
            var temp = (Math.floor(-Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI)));
            if (temp) {
                this.rotation = temp;
            }
            else if (stage.mouseY > this.y) {
                this.rotation = 90;
            }
            else if (stage.mouseY < this.y) {
                this.rotation = -90;
            }
            console.log("tower rotation: " + this.rotation);
        };
        Tower.prototype._shoot = function () {
        };
        Tower.prototype._distanceToMouse = function () {
            return Math.floor(Math.sqrt(Math.pow((stage.mouseX - this.x), 2) + Math.pow((stage.mouseY - this.y), 2)));
        };
        return Tower;
    })(createjs.Bitmap);
    objects.Tower = Tower;
})(objects || (objects = {}));
//# sourceMappingURL=tower.js.map