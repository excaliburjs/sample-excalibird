import * as ex from 'excalibur';
import { Resources } from './resources';
import { Level } from './level';

// Step 1

const game = new ex.Engine({
  width: 400,
  height: 600,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level }
});

// Step 2
// const bird = new Bird();
// game.add(bird); // adds the Bird Actor to the default scene

// Step 5
const loader = new ex.Loader(Object.values(Resources));
game.start(loader).then(() => {
  game.goToScene('Level');
});