import * as ex from "excalibur";

export const Config = {
    BirdStartPos: ex.vec(200, 300),
    BirdAcceleration: 1200,
    BirdJumpVelocity: -800,
    BirdMinVelocity: -500,
    BirdMaxVelocity: 1000, 
    PipeSpeed: 200,
    PipeInterval: 1500,
    PipeGap: 200
} as const;