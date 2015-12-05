var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: Label
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Label object extends createjs.Text, used for labels
     * History: 1.0
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(labelString, labelFont, labelColor, x, y, isCentered) {
            _super.call(this, labelString, labelFont, labelColor);
            if (isCentered) {
                this.regX = this.getBounds().width * .5;
                this.regY = this.getBounds().height * .5;
            }
            this.x = x;
            this.y = y;
        }
        return Label;
    })(createjs.Text);
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map