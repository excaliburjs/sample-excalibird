import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";

export class Ground extends ex.Actor {
    groundSprite = Resources.GroundImage.toSprite();
    moving = false;
    constructor(pos: ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            height: 64,
            width: 400,
            z: 1
        })
    }

    onInitialize(engine: ex.Engine): void {
        this.groundSprite.sourceView.width = engine.screen.drawWidth;
        this.groundSprite.destSize.width = engine.screen.drawWidth;
        this.graphics.use(this.groundSprite);
    }

    onPostUpdate(_engine: ex.Engine, elapsedMs: number): void {
        if (!this.moving) return;
        this.groundSprite.sourceView.x += Config.PipeSpeed * (elapsedMs / 1000);
        this.groundSprite.sourceView.x = this.groundSprite.sourceView.x % Resources.GroundImage.width;
    }

    start() {
        this.moving = true;
    }

    stop() {
        this.moving = false;
    }
}