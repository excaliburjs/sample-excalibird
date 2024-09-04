import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Level } from "./level";

// Step 2
export class Bird extends ex.Actor {
    playing = false;
    constructor(private level: Level) {
        super({
            x: 200,
            y: 300,
            width: 32,
            height: 32,
            color: ex.Color.Yellow
        });
    }

    // Step 3
    override onInitialize(engine: ex.Engine): void {
        // this.acc = ex.vec(0, 1500); // pixels per second per second

        // Step 6
        const sprite = Resources.BirdImage.toSprite();
        this.graphics.use(sprite);

        // Step 9
        this.on('exitviewport', () => {
            this.level.triggerGameOver();
        });
    }

    // Step 4
    override onPostUpdate(engine: ex.Engine, delta: number): void {
        if (!this.playing) return;

        // if the space bar or the first pointer was down
        if (engine.input.keyboard.wasPressed(ex.Keys.Space) ||
            engine.input.pointers.wasDown(0)) {
            this.vel.y += Config.BirdJumpVelocity;
        }
        this.vel.y = ex.clamp(this.vel.y, Config.BirdMinVelocity, Config.BirdMaxVelocity);

        // The "speed" the bird will move relative to pipes
        this.rotation = ex.vec(Config.PipeSpeed, this.vel.y).toAngle();
    }

    // Step 8
    start() {
        this.playing = true;
        this.pos = ex.vec(200, 300); // starting position
        this.acc = ex.vec(0, 1500); // pixels per second per second
    }

    // Step 8
    reset() {
        this.playing = false;
        this.pos = ex.vec(200, 300); // starting position
        this.vel = ex.vec(0, 0); // pixels per second
        this.acc = ex.vec(0, 0); // pixels per second per second
    }

    stop() {
        this.playing = false;
        this.vel = ex.vec(0, 0);
        this.acc = ex.vec(0, 0);
    }

    // Step 9
    override onCollisionStart(): void {
        console.log("collision");
        this.level.triggerGameOver();
    }
}