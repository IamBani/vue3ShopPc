// eslint-disable-next-line @typescript-eslint/no-var-requires
const execa = require("execa");
function build(target) {
  // execa("nodemon",["bundle.js","-w" ])
  execa("rollup", ["-c","-w", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  });
}


build('bundle');
