import * as ex from "excalibur";
import { Config } from "./config";

// Step 9
export class Pipe extends ex.Actor {
    constructor(pos: ex.Vector, type: 'top' | 'bottom') {
        super({
            pos,
            width: 64,
            height: 1000,
            anchor: type === 'bottom' ? ex.vec(0, 0) : ex.vec(0, 1),
            color: ex.Color.Green,
            collisionType: ex.CollisionType.Fixed,
            vel: ex.vec(-Config.PipeSpeed, 0)
        })
    }
}