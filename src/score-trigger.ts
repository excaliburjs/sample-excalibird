import * as ex from "excalibur";
import { Level } from "./level";
import { Config } from "./config";
import { Resources } from "./resources";


export class ScoreTrigger extends ex.Actor {
    constructor(pos: ex.Vector, private level: Level) {
        super({
            pos,
            width: 32,
            height: Config.PipeGap,
            anchor: ex.vec(0, 0),
            // color: ex.Color.Violet,
            vel: ex.vec(-Config.PipeSpeed, 0)
        })

        this.on('exitviewport', () => {
            this.kill();
        });
    }

    override onCollisionStart(): void {
        this.level.incrementScore();
        Resources.ScoreSound.play();
    }
}