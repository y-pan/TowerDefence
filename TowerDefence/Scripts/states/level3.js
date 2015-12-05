var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    /**
     * File Name: Level3
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Level3 object extends objects.Scene, game Level3
     * History: 1.0
     */
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        // PRIVATE VAR
        function Level3() {
            _super.call(this);
        }
        // PUBLIC 
        Level3.prototype.start = function () {
        }; //end of start
        Level3.prototype.update = function () {
        }; // end of update 
        return Level3;
    })(objects.Scene);
    states.Level3 = Level3;
})(states || (states = {}));
//# sourceMappingURL=level3.js.map