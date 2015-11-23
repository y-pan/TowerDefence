module objects {

    export class WeaponButton extends objects.Button {

        protected _towerPreview: createjs.Bitmap;
        protected _pathString: string;
        protected _isDragging: boolean;
        //protected _type;
        /**Added this weaponbutton object to currentLevel by its constructor*/
        constructor(pathString: string, x: number, y: number, width:number, height:number, isCentered:boolean) {
            super(pathString, x, y, width, height, isCentered);

            this._pathString = pathString;
            this._createTowerPreview();
            this._isDragging = false;

            this.on("pressmove", this.pressmoveWeaponButton, this);
            this.on("pressup", this.pressupWeaponButton, this);

            //this._towerPreview.on("pressup", this.mouseupTowerPreview, this._towerPreview);

            currentLevel.addChild(this);
        }

        pressmoveWeaponButton(event: createjs.MouseEvent): void {            
            this._moveTowerPreview();
        }
        pressupWeaponButton(event: createjs.MouseEvent): void {
            if (this._isDragging) {
                //console.log("pressup");

                this._createTower();
                this._resetPositionTowerPreview();
                this._isDragging = false;
            }
        }
       
        private _createTower(): void {
            towers.push(new objects.Tower(assets.getResult(this._pathString), "ta", this._towerPreview.x, this._towerPreview.y, 5, 300, 20, 1));
        }
        private _resetPositionTowerPreview(): void {
            this._towerPreview.x = -100;
            this._towerPreview.y = 0;
        }
        private _createTowerPreview(): void {
            this._towerPreview = new createjs.Bitmap(assets.getResult(this._pathString));
            this._towerPreview.regX = 25;
            this._towerPreview.regY = 25;
            this._resetPositionTowerPreview();
            currentLevel.addChild(this._towerPreview);            
        }

        private _moveTowerPreview(): void {
            this._isDragging = true;
            this._towerPreview.x = stage.mouseX;
            this._towerPreview.y = stage.mouseY;
        }



        // override
        /*
        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = .8;          
        }

        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1;
        }*/

    }
}