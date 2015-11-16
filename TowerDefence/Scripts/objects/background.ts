module objects {

    export class Background extends createjs.Bitmap {

        constructor(pathString:string) {
            super(assets.getResult(pathString));
        }
    }
} 