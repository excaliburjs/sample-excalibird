import * as ex from 'excalibur';
import { Resources } from './resources';
import { Level } from './level';

const game = new ex.Engine({
  width: 400,
  height: 500,
  backgroundColor: ex.Color.fromHex("#54C0CA"),
  pixelArt: true,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level }
});

const loader = new ex.Loader(Object.values(Resources));
game.start(loader).then(() => {
  game.goToScene('Level');
});