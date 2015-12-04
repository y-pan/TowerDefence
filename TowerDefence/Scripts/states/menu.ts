module states {

    export class Menu extends objects.Scene {

        // PRIVATE VAR
        private _background: objects.Background;
        private _titleLabel: objects.Label;
        private _startButton: objects.Button;
        private _menuButton: objects.Button;

        constructor() { super(); }

        // PUBLIC 
        public start(): void {
            // background
            this._background = new objects.Background("background_1");
            this.addChild(this._background);

            // titleLabel
            this._titleLabel = new objects.Label("Tower Defence","30px Showcard Gothic", "#000", canvasWidth*.5, 50,true);
            this.addChild(this._titleLabel);
            
            // button
            this._startButton = new objects.Button("start_button", canvasWidth * .5 - 100, 350, 0, 0, true);
            this._startButton.on("click", this._clickStartButton, this);
            this.addChild(this._startButton);

            this._menuButton = new objects.Button("menu_button", canvasWidth * .5 + 100, 350, 0, 0, true);
            this._menuButton.on("click", this._clickMenuButton, this);
            this.addChild(this._menuButton);

            stage.addChild(this);
        }//end of start


        // PRIVATE METHODS --------------------------------------------------------------------------
        private _clickStartButton(event: createjs.MouseEvent): void {
            createjs.Sound.play("horn");
            state = config.STATE_LEVEL1;
            changeState(state);
        }
        private _clickMenuButton(event: createjs.MouseEvent): void {
            createjs.Sound.play("ta_buttonPress");
        }

        public update(): void {

        }// end of update 

    }
}