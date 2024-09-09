import * as ex from "excalibur";
import { Pipe } from "./pipe";
import { Config } from "./config";
import { Level } from "./level";
import { ScoreTrigger } from "./score-trigger";

// Step 9
export class PipeFactory {

    private spawning = false;
    private pipes: Pipe[] = [];
    private timer: ex.Timer;
    constructor(
        private level: Level,
        private random: ex.Random,
        private intervalMs: number) {
            this.timer = new ex.Timer({
                interval: intervalMs,
                repeats: true,
                fcn: () => this.spawnPipes()
            });
            this.level.add(this.timer);
    }

    spawnPipes() {
        if (!this.spawning) return;

        const randomPipePosition = this.random.floating(0, this.level.engine.screen.resolution.height - Config.PipeGap);

        const bottomPipe = new Pipe(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition + Config.PipeGap),
            'bottom'
        );
        bottomPipe.once('exitviewport', () => {
            this.removePipe(bottomPipe);
        });
        this.level.add(bottomPipe);
        this.pipes.push(bottomPipe);

        const topPipe = new Pipe(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition),
            'top'
        );
        topPipe.once('exitviewport', () => {
            this.removePipe(topPipe);
        });
        this.level.add(topPipe);
        this.pipes.push(topPipe);

        const scoreTrigger = new ScoreTrigger(
            ex.vec(this.level.engine.screen.drawWidth, randomPipePosition),
            this.level
        );
        this.level.add(scoreTrigger);

    }

    start() {
        this.spawning = true;
        this.timer.start();
    }

    reset() {
        this.spawning = false;
        for (let pipe of this.pipes) {
            pipe.kill();
        }
        this.pipes = [];
    }

    stop() {
        this.spawning = false;
        this.timer.stop();
        for (let pipe of this.pipes) {
            pipe.vel = ex.vec(0, 0);
        }
    }

    removePipe(pipe: Pipe) {
        const index = this.pipes.indexOf(pipe);
        if (index > -1) {
            this.pipes.splice(index, 1);
        }
        pipe.kill();
    }
}