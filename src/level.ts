import * as ex from "excalibur";
import { Bird } from "./bird";
import { PipeFactory } from "./pipe-factory";
import { Config } from "./config";
import { Ground } from "./ground";

// Step 7
export class Level extends ex.Scene {
    score: number = 0;
    best: number = 0;
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
    });

    bestLabel = new ex.Label({
        text: 'Best: 0',
        x: 400,
        y: 0,
        z: 10,
        font: new ex.Font({
            size: 20,
            color: ex.Color.White,
            textAlign: ex.TextAlign.End
        })
    });

    onInitialize(engine: ex.Engine): void {
        this.add(this.bird);

        // Step 8
        this.add(this.startGameLabel);
        this.add(this.scoreLabel);
        this.add(this.bestLabel);

        this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64))
        this.add(this.ground);

        const bestScore = localStorage.getItem('bestScore');
        if (bestScore) {
            this.best = +bestScore;
            this.setBestScore(this.best);
        } else {
            this.setBestScore(0);
        }

        // Step 9
        this.showStartInstructions();
    }
    incrementScore() {
        this.scoreLabel.text = `Score: ${++this.score}`;
        this.setBestScore(this.score);
    }

    setBestScore(score: number) {
        if (score > this.best) {
            localStorage.setItem('bestScore', this.score.toString());
            this.best = score;
        }
        this.bestLabel.text = `Best: ${this.best}`;
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