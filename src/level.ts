import * as ex from "excalibur";
import { Bird } from "./bird";
import { PipeFactory } from "./pipe-factory";
import { Config } from "./config";
import { Ground } from "./ground";

// Step 7
export class Level extends ex.Scene {
    score: number = 0;
    random = new ex.Random();
    pipeFactory = new PipeFactory(this, this.random, Config.PipeInterval);
    bird = new Bird(this);
    ground!: Ground;
    startGameLabel = new ex.Label({
        text: 'Tap to Start',
        x: 200,
        y: 200,
        z: 10,
        font: new ex.Font({
            size: 30,
            color: ex.Color.White,
            textAlign: ex.TextAlign.Center
        })
    });
    scoreLabel = new ex.Label({
        text: 'Score: 0',
        x: 0,
        y: 0,
        z: 10,
        font: new ex.Font({
            size: 20,
            color: ex.Color.White
        })
    })
    onInitialize(engine: ex.Engine): void {
        this.add(this.bird);

        // Step 8
        this.add(this.startGameLabel);
        this.add(this.scoreLabel);

        this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64))
        this.add(this.ground);


        // Step 9
        // const pipe = new Pipe(ex.vec(300, 400));
        // this.add(pipe);
        this.showStartInstructions();
    }
    incrementScore() {
        this.scoreLabel.text = `Score: ${++this.score}`;
    }

    showStartInstructions() {
        this.startGameLabel.graphics.visible = true;
        this.engine.input.pointers.once('down', () => {
            this.resetLevel();

            this.startGameLabel.graphics.visible = false;
            this.bird.start();
            this.pipeFactory.start();
            this.ground.start();
        });
    }

    resetLevel() {
        this.bird.reset();
        this.pipeFactory.reset();
        this.score = 0;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    triggerGameOver() {
        this.pipeFactory.stop();
        this.bird.stop();
        this.ground.stop();
        this.showStartInstructions();
    }
}