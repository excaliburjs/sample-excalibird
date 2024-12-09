import * as ex from "excalibur";
import { Pipe } from "./pipe";
import { Config } from "./config";
import { Level } from "./level";
import { ScoreTrigger } from "./score-trigger";

export class PipeFactory {

    private timer: ex.Timer;
    constructor(
        private level: Level,
        private random: ex.Random,
        intervalMs: number) {
            this.timer = new ex.Timer({
                interval: intervalMs,
                repeats: true,
                action: () => this.spawnPipes()
            });
            this.level.add(this.timer);
    }

    spawnPipes() {
        const randomPipePosition = this.random.floating(0, this.level.engine.screen.resolution.height - Config.PipeGap);

        const bottomPipe = new Pipe(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition + Config.PipeGap),
            'bottom'
        );
        this.level.add(bottomPipe);

        const topPipe = new Pipe(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition),
            'top'
        );
        this.level.add(topPipe);

        const scoreTrigger = new ScoreTrigger(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition),
            this.level
        );
        this.level.add(scoreTrigger);

    }

    start() {
        this.timer.start();
    }

    reset() {
        for (const actor of this.level.actors) {
            if (actor instanceof Pipe ||
                actor instanceof ScoreTrigger
            ) {
                actor.kill();
            }
        }
    }

    stop() {
        this.timer.stop();
        for (const actor of this.level.actors) {
            if (actor instanceof Pipe ||
                actor instanceof ScoreTrigger
            ) {
                actor.vel = ex.vec(0, 0);
            }
        }
    }
}