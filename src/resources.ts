import * as ex from "excalibur";

export const Resources = {
    // Relative to /public in vite

    // Images
    BirdImage: new ex.ImageSource('./images/bird.png'),
    PipeImage: new ex.ImageSource('./images/pipe.png', {
        wrapping: ex.ImageWrapping.Clamp
    }),
    GroundImage: new ex.ImageSource('./images/ground.png', {
        wrapping: ex.ImageWrapping.Repeat
    }),

    // Sounds
    FlapSound: new ex.Sound('./sounds/flap.wav'),
    FailSound: new ex.Sound('./sounds/fail.wav'),
    ScoreSound: new ex.Sound('./sounds/score.wav'),
} as const;

