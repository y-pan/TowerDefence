var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
        }
        // PUBLIC 
        Menu.prototype.start = function () {
            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            // titleLabel
            this._titleLabel = new objects.Label("Tower Defence", "30px Showcard Gothic", "#fcc", canvasWidth * .5, 50, true);
            this.addChild(this._titleLabel);
            // button
            this._startButton = new objects.Button("start_button", canvasWidth * .5 - 100, 350, 0, 0, true);
            this._startButton.on("click", this._clickStartButton, this);
            this.addChild(this._startButton);
            this._menuButton = new objects.Button("menu_button", canvasWidth * .5 + 100, 350, 0, 0, true);
            this._menuButton.on("click", this._clickMenuButton, this);
            this.addChild(this._menuButton);
            stage.addChild(this);
        }; //end of start
        // PRIVATE METHODS --------------------------------------------------------------------------
        Menu.prototype._clickStartButton = function (event) {
            createjs.Sound.play("horn");
            state = config.STATE_LEVEL1;
            changeState(state);
        };
        Menu.prototype._clickMenuButton = function (event) {
            createjs.Sound.play("ta_buttonPress");
        };
        Menu.prototype.update = function () {
        }; // end of update 
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map