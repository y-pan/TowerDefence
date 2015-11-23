module config {

    export var STATE_MENU: number = 0;
    export var STATE_LEVEL1: number = 1;
    export var STATE_LEVEL2: number = 2;
    export var STATE_LEVEL3: number = 3;
    export var STATE_OVER: number = 4;

    // direction
    export var DIRECTION_UP: number = -1;
    export var DIRECTION_DOWN: number = 1;
    export var DIRECTION_LEFT: number = -2;
    export var DIRECTION_RIGHT: number = 2;

    // tower type
    /**TowerType + i = imagePathString*/
    export var TowerType_1: string = "ta";
    export var TowerType_2: string = "tb";
        

    // setting for tower
    export var TowerLevel_1: number = 1
    export var TowerLevel_Max: number = 3;

    export var FireRange_1: number = 100;
    export var FireRange_2: number = 150;
    export var FireRange_3: number = 250;

    export var FireColdTime_1: number = 80;
    export var FireCodeTime_2: number = 70;
    export var FireCodeTime_3: number = 50;
} 