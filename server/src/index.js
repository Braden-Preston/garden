var five = require('johnny-five');
var board = new five.Board();
var chalk = require('chalk');
const log = console.log;

// Initialize
log(chalk.yellow(`Starting Services...`));

board.on('ready', function () {
  log(chalk.green(`Board Loaded and REPL Active`));
  var led = new five.Led(13)
  var amber = new five.Led(9)
  var red = new five.Led(5)
  var blue = new five.Led(6)

  // Pulse
  led.blink(1000)

  // Animation
  let animation = () => {
    const that = this
    this.wait(0, function () {
      red.fadeIn(200)
      that.wait(300, function () {
        red.fadeOut(200);
      });
    });
    this.wait(400, function () {
      blue.fadeIn(200)
      that.wait(300, function () {
        blue.fadeOut(200);
      });
    });
    this.wait(800, function () {
      amber.fadeIn(200)
      that.wait(300, function () {
        amber.fadeOut(200);
      });
    });
  }

  let timer = setInterval(animation, 1000)

  this.repl.inject({
    red, blue, amber,
    start: () => {
      setInterval(animation, 1000)
      console.log('started!')
    },
    clear: () => {
      console.log('cleared!')
      clearInterval(timer)
    }
  });

  this.on("exit", function () {

    log(chalk.cyan(`Closing down safely...`));
    red.off();
    blue.off();
    amber.off();
    log(chalk.red.bold(`Board Exited`));
  });

});