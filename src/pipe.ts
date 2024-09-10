import * as ex from "excalibur";
import { Config } from "./config";
import { Resources } from "./resources";

// Step 9
export class Pipe extends ex.Actor {
    constructor(pos: ex.Vector, public type: 'top' | 'bottom') {
        super({
            pos,
            width: 32,
            height: 1000,
            anchor: type === 'bottom' ? ex.vec(0, 0) : ex.vec(0, 1),
            color: ex.Color.Green,
            collisionType: ex.CollisionType.Fixed,
            vel: ex.vec(-Config.PipeSpeed, 0)
        })

        this.on('exitviewport', () => this.kill());
    }

    // Step 9.5
    override onInitialize(engine: ex.Engine): void {
        const pipeEnd = Resources.PipeImage.toSprite();
        // Stretch the pipe sprite
        // by default ImageSource use clamp which re-uses the border pixels 
        // when sourceView is larger than the original image
        pipeEnd.sourceView.height = 1000;
        pipeEnd.destSize.height = 1000;

        // Flip the pipe sprite
        if (this.type === 'top') {
            pipeEnd.flipVertical = true;
        }
        this.graphics.use(pipeEnd);
    }
}