var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: Button
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Button object button
     * History: 1.0
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(pathString, x, y, width, height, isCentered) {
            _super.call(this, assets.getResult(pathString));
            this.x = x;
            this.y = y;
            this._width = width > 0 ? width : 150;
            this._height = height > 0 ? height : 60;
            if (isCentered) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
            this.on("click", this.clickButton, this);
        }
        Button.prototype.overButton = function (event) {
            event.currentTarget.alpha = .8;
        };
        Button.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1;
        };
        Button.prototype.clickButton = function (event) {
            createjs.Sound.play("ta_buttonPress");
        };
        return Button;
    })(createjs.Bitmap);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map