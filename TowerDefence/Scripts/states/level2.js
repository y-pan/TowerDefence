var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    /**
     * File Name: Level2
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Level2 object extends objects.Scene, game Level2
     * History: 1.0
     */
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        // PRIVATE VAR
        function Level2() {
            _super.call(this);
        }
        // PUBLIC 
        Level2.prototype.start = function () {
        }; //end of start
        Level2.prototype.update = function () {
        }; // end of update 
        return Level2;
    })(objects.Scene);
    states.Level2 = Level2;
})(states || (states = {}));
//# sourceMappingURL=level2.js.map