import * as ex from "excalibur";

// Step 5
export const Resources = {
    // Relative to /public in vite
    BirdImage: new ex.ImageSource('./images/bird.png'),
    PipeImage: new ex.ImageSource('./images/pipe.png'),
    GroundImage: new ex.ImageSource('./images/ground.png', {
        wrapping: ex.ImageWrapping.Repeat
    })
} as const;

