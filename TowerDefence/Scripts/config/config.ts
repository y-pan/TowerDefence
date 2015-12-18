/**
 * File Name: config
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: configuration for entire game, used for managing general values
 * History: 1.0
 */
module config {

    export var STATE_MENU: number = 0;
    export var STATE_LEVEL1: number = 1;
    export var STATE_LEVEL2: number = 2;
    export var STATE_LEVEL3: number = 3;
    export var STATE_OVER: number = 4;

    // tile tag/type string
    export var TILE_BLANK: number = 0;
    export var TILE_PATH: number = 1;
    export var TILE_DIRECTION: number = 2;
    export var TILE_MENU: number = 3;
    export var TILE_START: number = 4;
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
    export var TowerCost_Build: number = 150;
    export var TowerCost_UpdateTo2: number = 200;
    export var TowerCost_UpdateTo3: number = 300;

    export var FireRange_1: number = 100;
    export var FireRange_2: number = 150;
    export var FireRange_3: number = 250;

    export var FireColdTime_1: number = 80;
    export var FireCodeTime_2: number = 70;
    export var FireCodeTime_3: number = 50;

    // size of tile image
    export var TileWidth: number = 40;
    export var TileHeight: number = 40;
    export var TileNumInRow: number = 640 / TileWidth; // canvas Width 640
    export var TileNumInCol: number = 480 / TileHeight; // canvas height 480
   
} 