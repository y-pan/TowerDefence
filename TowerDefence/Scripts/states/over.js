var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    /**
     * File Name: Over
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Over object extends objects.Scene, for game over
     * History: 1.0
     */
    var Over = (function (_super) {
        __extends(Over, _super);
        // PRIVATE VAR
        function Over() {
            _super.call(this);
        }
        // PUBLIC 
        Over.prototype.start = function () {
        }; //end of start
        Over.prototype.update = function () {
        }; // end of update 
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map