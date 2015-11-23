/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />


/// <reference path="../config/config.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/button.ts" />

/// <reference path="../objects/weaponbutton.ts" />

/// <reference path="../managers/collision.ts" />
/// <reference path="../objects/gameobject.ts" />


/// <reference path="../objects/enemy.ts" />

/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/tower.ts" />


/// <reference path="../objects/directiontile.ts" />

/// <reference path="../managers/scoreboard.ts" />

/// <reference path="../objects/scene.ts" />

/// <reference path="../states/menu.ts" />
/// <reference path="../states/level1.ts" />
/// <reference path="../states/level2.ts" />
/// <reference path="../states/level3.ts" />
/// <reference path="../states/over.ts" />



var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var state: number;
var currentState: objects.Scene;

var scoreBoard: managers.ScoreBoard;
var collision: managers.Collsion;


var bullets1: objects.Bullet[];
var bullets2: objects.Bullet[];
var bullets3: objects.Bullet[];

var enemies: objects.Enemy[];
var towers: objects.Tower[];
var directionTiles: objects.DirectionTile[];

var canvasWidth: number = 640;
var canvasHeight: number = 480;


// atlas & data
var redDragonData: {};
var redDragonAtlas: createjs.SpriteSheet;


//
var menu: states.Menu;
var currentLevel: objects.Scene;
var over: states.Over;

var manifest = [

    { id: "grass_background", src: "../../Assets/images/grass_background.png" },
    { id: "menu_bar", src: "../../Assets/images/menu_bar.png" },

    { id: "start_button", src: "../../Assets/images/start_button.png" },
    { id: "menu_button", src: "../../Assets/images/menu_button.png" },

    { id: "next_button", src: "../../Assets/images/next_button.png" },
    { id: "again_button", src: "../../Assets/images/again_button.png" },
    { id: "exit_button", src: "../../Assets/images/exit_button.png" },


    { id: "ta1", src: "../../Assets/images/ta1.png" },
    { id: "ta2", src: "../../Assets/images/ta2.png" },
    { id: "ta3", src: "../../Assets/images/ta3.png" },
    { id: "tb1", src: "../../Assets/images/tb1.png" },
    { id: "tb2", src: "../../Assets/images/tb2.png" },
    { id: "tb3", src: "../../Assets/images/tb3.png" },

    { id: "bullet1", src: "../../Assets/images/bullet1.png" },
    { id: "bullet2", src: "../../Assets/images/bullet2.png" },
    { id: "bullet3", src: "../../Assets/images/bullet3.png" },

    { id: "redDragon", src: "../../Assets/images/redDragon.png" },


    { id: "direction_up", src: "../../Assets/images/direction_up.png" },
    { id: "direction_down", src: "../../Assets/images/direction_down.png" },
    { id: "direction_left", src: "../../Assets/images/direction_left.png" },
    { id: "direction_right", src: "../../Assets/images/direction_right.png" },

    { id: "horn", src: "../../Assets/audio/horn.mp3" },
    { id: "ta_buttonPress", src: "../../Assets/audio/ta_buttonPress.mp3" },

];

// data for spriteSheet
redDragonData = {
    "images": [
        "../../Assets/images/redDragon.png"
    ],
    "frames": [
        [0, 0, 64, 64, 0, 32, 32],
        [64, 0, 64, 64, 0, 32, 32],
        [128, 0, 64, 64, 0, 32, 32],
        [192, 0, 64, 64, 0, 32, 32]
    ],
    "animations": {
        fly: [0, 3, true, 0.2]
    }
};


function preload(): void {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);

    // atlas: spriteSheet
    redDragonAtlas = new createjs.SpriteSheet(redDragonData);
}

function init(): void {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", gameLoop);
    setupStats();

    state = config.STATE_MENU;
    changeState(state);
}

function gameLoop(event: createjs.Event): void {
    stats.begin();
    currentState.update();
    stage.update();
    stats.end();
}

function setupStats(): void {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

function changeState(_state): void {
    state = _state;
    switch (_state) {
        case config.STATE_MENU:
            stage.removeAllChildren();            
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.STATE_OVER:
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
        case config.STATE_LEVEL1:
            stage.removeAllChildren();
            currentLevel = new states.Level1;
            currentState = currentLevel;
            break;
        case config.STATE_LEVEL2:
            stage.removeAllChildren();
            currentLevel = new states.Level2;
            currentState = currentLevel;
            break;
        case config.STATE_LEVEL3:
            stage.removeAllChildren();
            currentLevel = new states.Level3;
            currentState = currentLevel;
            break;
    }
    currentState.start();
    console.log(stage.numChildren);
}

