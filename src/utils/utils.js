export default function pause(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, s * 1000)
    })
}


export function printPuzzle(state, score, gscore) {
    const {
      log
    } = console;
    let line = "";
    log("================");
    let size = state.length;
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state.length; j++) {
        if (state[i][j] == '0') 
            line  += ' █';
        else
        line += " " + state[i][j] 
        line += " ".repeat((size * size).toString().length - state[i][j].length) + ' ';
        if (score != undefined && i == state.length - 1 && j == state.length - 1) line += "\x1b[33m  score: " + score + "   ren: " + gscore +"\x1b[0m";
      }
      log(line);
      line = '';
    }
    log("================");
  }