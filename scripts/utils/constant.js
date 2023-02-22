const MAIN_FILE = 'index.tsx';
const separator = '*';
const BASE_PORT = 8000;

const chalk = require('chalk');

// 打印时颜色
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const success = chalk.green;

const maps = {
  success,
  warning,
  error,
};

const log = (message, types) => {
  console.log(maps[types](message));
};

module.exports = {
  MAIN_FILE,
  log,
  separator,
  BASE_PORT,
};
