import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Level } from "./level";
import { Pipe } from "./pipe";
import { Ground } from "./ground";

// Step 2
export class Bird extends ex.Actor {
    playing = false;
    jumping = false;
    constructor(private level: Level) {
        super({
            pos: Config.BirdStartPos,
            width: 16,
            height: 16,
            color: ex.Color.Yellow,
            z: 11
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

    private isInputActive(engine: ex.Engine) {
        return (engine.input.keyboard.isHeld(ex.Keys.Space) ||
                engine.input.pointers.isDown(0))
    }

    // Step 4
    override onPostUpdate(engine: ex.Engine, elapsedMs: number): void {
        if (!this.playing) return;

        // if the space bar or the first pointer was down
        if (!this.jumping && this.isInputActive(engine)) {
            this.vel.y += Config.BirdJumpVelocity;
            this.jumping = true;
        }

        if (!this.isInputActive(engine)) {
            this.jumping = false;
        }

        this.vel.y = ex.clamp(this.vel.y, Config.BirdMinVelocity, Config.BirdMaxVelocity);

        // The "speed" the bird will move relative to pipes
        this.rotation = ex.vec(Config.PipeSpeed, this.vel.y).toAngle();
    }

    // Step 8
    start() {
        this.playing = true;
        this.pos = Config.BirdStartPos; // starting position
        this.acc = ex.vec(0, Config.BirdAcceleration); // pixels per second per second
    }

    // Step 8
    reset() {
        this.playing = false;
        this.pos = Config.BirdStartPos; // starting position
        this.vel = ex.vec(0, 0); // pixels per second
        this.acc = ex.vec(0, 0); // pixels per second per second
    }

    stop() {
        this.playing = false;
        this.vel = ex.vec(0, 0);
        this.acc = ex.vec(0, 0);
    }

    // Step 9
    override onCollisionStart(self: ex.Collider, other: ex.Collider): void {
        if (other.owner instanceof Pipe ||
            other.owner instanceof Ground
        ) {
            this.level.triggerGameOver();
        }
    }
}