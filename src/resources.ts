import * as ex from "excalibur";

export const Resources = {
    // Relative to /public in vite
    BirdImage: new ex.ImageSource('./images/bird.png'),
    PipeImage: new ex.ImageSource('./images/pipe.png', {
        wrapping: ex.ImageWrapping.Clamp
    }),
    GroundImage: new ex.ImageSource('./images/ground.png', {
        wrapping: ex.ImageWrapping.Repeat
    })
} as const;

