var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: GameObject
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: GameObject object extends createjs.Sprite, used for object which needs animations
     * History: 1.0
     */
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(atlas, imageString) {
            _super.call(this, atlas, imageString);
            this._tag = imageString;
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            //this._isColliding = false;
        }
        /** Get position of object */
        GameObject.prototype.getPosition = function () {
            return new createjs.Point(this.x, this.y);
        };
        /** Get half height of object */
        GameObject.prototype.getHalfHeight = function () {
            return this._height * .5;
        };
        /** Get half width of object */
        GameObject.prototype.getHalfWidth = function () {
            return this._width * .5;
        };
        /** Get isColliding of object */
        GameObject.prototype.getIsColliding = function () {
            return this._isColliding;
        };
        /** Set isColliding of object*/
        GameObject.prototype.setIsColliding = function (isColliding) {
            this._isColliding = isColliding;
        };
        /** Get name of object*/
        GameObject.prototype.getName = function () {
            return this._tag;
        };
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map