/**
 * File Name: config
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: configuration for entire game, used for managing general values
 * History: 1.0
 */
var config;
(function (config) {
    config.STATE_MENU = 0;
    config.STATE_LEVEL1 = 1;
    config.STATE_LEVEL2 = 2;
    config.STATE_LEVEL3 = 3;
    config.STATE_OVER = 4;
    // direction
    config.DIRECTION_UP = -1;
    config.DIRECTION_DOWN = 1;
    config.DIRECTION_LEFT = -2;
    config.DIRECTION_RIGHT = 2;
    // tower type
    /**TowerType + i = imagePathString*/
    config.TowerType_1 = "ta";
    config.TowerType_2 = "tb";
    // setting for tower
    config.TowerLevel_1 = 1;
    config.TowerLevel_Max = 3;
    config.TowerCost_Build = 150;
    config.TowerCost_UpdateTo2 = 200;
    config.TowerCost_UpdateTo3 = 300;
    config.FireRange_1 = 100;
    config.FireRange_2 = 150;
    config.FireRange_3 = 250;
    config.FireColdTime_1 = 80;
    config.FireCodeTime_2 = 70;
    config.FireCodeTime_3 = 50;
})(config || (config = {}));
//# sourceMappingURL=config.js.map